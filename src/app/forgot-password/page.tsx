"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  forgotEmailSchema,
  ForgotEmailSchemaType,
  verifyCodeSchema,
  VerifyCodeSchemaType,
  resetPasswordSchema,
  ResetPasswordSchemaType,
} from "@/schema/forgot.schema";
import {
  forgotPasswords,
  verifyResetCode,
  resetPassword,
} from "@/apis/authClient";
import { useRouter } from "next/navigation";

type Step = 1 | 2 | 3;

// تعريف نوع للـ Error بدل any
interface ApiError {
  response?: {
    status?: number;
    data?: {
      message?: string;
    };
  };
}

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>(1);
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  const emailForm = useForm<ForgotEmailSchemaType>({
    resolver: zodResolver(forgotEmailSchema),
    defaultValues: { email: "" },
  });

  const codeForm = useForm<VerifyCodeSchemaType>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: { resetCode: "" },
  });

  const resetForm = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email: "", newPassword: "", confirmPassword: "" },
  });

  async function onSubmitEmail(values: ForgotEmailSchemaType) {
    try {
      const res = await forgotPasswords(values.email);
      setEmail(values.email);
      resetForm.setValue("email", values.email);
      toast.success(res.message || "Reset code sent to your email", {
        position: "top-center",
      });
      setStep(2);
    } catch (err: unknown) {
      const error = err as ApiError;
      toast.error(error?.response?.data?.message || "Failed to send code", {
        position: "top-center",
      });
    }
  }

  async function onSubmitCode(values: VerifyCodeSchemaType) {
    try {
      const res = await verifyResetCode(values.resetCode);
      toast.success(res.message || "Code verified", { position: "top-center" });
      setStep(3);
    } catch (err: unknown) {
      const error = err as ApiError;
      toast.error(error?.response?.data?.message || "Invalid code", {
        position: "top-center",
      });
    }
  }

  async function onSubmitReset(values: ResetPasswordSchemaType) {
    try {
      const res = await resetPassword(values.email, values.newPassword);
      toast.success(res.message || "Password updated. Please login", {
        position: "top-center",
      });
      router.push("/login");
    } catch (err: unknown) {
      const error = err as ApiError;
      toast.error(error?.response?.data?.message || "Reset failed", {
        position: "top-center",
      });
    }
  }

  return (
    <div className="mx-auto px-5 md:px-0 w-full md:w-1/2 my-12">
      <h1 className="text-3xl text-center font-bold mb-2">Forgot Password</h1>
      <p className="text-center text-sm text-muted-foreground mb-6">
        Step {step} of 3
      </p>

      {step === 1 && (
        <Form {...emailForm}>
          <form onSubmit={emailForm.handleSubmit(onSubmitEmail)}>
            <FormField
              control={emailForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    We&apos;ll send a verification code to this email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full mt-5"
              disabled={emailForm.formState.isSubmitting}
            >
              {emailForm.formState.isSubmitting ? "Sending..." : "Send Code"}
            </Button>
          </form>
        </Form>
      )}

      {step === 2 && (
        <Form {...codeForm}>
          <form onSubmit={codeForm.handleSubmit(onSubmitCode)}>
            <FormField
              control={codeForm.control}
              name="resetCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the code sent to your email"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Check your inbox and spam folder. Sent to: <b>{email}</b>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-3 mt-5">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button
                className="flex-1"
                disabled={codeForm.formState.isSubmitting}
              >
                {codeForm.formState.isSubmitting
                  ? "Verifying..."
                  : "Verify Code"}
              </Button>
            </div>
          </form>
        </Form>
      )}

      {step === 3 && (
        <Form {...resetForm}>
          <form onSubmit={resetForm.handleSubmit(onSubmitReset)}>
            <FormField
              control={resetForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} readOnly />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={resetForm.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={resetForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-3 mt-5">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setStep(2)}
              >
                Back
              </Button>
              <Button
                className="flex-1"
                disabled={resetForm.formState.isSubmitting}
              >
                {resetForm.formState.isSubmitting
                  ? "Updating..."
                  : "Update Password"}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
