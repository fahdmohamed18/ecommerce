"use server"

import axios from "axios"

export async function getAllBrands(){
  const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
  return data
}
