import { Product } from "@/types/product.type";

export default async function getAllProducts() {
    const base = process.env.NEXT_PUBLIC_API || "https://ecommerce.routemisr.com/api/v1";
    const response = await fetch(`${base}/products`);
    const { data }: { data: Product[] } = await response.json();
    return data;
}
