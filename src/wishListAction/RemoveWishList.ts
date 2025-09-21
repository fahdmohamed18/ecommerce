"use server"

import { getMyToken } from "@/utilities/token"
import axios from "axios"

export async function removeWishListItemAction(id: string) {
    try {
        const token = await getMyToken()
        if (!token) {
            return {
                status: 'error',
                message: 'User not authenticated'
            }
        }

        const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
            headers: {
                token: token as string
            }
        })
        return data;
    } catch (error: any) {
        console.error('removeWishListItemAction error:', error);
        return {
            status: 'error',
            message: error.message || 'Failed to remove from wishlist'
        }
    }
}