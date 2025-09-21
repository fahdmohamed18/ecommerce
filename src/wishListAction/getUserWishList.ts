"use server"

import { getMyToken } from "@/utilities/token"

export async function getUserWishListAction() {
    const token = await getMyToken()

    if (!token) {
        throw Error("User not authenticated, please login")
    }

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: {
            token: token as string
        }
    })

    const data = await res.json()
    return data;
}