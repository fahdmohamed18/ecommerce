import React from 'react'
import { getProductsByCategory } from '@/apis/productsByCategory'
import HomeCard from '@/app/_components/HomeCard/HomeCard'
import { Product } from '@/types/product.type'

interface Props { params: { id: string } }

const CategoryProductsPage = async ({ params }: Props) => {
  const { id } = params
  const res = await getProductsByCategory(id)
  const products: Product[] = res?.data ?? []

  return (
    <div className='md:w-[80%] mx-auto w-full my-10 px-5 md:px-0'>
      <h1 className='text-2xl md:text-3xl font-bold mb-6'>Category Products</h1>
      {products.length === 0 ? (
        <div className='bg-white rounded-xl shadow-sm border border-slate-200 p-10 text-center'>
          <p className='text-slate-600'>No products found for this category.</p>
        </div>
      ) : (
        <div className='flex flex-wrap -m-3'>
          {products.map((p) => (
            <HomeCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}

export default CategoryProductsPage
