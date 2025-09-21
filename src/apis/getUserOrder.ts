"use server"

import { getMyToken } from "@/utilities/token"
import axios from "axios"
import { jwtDecode } from "jwt-decode"

export async function getUserOrder() {
    // Always return array to prevent any potential errors
    try {
        const token = await getMyToken();
        
        if (!token) {
            return []; // Silently return empty array
        }

        // Double-check token is valid
        if (typeof token !== 'string' || token.trim() === '') {
            return [];
        }

        let userId: string;
        try {
            const decoded = jwtDecode<{ id?: string }>(token);
            userId = decoded?.id || '';
            if (!userId) {
                return [];
            }
        } catch (decodeError) {
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
            return [];
        }
    } catch (error: any) {
        return [];
    }
}