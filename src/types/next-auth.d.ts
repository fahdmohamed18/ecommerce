import "next-auth"

declare module "next-auth" {
  interface User {
    token: string
    name: string
    email: string
    role: string
  }

  interface Session {
    user: {
      token: string
      name: string
      email: string
      role: string
    }
  }
}
