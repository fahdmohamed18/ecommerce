"use server"
import { getMyToken } from "@/utilities/token"
import axios from "axios"
export async function clearCartAction(){
    try {
        const token = await getMyToken()
        if(!token){
            return {
                status: 'error',
                message: 'User not authenticated'
            }
        }

        const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart` , {
            headers:{
                token: token as string
            }
        })
        return data;
    } catch (error: any) {
        console.error('clearCartAction error:', error);
        return {
            status: 'error',
            message: error.message || 'Failed to clear cart'
        }
    }
}