"use server";

import axios from "axios";
import { getMyToken } from "@/utilities/token";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1";

export async function changeMyPassword(
  currentPassword: string,
  password: string,
  rePassword: string
) {
  try {
    const token = await getMyToken();
    
    if (!token) {
      return {
        status: 'error',
        message: 'User not authenticated'
      }
    }

    const { data } = await axios.put(
      `${BASE_URL}/users/changeMyPassword`,
      { currentPassword, password, rePassword },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error: any) {
    console.error('changeMyPassword error:', error);
    return {
      status: 'error',
      message: error.message || 'Failed to change password'
    }
  }
}
