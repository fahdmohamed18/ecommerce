import React from 'react'
import { getAllBrands } from '@/apis/allBrands'
import Image from 'next/image'
import Link from 'next/link'

const Brands = async () => {
  const res = await getAllBrands()
  const brands = res?.data ?? []

  if (!brands.length) {
    return (
      <div className='md:w-[80%] mx-auto w-full my-16 px-5 md:px-0'>
        <div className='bg-white rounded-xl shadow-sm border border-slate-200 p-10 text-center'>
          <h2 className='text-2xl font-semibold mb-2'>No brands available</h2>
          <p className='text-slate-600'>Please check back later.</p>
        </div>
      </div>
    )
  }

  return (
    <div className='md:w-[80%] mx-auto w-full my-10 px-5 md:px-0'>
      <h1 className='text-2xl md:text-3xl font-bold mb-6'>Brands</h1>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6'>
        {brands.map((brand: any) => (
          <Link href={`/brands/${brand._id}`} key={brand._id}
            className='group bg-white rounded-xl border border-slate-200 p-4 md:p-5 shadow-sm hover:shadow-md transition block'>
            <div className='flex items-center justify-center'>
              <Image
                src={brand.image}
                alt={brand.name}
                width={160}
                height={160}
                className='h-20 w-auto object-contain grayscale group-hover:grayscale-0 transition'
              />
            </div>
            <h3 className='text-center mt-3 font-medium text-slate-800 group-hover:text-green-600 transition line-clamp-1'>
              {brand.name}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Brands