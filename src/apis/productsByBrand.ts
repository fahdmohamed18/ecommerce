"use server"

import axios from "axios"

export async function getProductsByBrand(brandId: string){
  const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`)
  return data
}
