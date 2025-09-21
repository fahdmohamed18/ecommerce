import React from 'react'
import getAllCategories from '@/apis/allCategories'
import CategoriesGrid from '../_components/CategoriesGrid/CategoriesGrid'


const Categories = async () => {
  const categories = await getAllCategories()

  return (
    <div className='md:w-[80%] mx-auto w-full my-10 px-5 md:px-0'>
      <h1 className='text-2xl md:text-3xl font-bold mb-6'>Categories</h1>
      <CategoriesGrid categories={categories} />
    </div>
  )
}

export default Categories;