import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET
    });

    const { pathname } = request.nextUrl

    const authPages = ["/login" , "/register"]
    const routes = ["/" , "/allorders" , "/payment", "/brands" , "/categories" , "/cart" , "/productDetails"]

    // Redirect to login if accessing protected route without token
    if (!token && routes.includes(pathname)) {
        const url = new URL('/login', request.url)
        url.searchParams.set('callbackUrl', encodeURIComponent(pathname))
        return NextResponse.redirect(url)
    }

    // Redirect to home if accessing auth pages while logged in
    if (token && authPages.includes(pathname)) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/" , "/allorders" , "/payment" , "/brands" , "/categories" , "/cart" , "/productDetails/:path*" , "/login" , "/register"],
}
