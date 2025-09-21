import getSingleProduct from '@/apis/singleProduct';
import AddBtnCart from '@/app/_components/addBtnCart/addBtnCart';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react'

const ProductDetails = async ( { params }: { params: { id: string } } ) => {
  const { id } = await params;
  const data = await getSingleProduct(id)
  return (
    <div className='w-full px-5 md:w-[80%] md:px-0 mx-auto my-10 flex items-center flex-col md:flex-row gap-5'>
      <div className="w-full md:w-1/3 ">
        <Image width={500} height={500} src={data.imageCover} className='w-full' alt="product image" />
      </div>
      <div className="w-full md:w-2/3 m-10 md:m-0 ps-10  ">
        <h1 className="text-2xl text-green-500 font-bold mb-2">{data.title}</h1>
        <p className="text-lg text-gray-700 my-5">{data.description}</p>
        <p className="text-xl font-bold ">{data.category.name} EGP</p>
          <div className="w-full my-5 flex justify-between items-center">           
          <p>{data.price} EGP</p>
          <p>{data.ratingsAverage} <i className="fa-solid fa-star text-yellow-300"></i></p>
          </div>
          <AddBtnCart id={data._id} />
      </div>
    </div>
  )
}

export default ProductDetails