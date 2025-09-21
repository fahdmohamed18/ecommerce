"use server"
import { id } from 'zod/v4/locales';
import { getMyToken } from "@/utilities/token";
import axios from "axios";

export async function cashPaymentAction(id: string , values: object){
    try {
        const token = await getMyToken()
        if(!token) {
            return {
                status: 'error',
                message: 'User not authenticated'
            }
        } 

        const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${id}` , values , {
            headers:{
                token : token as string
            }
        })
        return data;
    } catch (error: any) {
        console.error('cashPaymentAction error:', error);
        return {
            status: 'error',
            message: error.message || 'Failed to process payment'
        }
    }
}