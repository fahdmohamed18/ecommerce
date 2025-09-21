"use client";
import { Button } from "@/components/ui/button";
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema, LoginSchemaType } from "@/schema/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import Link from "next/link";

const Login = () => {

  const router = useRouter(); 

  const form = useForm<LoginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  async function handleLogin(values : LoginSchemaType) {
    // try {
    //   const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values);
    //   console.log(data);
    //   toast.success(data.message , {
    //     position: "top-center",
    //     duration: 4000,
    //   });
    //   router.push("/");
    // } catch (error) {
    //   toast.error((error as any).response.data.message, {
    //     position: "top-center",
    //     duration: 4000,
    //   });
    //   console.log(error);
    // }


    const res = await signIn("credentials" , {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/"
    }) 

    if(res?.ok){
      toast.success("Login successful", {
        position: "top-center",
        duration: 2000,
      });

      // window.location.href = res?.url || "/";
      router.push(res.url || "/");
      router.refresh();
    }

    else{
      toast.error(res?.error || "Login failed", {
        position: "top-center",
        duration: 2000,
      });
    }

  }

  return (
    <div className="mx-auto px-5 md:px-0 w-full md:w-1/2 my-12 ">
      <h1 className="text-3xl text-center font-bold mb-5">Login Form</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email"  {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password"  {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />


          <Button className="w-full mt-5">Login Now</Button>
          <div className="mt-3 text-center">
            <Link href="/forgot-password" className="text-primary hover:underline text-sm">
              Forgot your password?
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Login;
