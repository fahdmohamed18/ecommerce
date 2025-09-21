"use server"
import { getMyToken } from "@/utilities/token"
import axios from "axios"

export async function updateCartAction(id : string , count : number){
    try {
        const token = await getMyToken()
        if(!token){
            return {
                status: 'error',
                message: 'User not authenticated'
            }
        }

        const value = {
            count: count
        }

        const {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , value , {
            headers:{
                token: token as string
            }
        })
        return data;
    } catch (error: any) {
        console.error('updateCartAction error:', error);
        return {
            status: 'error',
            message: error.message || 'Failed to update cart'
        }
    }
}