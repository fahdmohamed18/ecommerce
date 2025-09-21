"use server"

import { getMyToken } from "@/utilities/token"
import axios from "axios"
import { jwtDecode } from "jwt-decode"

export async function getUserOrder() {
    // Always return array to prevent any potential errors
    try {
        const token = await getMyToken();
        
        if (!token) {
            console.log("No authentication token found, returning empty orders");
            return [];
        }

        // Double-check token is valid
        if (typeof token !== 'string' || token.trim() === '') {
            console.log("Invalid token format, returning empty orders");
            return [];
        }

        let userId: string;
        try {
            const decoded = jwtDecode<{ id?: string }>(token);
            userId = decoded?.id || '';
            if (!userId) {
                console.log("No user ID in token, returning empty orders");
                return [];
            }
        } catch (decodeError) {
            console.error('Token decode error:', decodeError);
            return [];
        }

        try {
            const { data } = await axios.get(
                `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
                {
                    headers: {
                        'token': token
                    },
                    timeout: 10000 // 10 second timeout
                }
            );
            return Array.isArray(data) ? data : [];
        } catch (apiError) {
            console.error('API request error:', apiError);
            return [];
        }
    } catch (error: any) {
        console.error('getUserOrder unexpected error:', error);
        return [];
    }
}