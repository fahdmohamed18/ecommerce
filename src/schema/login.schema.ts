import path from "path";
import * as z from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }).max(20, { message: "Password must be at most 20 characters." }),
})


export type LoginSchemaType = z.infer<typeof loginSchema>;
