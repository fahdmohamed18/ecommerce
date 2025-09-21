"use client"
import React, { useContext } from 'react'
import Loading from '../loading'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { toast } from 'sonner'
import Link from 'next/link'
import { wishListContext } from '@/context/WishListContext'

const WishList = () => {
  const { isLoading, wishListItems, removeFromWishList } = useContext(wishListContext)

  async function removeItem(id: string) {
    try {
      const data = await removeFromWishList(id)
      if (data?.status === "success") {
        toast.success("Item removed from wishlist", {
          position: "top-center",
          duration: 1000,
        })
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error)
      toast.error("Failed to remove from wishlist", {
        position: "top-center",
        duration: 1000,
      })
    }
  }

  if (isLoading) {
    return <Loading />
  }

  if (!isLoading && wishListItems.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <i className="text-red-600 text-3xl font-bold">No items in wishlist</i>
      </div>
    )
  }

  return (
    <div className='w-full md:w-[80%] mx-auto my-10 px-5 md:px-0 bg-slate-100'>
      <div className='p-5'>
        <h1 className='text-2xl font-bold mb-6'>My Wishlist</h1>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {wishListItems.map((product) => (
            <div
              key={product._id}
              className='flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm'
            >
              <Link href={`/productDetails/${product._id}`} className="flex-shrink-0">
                <Image 
                  width={150} 
                  height={150} 
                  src={product.imageCover} 
                  alt={product.title}
                  className="rounded-md"
                />
              </Link>
              
              <div className='flex-grow'>
                <Link href={`/productDetails/${product._id}`}>
                  <h2 className='font-semibold text-lg hover:text-green-600 transition-colors'>
                    {product.title.length > 50 
                      ? `${product.title.substring(0, 50)}...` 
                      : product.title}
                  </h2>
                </Link>
                <p className='my-2 text-green-600 font-medium'>
                  Price: {product.price} EGP
                </p>
                <Button 
                  onClick={() => removeItem(product._id)}
                  variant="destructive"
                  className='mt-2'
                >
                  Remove from Wishlist
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WishList
