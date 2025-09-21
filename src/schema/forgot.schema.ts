import { z } from "zod";

export const forgotEmailSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});
export type ForgotEmailSchemaType = z.infer<typeof forgotEmailSchema>;

export const verifyCodeSchema = z.object({
  resetCode: z
    .string()
    .min(5, "Code must be at least 5 characters")
    .max(8, "Code seems too long"),
});
export type VerifyCodeSchemaType = z.infer<typeof verifyCodeSchema>;

export const resetPasswordSchema = z
  .object({
    email: z.string().email("Please enter a valid email"),
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&_-]{6,}$/i, "Password must contain letters and numbers"),
    confirmPassword: z.string(),
  })
  .refine((vals) => vals.newPassword === vals.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;
