"use server"
import { id } from 'zod/v4/locales';
import { getMyToken } from "@/utilities/token";
import axios from "axios";
import { use } from 'react';

export async function onlinePaymentAction(id: string , values: object){
    const token = await getMyToken()
    if(!token) {
        throw new Error("Login first")
    } 

    const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000` , values , {
        headers:{
            token : token as string
        }
    })
    return data;
}