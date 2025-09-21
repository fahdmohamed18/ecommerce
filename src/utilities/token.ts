
"use server"
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getMyToken() {
    try {
        // Ensure cookies() is available
        const cookieStore = await cookies();
        if (!cookieStore) {
            return null;
        }

        const sessionToken = cookieStore.get("next-auth.session-token")?.value;
        if (!sessionToken) {
            return null; // Silently return null instead of logging
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
            return null;
        }

        if (!token.token) {
            return null;
        }

        return token.token;
    } catch (error) {
        // Only log actual errors, not missing tokens
        if (error instanceof Error && !error.message.includes('Invalid token')) {
            console.error('Unexpected error getting token:', error);
        }
        return null;
    }
}