import { da } from 'zod/locales';
import { NextRequest, NextResponse } from "next/server";
import { id } from "zod/v4/locales";

export async function GET(req:NextRequest) {

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/products")
    const data = await res.json();  
    return NextResponse.json(data)
}