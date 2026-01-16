"use client";
import React, { useState } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { UserLogin } from "../auth";
import { useRouter } from "next/navigation";




// ✅ Schema for form validation
const formSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const [user, setUser] = useState({})
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {

    try {

      const { email, password } = values
      const userLog = await UserLogin(email, password)
      toast.success("Login Successful");

      console.log(userLog.data.email);
      if (userLog.data.email == "admin@gmail.com") {
        router.push("/admin/dashboard");
      } else {
        // Store user name for Navbar display
        localStorage.setItem("userName", userLog.data.full_name || "User");

        // Check for redirect URL
        const returnUrl = localStorage.getItem("returnUrl");
        if (returnUrl) {
          localStorage.removeItem("returnUrl"); // Clear it
          router.push(returnUrl);
        } else {
          router.push("/");
        }
      }





    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.message || "Invalid Email or Password";
      toast.error(errorMessage);

    }
  };

  return (
    <div className="w-[75%]">
      <h1 className="text-[1.75rem] text-[#fff] text-primary text-left font-bold">
        WELCOME
      </h1>
      <h3 className=" text-[#fff] text-[0.75rem]">
        Lets Get Started
      </h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 my-6">
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={"text-[#fff]"}>Email</FormLabel>
                <FormControl className="bg-[#262626] focus-visible:outline-none border-0 text-[#fff]">
                  <Input
                    placeholder="Enter your email"
                    className={"focus-visible:outline-none"}
                    {...field}
                  />
                </FormControl>
                <FormMessage className={"text-red-600"} />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={"text-[#fff]"}>Password</FormLabel>
                <FormControl className="bg-[#262626] focus-visible:outline-none border-0 text-[#fff]">
                  <Input
                    type={isVisible ? "text" : "password"}
                    placeholder="Enter your password"
                    className={"focus-visible:outline-none"}
                    {...field}
                    // prefix={"asdas"}
                    postfix={
                      <button
                        type="button"
                        className="cursor-pointer"
                        onClick={() => setIsVisible(!isVisible)}
                      >
                        {!isVisible ? <FaEye /> : <FaEyeSlash />}
                      </button>
                    }
                  />
                </FormControl>
                <FormMessage className={"text-red-600"} />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full cursor-pointer bg-[#703BF7] text-[#fff]"
          >
            Login
          </Button>
        </form>
      </Form>

      <div className="flex items-center my-6">
        <div className="flex-grow border-t border-[#262626]"></div>
        <span className="mx-4 text-[#999999] text-sm font-medium">OR</span>
        <div className="flex-grow border-t border-[#262626]"></div>
      </div>

      <Button
        onClick={() => {
          window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`;
        }}
        className="w-full cursor-pointer bg-white text-[#141414] hover:bg-gray-100 flex items-center justify-center gap-2 font-semibold"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.29-.03-.55z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Continue with Google
      </Button>
      <p className="text-center text-normal text-[#fff] text-[0.875rem]">
        {`Don't have an account?`}
        <Link href={"/Register"} className="text-[#703BF7] font-semibold ml-1">
          Register Now
        </Link>
      </p>
    </div>
  );
}
