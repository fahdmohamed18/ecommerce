"use client"
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import CartContextProvider from './context/CartContext'
import WishListContextProvider from './context/WishListContext'

const Providers = ({ children } : { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <CartContextProvider>
        <WishListContextProvider>
          {children}
        </WishListContextProvider>
      </CartContextProvider>
    </SessionProvider>
  )
}

export default Providers