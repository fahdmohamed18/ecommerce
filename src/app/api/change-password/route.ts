import { NextRequest, NextResponse } from "next/server";
import { changeMyPassword } from "@/apis/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { currentPassword, password, rePassword } = body || {};
    if (!currentPassword || !password || !rePassword) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }
    const data = await changeMyPassword(currentPassword, password, rePassword);
    return NextResponse.json(data);
  } catch (err: any) {
    const status = err?.response?.status || 500;
    const message = err?.response?.data?.message || "Internal Server Error";
    return NextResponse.json({ message }, { status });
  }
}
