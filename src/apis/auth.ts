"use server";

import axios from "axios";
import { getMyToken } from "@/utilities/token";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1";

export async function changeMyPassword(
  currentPassword: string,
  password: string,
  rePassword: string
) {
  const token = await getMyToken();
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
}
