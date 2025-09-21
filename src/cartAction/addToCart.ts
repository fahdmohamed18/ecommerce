"use server"
import { getMyToken } from "@/utilities/token";
import axios from "axios";

export async function addToCartAction(id: string) {
  try {
    const token = await getMyToken();

    if (!token) {
      return {
        status: 'error',
        message: 'User not authenticated'
      }
    }

    const values = {
      productId: id,
    };

    const { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      values,
      {
        headers: {
          token: token as string,
        },
      }
    );

    return data;
  } catch (error: any) {
    console.error('addToCartAction error:', error);
    return {
      status: 'error',
      message: error.message || 'Failed to add to cart'
    }
  }
}
