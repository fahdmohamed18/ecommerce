"use server"

import { getMyToken } from "@/utilities/token"
import axios from "axios"
import { jwtDecode } from "jwt-decode"

export async function getUserOrder() {
    try {
        const token = await getMyToken();
        
        if (!token) {
            throw new Error("Authentication required");
        }

        try {
            const { id }: { id: string } = jwtDecode(token);
            if (!id) {
                throw new Error("Invalid user token");
            }

            const { data } = await axios.get(
                `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
                {
                    headers: {
                        'token': token
                    }
                }
            );
            return data;
        } catch (decodeError) {
            console.error('Token decode error:', decodeError);
            throw new Error("Invalid authentication token");
        }
    } catch (error: any) {
        console.error('Get user order error:', error);
        return [];
    }
}