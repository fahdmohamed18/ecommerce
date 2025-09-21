
"use server"
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getMyToken() {
    try {
        const sessionToken = (await cookies()).get("next-auth.session-token")?.value;
        if (!sessionToken) {
            return null;
        }

        const token = await decode({
            token: sessionToken,
            secret: process.env.NEXTAUTH_SECRET!
        });

        if (!token) {
            return null;
        }

        return token.token;
    } catch (error) {
        console.error('Error getting token:', error);
        return null;
    }
}