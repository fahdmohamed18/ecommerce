import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

    interface User {
        token: string,
        user: {
            name : string,
            email: string,
            role: string
        }
    }


  interface Session {
    user: User.user
  }
}