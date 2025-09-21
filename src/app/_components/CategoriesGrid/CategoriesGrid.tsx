"use client"
import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const CategoriesGrid = ({ categories }: { categories: any[] }) => {
  const [q, setQ] = useState('')
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    if(!term) return categories
    return categories.filter((c) => c.name?.toLowerCase().includes(term))
  }, [q, categories])

  return (
    <div>
      <div className='mb-6'>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder='Search categories...'
          className='w-full md:w-1/2 rounded-lg border border-slate-300 px-4 py-2 outline-none focus:ring-2 focus:ring-green-500'
        />
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6'>
        {filtered.map((cat) => (
          <Link href={`/categories/${cat._id}`} key={cat._id}
            className='group bg-white rounded-xl border border-slate-200 p-4 md:p-5 shadow-sm hover:shadow-md transition block'>
            <div className='flex items-center justify-center'>
              <Image
                src={cat.image}
                alt={cat.name}
                width={160}
                height={160}
                className='h-20 w-auto object-contain'
              />
            </div>
            <h3 className='text-center mt-3 font-medium text-slate-800 group-hover:text-green-600 transition line-clamp-1'>
              {cat.name}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CategoriesGrid