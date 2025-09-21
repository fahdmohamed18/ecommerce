import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/products");
    if (!res.ok) {
      return NextResponse.json(
        { message: "Failed to fetch products" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
