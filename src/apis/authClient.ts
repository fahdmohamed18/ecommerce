import axios from "axios";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1";

export async function forgotPasswords(email: string) {
  const { data } = await axios.post(`${BASE_URL}/auth/forgotPasswords`, { email });
  return data;
}

export async function verifyResetCode(resetCode: string) {
  const { data } = await axios.post(`${BASE_URL}/auth/verifyResetCode`, { resetCode });
  return data;
}

export async function resetPassword(email: string, newPassword: string) {
  const { data } = await axios.put(`${BASE_URL}/auth/resetPassword`, { email, newPassword });
  return data;
}
