"use client"
import React, { useContext } from 'react'
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { cartContext } from '@/context/CartContext';

const AddBtnCart = ({ id }: { id: string }) => {

    const { addProductToCart } = useContext(cartContext)

    async function handleAddToCart() {
    const data = await addProductToCart(id)
    
    if(data?.status === "success"){
        toast.success( "Added successfully", {
            position: "top-center",
            duration: 1000,
          });
    }
    else{
        toast.error("Failed to add to cart" , {
            position: "top-center",
            duration: 1000,
          });
    }
    }

  return (
    <div><Button className='w-full' variant="default" onClick={handleAddToCart}>Add To Cart</Button></div>
  )
}

export default AddBtnCart