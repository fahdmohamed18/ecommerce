"use client"
import React, { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from './../../../../public/screens/freshcart-logo.svg'
import { signOut, useSession } from 'next-auth/react'
import { cartContext } from '@/context/CartContext'
import { wishListContext } from '@/context/WishListContext'
import { Badge } from '@/components/ui/badge'

const Navbar = () => {
  const { data: session, status } = useSession()
  const { numOfCartItems } = useContext(cartContext)
  const { numOfWishListItems } = useContext(wishListContext)
  const firstName = session?.user?.name?.split(' ')[0] ?? 'there'

  return (
    <header className='sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200'>
      <div className='w-full md:w-[80%] mx-auto flex items-center justify-between py-3 px-4 md:px-0'>
        {/* Left: Logo + Nav */}
        <div className='flex items-center gap-6'>
          <Link href='/' aria-label='Home'>
            <Image src={logo} alt='Logo' className='h-8 w-auto' />
          </Link>

          {status === 'authenticated' && (
            <nav>
              <ul className='hidden md:flex items-center gap-6 text-slate-700'>
                <li><Link className='hover:text-green-600 transition' href='/categories'>Categories</Link></li>
                <li><Link className='hover:text-green-600 transition' href='/brands'>Brands</Link></li>
                <li><Link className='hover:text-green-600 transition' href='/allorders'>All Orders</Link></li>
              </ul>
            </nav>
          )}
        </div>

        {/* Right: Actions */}
        <div className='flex items-center gap-3 md:gap-5'>
          {status === 'authenticated' && (
            <>
              {/* Wishlist */}
              <Link href='/wishList' className='relative inline-flex items-center justify-center h-9 w-9 rounded-full bg-slate-100 hover:bg-slate-200 transition' aria-label='Wishlist'>
                <i className='fa-solid fa-heart text-red-500'></i>
                <Badge className='absolute -top-2 -right-2 px-1.5 py-0 text-[10px]'>
                  {numOfWishListItems}
                </Badge>
              </Link>

              {/* Cart */}
              <Link href='/cart' className='relative inline-flex items-center justify-center h-9 w-9 rounded-full bg-slate-100 hover:bg-slate-200 transition' aria-label='Cart'>
                <i className='fa-solid fa-cart-shopping text-slate-700'></i>
                <Badge className='absolute -top-2 -right-2 px-1.5 py-0 text-[10px]'>
                  {numOfCartItems}
                </Badge>
              </Link>

              {/* Greeting */}
              <div className='hidden sm:flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5'>
                <i className='fa-regular fa-user text-slate-700'></i>
                <span className='text-sm text-slate-700'>
                  Hi, <span className='font-semibold text-slate-900'>{firstName}</span>
                </span>
              </div>

              <button
                className='text-sm text-slate-600 hover:text-red-600 transition'
                onClick={() => signOut({ callbackUrl: '/login' })}
              >
                Logout
              </button>
            </>
          )}

          {status === 'unauthenticated' && (
            <div className='flex items-center gap-3'>
              <Link href='/login' className='text-sm text-slate-700 hover:text-green-600 transition'>Login</Link>
              <Link href='/register' className='text-sm text-white bg-green-600 hover:bg-green-700 transition px-3 py-1.5 rounded-full'>Register</Link>
            </div>
          )}

          {status === 'loading' && (
            <span className='text-slate-500 text-sm'>Loading...</span>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar