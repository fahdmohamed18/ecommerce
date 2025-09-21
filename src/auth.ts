import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import { jwtDecode } from "jwt-decode";

export const authOptions: AuthOptions = {

  pages: {
    signIn: '/login'
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const response = await fetch(`${process.env.API}/auth/signin`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,   
            password: credentials?.password
          }),
          headers: { "Content-Type": "application/json" }
        });

        type ApiAuthUser = { id?: string; _id?: string; name: string; email: string; role: string };
  type SigninPayload = { message: string; token: string; user: ApiAuthUser };
        const payload: SigninPayload = await response.json();
        console.log(payload);

        if (response.ok && payload.message === "success") {
          const u = payload.user;
          const decoded = jwtDecode<{ id?: string }>(payload.token);
          const idVal = decoded?.id || u.id || u._id || "";
          // Return a NextAuth User (augmented in src/types/next-auth.d.ts)
          return {
            id: idVal,
            token: payload.token,
            name: u.name,
            email: u.email,
            role: u.role
          };
        }

        throw new Error(payload.message || "failed to login");
      }
    })
  ],

  callbacks: {
    async jwt({ token, user }) {
      // On sign-in, user is defined (Credentials)
      if (user && 'token' in user && 'role' in user) {
        const u = user as { token: string; name: string; email: string; role: string };
        const decoded = jwtDecode<{ id?: string }>(u.token);
        token.user = {
          id: decoded?.id ?? "",
          token: u.token,
          name: u.name,
          email: u.email,
          role: u.role
        };
        token.token = u.token;
      }
      return token;
    },

    async session({ session, token }) {
      if (token && 'user' in token) {
        // Map only the fields declared on Session.user in our augmentation
        session.user = {
          token: token.user.token,
          name: token.user.name,
          email: token.user.email,
          role: token.user.role
        };
      }
      return session;
    },
  }
};
