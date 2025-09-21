
"use server"
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getMyToken() {
    try {
        // Ensure cookies() is available
        const cookieStore = await cookies();
        if (!cookieStore) {
            console.log("No cookie store available");
            return null;
        }

        const sessionToken = cookieStore.get("next-auth.session-token")?.value;
        if (!sessionToken) {
            console.log("No session token found in cookies");
            return null;
        }

        // Ensure NEXTAUTH_SECRET is available
        const secret = process.env.NEXTAUTH_SECRET;
        if (!secret) {
            console.error("NEXTAUTH_SECRET is not defined");
            return null;
        }

        const token = await decode({
            token: sessionToken,
            secret: secret
        });

        if (!token) {
            console.log("Failed to decode token");
            return null;
        }

        if (!token.token) {
            console.log("No token property in decoded token");
            return null;
        }

        return token.token;
    } catch (error) {
        console.error('Error getting token:', error);
        return null;
    }
}