
"use server"
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getMyToken() {
    try {
        const cookieStore = await cookies();
        if (!cookieStore) {
            return null;
        }

        // Try both session token formats for production and development
        const sessionToken = cookieStore.get("next-auth.session-token")?.value || 
                            cookieStore.get("__Secure-next-auth.session-token")?.value;
        
        if (!sessionToken) {
            return null;
        }

        const secret = process.env.NEXTAUTH_SECRET;
        if (!secret) {
            console.error("NEXTAUTH_SECRET is not defined");
            return null;
        }

        const decodedToken = await decode({
            token: sessionToken,
            secret: secret
        });

        console.log("tokennddd", decodedToken?.token);

        return decodedToken?.token;
    } catch (error) {
        if (error instanceof Error && !error.message.includes('Invalid token')) {
            console.error('Unexpected error getting token:', error);
        }
        return null;
    }
}