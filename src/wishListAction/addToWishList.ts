"use server"
import { getMyToken } from "@/utilities/token";
import axios from "axios";

export async function addToWishListAction(id: string) {
    try {
        const token = await getMyToken()

        if (!token) {
            return {
                status: 'error',
                message: 'User not authenticated'
            }
        }

        const values = {
            "productId": id
        }

        const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist", values, {
            headers: {
                token: token as string
            }
        })
        return data;
    } catch (error: any) {
        console.error('addToWishListAction error:', error);
        return {
            status: 'error',
            message: error.message || 'Failed to add to wishlist'
        }
    }
}