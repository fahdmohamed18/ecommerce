"use server"
import { getMyToken } from "@/utilities/token";
import axios from "axios";

export async function onlinePaymentAction(id: string , values: object){
    const token = await getMyToken()
    if(!token) {
        throw new Error("Login first")
    } 

    // Use environment-based app URL instead of localhost
    const appBaseUrl = (process.env.NEXT_URL || process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || "").replace(/\/$/, "")

    const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=${appBaseUrl}` , values , {
        headers:{
            token : token as string
        }
    })
    return data;
}