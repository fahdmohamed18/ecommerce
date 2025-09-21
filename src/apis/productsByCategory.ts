"use server"

import axios from "axios"

export async function getProductsByCategory(categoryId: string){
  const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`)
  return data
}
