import "next-auth"

declare module "next-auth" {
  interface User {
    id: string
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
