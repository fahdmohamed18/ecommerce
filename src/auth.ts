import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import {jwtDecode} from "jwt-decode";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signin`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: { "Content-Type": "application/json" },
        });

        type ApiAuthUser = { id?: string; _id?: string; name: string; email: string; role: string };
        type SigninPayload = { message: string; token: string; user: ApiAuthUser };

        const payload: SigninPayload = await response.json();
        console.log(payload);

        if (response.ok && payload.message === "success") {
          const u = payload.user;
          const decoded = jwtDecode<{ id?: string }>(payload.token);
          const idVal = decoded?.id || u.id || u._id || "";

          return {
            id: idVal,
            token: payload.token,
            name: u.name,
            email: u.email,
            role: u.role,
          };
        }

        throw new Error(payload.message || "failed to login");
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
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
    },

    async session({ session, token }) {
      session.user = {
        token: (token as any).token,
        name: (token as any).name,
        email: (token as any).email,
        role: (token as any).role,
      };
      return session;
    },
  },
};
