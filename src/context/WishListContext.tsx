"use client"
import React, { createContext, useEffect, useState } from 'react'
import { getUserWishListAction } from '@/wishListAction/getUserWishList'
import { addToWishListAction } from '@/wishListAction/addToWishList'
import { removeWishListItemAction } from '@/wishListAction/RemoveWishList'
import { Product } from '@/types/product.type'

interface WishListContextType {
  wishListItems: Product[]
  numOfWishListItems: number
  isLoading: boolean
  // Optionally pass the full product for a snappier optimistic UI
  addToWishList: (id: string, product?: Product) => Promise<any>
  removeFromWishList: (id: string) => Promise<any>
  getWishList: () => Promise<void>
}

export const wishListContext = createContext<WishListContextType>({
  wishListItems: [],
  numOfWishListItems: 0,
  isLoading: false,
  addToWishList: async () => {},
  removeFromWishList: async () => {},
  getWishList: async () => {}
})

const WishListContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishListItems, setWishListItems] = useState<Product[]>([])
  const [numOfWishListItems, setNumOfWishListItems] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  async function getWishList() {
    setIsLoading(true)
    try {
      const data = await getUserWishListAction()
      if (data.status === 'success') {
        setWishListItems(data.data)
        setNumOfWishListItems(data.count)
      }
    } catch (error) {
      console.error('Failed to fetch wishlist')
    }
    setIsLoading(false)
  }

  async function addToWishList(id: string, product?: Product) {
    // Prevent duplicates
    if (wishListItems.some((p) => p._id === id)) {
      return { status: 'exists' }
    }

    // Optimistic update
    const prevItems = wishListItems
    const prevCount = numOfWishListItems
    try {
      if (product) {
        setWishListItems([product, ...prevItems])
      }
      setNumOfWishListItems(prevCount + 1)

      const data = await addToWishListAction(id)
      if (data.status !== 'success') {
        // Rollback on unexpected response
        setWishListItems(prevItems)
        setNumOfWishListItems(prevCount)
      } else {
        // Sync to be 100% accurate
        await getWishList()
      }
      return data
    } catch (error) {
      // Rollback on error
      setWishListItems(prevItems)
      setNumOfWishListItems(prevCount)
      console.error('Failed to add to wishlist')
      throw error
    }
  }

  async function removeFromWishList(id: string) {
    // Optimistic update
    const prevItems = wishListItems
    const prevCount = numOfWishListItems
    try {
      setWishListItems(prevItems.filter((p) => p._id !== id))
      setNumOfWishListItems(Math.max(0, prevCount - 1))

      const data = await removeWishListItemAction(id)
      if (data.status !== 'success') {
        // Rollback on unexpected response
        setWishListItems(prevItems)
        setNumOfWishListItems(prevCount)
      }
      return data
    } catch (error) {
      // Rollback on error
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