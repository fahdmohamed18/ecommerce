import { NextRequest, NextResponse } from "next/server"
import { changeMyPassword } from "@/apis/auth"
import type { AxiosError } from "axios"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { currentPassword, password, rePassword } = body || {}

    if (!currentPassword || !password || !rePassword) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      )
    }

    const data = await changeMyPassword(currentPassword, password, rePassword)
    return NextResponse.json(data)
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>
    const status = error.response?.status || 500
    const message = error.response?.data?.message || "Internal Server Error"
    return NextResponse.json({ message }, { status })
  }
}
