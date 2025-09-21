"use server"
import { getMyToken } from "@/utilities/token";
import axios from "axios";

export async function addToWishListAction(id: string) {
    const token = await getMyToken()

    if (!token) {
        throw Error("User not authenticated")
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
}