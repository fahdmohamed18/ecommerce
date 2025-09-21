import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import { jwtDecode } from "jwt-decode";

export const authOptions: AuthOptions = {
  pages: {
    signIn: '/login',
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const response = await fetch(`${process.env.API}/auth/signin`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: { "Content-Type": "application/json" },
        });

        const payload = await response.json();
        console.log(payload);

        if (response.ok && payload.message === "success") {
          const { id }: { id: string } = jwtDecode(payload.token);
          return {
            id: id,
            user: payload.user,
            token: payload.token,
          };
        }

        throw new Error(payload.message || "failed to login");
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user?.user;
        token.token = user?.token;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = token?.user;
      }
      return session;
    },
  },
};
