"use server"

import { getMyToken } from "@/utilities/token"
import axios from "axios"
import { jwtDecode } from "jwt-decode"

export async function getUserOrder(){
    const token = await getMyToken()
    const {id}: {id: string} = jwtDecode(token as string)

    if(!token) {
        throw new Error("Login first")
    }

    const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
    return data;
}