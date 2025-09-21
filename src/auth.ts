import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import {jwtDecode} from "jwt-decode";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  pages: {
    signIn: "/login",
    error: '/login',
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required");
          }

          const response = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signin`, {
            method: "POST",
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            headers: { 
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
          });

          type ApiAuthUser = { id?: string; _id?: string; name: string; email: string; role: string };
          type SigninPayload = { message: string; token: string; user: ApiAuthUser };

          const payload: SigninPayload = await response.json();

          if (response.ok && payload.message === "success" && payload.token) {
            const u = payload.user;
            const decoded = jwtDecode<{ id?: string }>(payload.token);
            const idVal = decoded?.id || u.id || u._id || "";

            if (!idVal) {
              throw new Error("Invalid user ID in token");
            }

            return {
              id: idVal,
              token: payload.token,
              name: u.name,
              email: u.email,
              role: u.role,
            };
          }

          throw new Error(payload.message || "Authentication failed");
        } catch (error: any) {
          console.error("Auth error:", error);
          throw new Error(error.message || "Authentication failed");
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      try {
        if (user) {
          const u = user as { token: string; name: string; email: string; role: string };
          const decoded = jwtDecode<{ id?: string }>(u.token);
          
          return {
            ...token,
            id: decoded?.id ?? "",
            token: u.token,
            name: u.name,
            email: u.email,
            role: u.role,
          };
        }
        return token;
      } catch (error) {
        console.error("JWT callback error:", error);
        return token;
      }
    },

    async session({ session, token }) {
      try {
        if (token && typeof token === 'object') {
          session.user = {
            token: token.token as string,
            name: token.name as string,
            email: token.email as string,
            role: token.role as string,
          };
        }
        return session;
      } catch (error) {
        console.error("Session callback error:", error);
        return session;
      }
    },
  },
};
