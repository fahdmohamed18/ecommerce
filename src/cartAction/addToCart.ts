"use server"
import { getMyToken } from "@/utilities/token";
import axios from "axios";
import { get } from "http";
import { th } from "zod/locales";

export async function addToCartAction(id : string){
    const token= await getMyToken()

    if(!token){
        throw Error("User not authenticated")
    }

    const values ={
    "productId": id
}
    const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/cart" , values , {
        headers:{
            token: token as string
        }
    })
    return data;
}