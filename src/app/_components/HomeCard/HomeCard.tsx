"use client"
import React, { useContext, useMemo } from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Product } from '@/types/product.type';
import AddBtnCart from '../addBtnCart/addBtnCart';
import { toast } from 'sonner';
import { wishListContext } from '@/context/WishListContext';
const HomeCard = ({ product }: { product: Product }) => {
  const { wishListItems, addToWishList, removeFromWishList } = useContext(wishListContext)

  const isWishListed = useMemo(() => {
    return wishListItems.some((p) => p._id === product._id)
  }, [wishListItems, product._id])

  const handleToggleWishList = async () => {
    try {
      if (isWishListed) {
        const res = await removeFromWishList(product._id)
        if (res?.status === 'success') {
          toast.success('Removed from wishlist', { position: 'top-center', duration: 1500 })
        }
      } else {
        const res = await addToWishList(product._id, product) // optimistic add with product
        if (res?.status === 'success' || res?.status === 'exists') {
          toast.success('Added to wishlist', { position: 'top-center', duration: 1500 })
        }
      }
    } catch (e) {
      toast.error('Action failed', { position: 'top-center', duration: 1500 })
    }
  }

  return (
     <div className="w-full sm:w-0.5 md:w-1/3 lg:w-1/4 xl:w-1/5 p-3">
        <div className="inner">
            <Card className="p-2 gap-2 relative">
              <button 
                onClick={handleToggleWishList}
                className="absolute top-2 right-2 z-10 bg-white rounded-full p-1 shadow-sm hover:scale-110 transition-transform"
                aria-label={isWishListed ? 'Remove from wishlist' : 'Add to wishlist'}
                title={isWishListed ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <i className={`fa-${isWishListed ? 'solid' : 'regular'} fa-heart ${isWishListed ? 'text-black' : 'text-black/60'} text-xl`}></i>
              </button>
              <Link href={`/productDetails/${product._id}`}>
                <CardHeader className="p-0">
                  <Image width={500} height={500} src={product.imageCover} alt={product.title} />
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-bold text-green-500 mb-3">{product.category.name}</p>
                  <p className="line-clamp-1">{product.title}</p>
                </CardContent>
                <CardFooter className="p-0">
                  <div className="w-full flex justify-between items-center">
                    <p>{product.price} EGP</p>
                    <p>{product.ratingsAverage} <i className="fa-solid fa-star text-yellow-300"></i></p>
                  </div>
                </CardFooter>
              </Link>
              <AddBtnCart id={product._id} />
            </Card>
          </div>
      </div>

            
  )
}

export default HomeCard