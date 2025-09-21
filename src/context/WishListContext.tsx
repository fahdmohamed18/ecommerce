"use client"
import React, { createContext, useEffect, useState } from 'react'
import { getUserWishListAction } from '@/wishListAction/getUserWishList'
import { addToWishListAction } from '@/wishListAction/addToWishList'
import { removeWishListItemAction } from '@/wishListAction/RemoveWishList'
import { Product } from '@/types/product.type'
import { WishListResponse, WishListActionResponse } from '@/types/wishlistTypes';

interface WishListContextType {
  wishListItems: Product[]
  numOfWishListItems: number
  isLoading: boolean
  addToWishList: (id: string, product?: Product) => Promise<WishListActionResponse | undefined>
  removeFromWishList: (id: string) => Promise<WishListActionResponse | undefined>
  getWishList: () => Promise<void>
}

export const wishListContext = createContext<WishListContextType>({
  wishListItems: [],
  numOfWishListItems: 0,
  isLoading: false,
  addToWishList: async () => undefined,
  removeFromWishList: async () => undefined,
  getWishList: async () => {}
})

const WishListContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishListItems, setWishListItems] = useState<Product[]>([])
  const [numOfWishListItems, setNumOfWishListItems] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  async function getWishList() {
    setIsLoading(true)
    try {
      const data: WishListResponse = await getUserWishListAction()
      if (data.status === 'success') {
        setWishListItems(data.data)
        setNumOfWishListItems(data.count)
      }
    } catch (error) {
      console.error('Failed to fetch wishlist')
    }
    setIsLoading(false)
  }

  async function addToWishList(id: string, product?: Product): Promise<WishListActionResponse | undefined> {
    if (wishListItems.some((p) => p._id === id)) {
      return { status: 'exists', message: 'Product already in wishlist' }
    }

    const prevItems = wishListItems
    const prevCount = numOfWishListItems
    try {
      if (product) {
        setWishListItems([product, ...prevItems])
      }
      setNumOfWishListItems(prevCount + 1)

      const data: WishListActionResponse = await addToWishListAction(id)
      if (data.status !== 'success') {
        setWishListItems(prevItems)
        setNumOfWishListItems(prevCount)
      } else {
        await getWishList()
      }
      return data
    } catch (error) {
      setWishListItems(prevItems)
      setNumOfWishListItems(prevCount)
      console.error('Failed to add to wishlist')
      throw error
    }
  }

  async function removeFromWishList(id: string): Promise<WishListActionResponse | undefined> {
    const prevItems = wishListItems
    const prevCount = numOfWishListItems
    try {
      setWishListItems(prevItems.filter((p) => p._id !== id))
      setNumOfWishListItems(Math.max(0, prevCount - 1))

      const data: WishListActionResponse = await removeWishListItemAction(id)
      if (data.status !== 'success') {
        setWishListItems(prevItems)
        setNumOfWishListItems(prevCount)
      }
      return data
    } catch (error) {
      setWishListItems(prevItems)
      setNumOfWishListItems(prevCount)
      console.error('Failed to remove from wishlist')
      throw error
    }
  }

  useEffect(() => {
    getWishList()
  }, [])

  return (
    <wishListContext.Provider value={{
      wishListItems,
      numOfWishListItems,
      isLoading,
      addToWishList,
      removeFromWishList,
      getWishList
    }}>
      {children}
    </wishListContext.Provider>
  )
}

export default WishListContextProvider
