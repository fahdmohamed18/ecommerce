"use server"
import { getMyToken } from "@/utilities/token"
import axios from "axios"
export async function clearCartAction(){
    const token = await getMyToken()
    if(!token){
        throw Error("User not authenticated , please login")
    }

    const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart` , {
        headers:{
            token: token as string
        }
    })
    return data;
}