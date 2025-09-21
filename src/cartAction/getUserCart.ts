"use server"

import { getMyToken } from "@/utilities/token"

export async function getUserCartAction(){
    try {
        const token = await getMyToken()

        if (!token) {
            return {
                status: 'error',
                message: 'User not authenticated',
                numOfCartItems: 0,
                data: { products: [], totalCartPrice: 0 },
                cartId: ''
            }
        }

        const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
            headers: {
                token: token as string
            }
        })

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`)
        }

        const data = await res.json()
        return data;
    } catch (error: any) {
        console.error('getUserCartAction error:', error)
        return {
            status: 'error',
            message: error.message || 'Failed to fetch cart',
            numOfCartItems: 0,
            data: { products: [], totalCartPrice: 0 },
            cartId: ''
        }
    }
}