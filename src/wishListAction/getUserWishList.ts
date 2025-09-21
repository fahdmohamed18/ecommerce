"use server"

import { getMyToken } from "@/utilities/token"

export async function getUserWishListAction() {
    try {
        const token = await getMyToken()

        if (!token) {
            return {
                status: 'error',
                message: 'User not authenticated',
                count: 0,
                data: []
            }
        }

        const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
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
        console.error('getUserWishListAction error:', error)
        return {
            status: 'error',
            message: error.message || 'Failed to fetch wishlist',
            count: 0,
            data: []
        }
    }
}