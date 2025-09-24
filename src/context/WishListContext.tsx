"use client"
import React, { createContext, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
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
  const { data: session, status } = useSession()
  const [wishListItems, setWishListItems] = useState<Product[]>([])
  const [numOfWishListItems, setNumOfWishListItems] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  async function getWishList() {
    if (!session?.user?.token) {
      return;
    }

    setIsLoading(true)
    try {
      const data: WishListResponse = await getUserWishListAction()
      if (data.status === 'success') {
        setWishListItems(data.data)
        setNumOfWishListItems(data.count)
      } else {
        // Handle error response
        setWishListItems([])
        setNumOfWishListItems(0)
      }
    } catch (error) {
      console.error('Failed to fetch wishlist:', error)
      // Reset wishlist state on error
      setWishListItems([])
      setNumOfWishListItems(0)
    }
    setIsLoading(false)
  }

  async function addToWishList(id: string, product?: Product): Promise<WishListActionResponse | undefined> {
    if (!session?.user?.token) {
      console.log("User not authenticated");
      return { status: 'error', message: 'User not authenticated' };
    }

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

      // استخدام الـ token من الـ session مباشرة
      const response = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': session.user.token
        },
        body: JSON.stringify({ productId: id })
      });

      const data = await response.json();
      
      if (data.status !== 'success') {
        setWishListItems(prevItems)
        setNumOfWishListItems(prevCount)
      } else {
        await getWishList()
      }
      return { status: data.status, message: data.message || 'Success' }
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
    if (status === 'authenticated' && session?.user?.token) {
      getWishList()
    } else if (status === 'unauthenticated') {
      // Clear wishlist when user logs out
      setWishListItems([])
      setNumOfWishListItems(0)
    }
  }, [status, session])

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
