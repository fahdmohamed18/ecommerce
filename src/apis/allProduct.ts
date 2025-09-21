import { Product } from "@/types/product.type";

export default async function getAllProducts() {
    const response = await fetch("http://localhost:3000/api/users");
    const { data }: { data: Product[] } = await response.json();
    return data;
}
