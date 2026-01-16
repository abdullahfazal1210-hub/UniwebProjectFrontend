"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UserRegister } from "../auth";

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
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [backendError, setBackendError] = useState("");

  // Zod schema for form validation
  const formSchema = z
    .object({
      full_name: z.string().min(1, "Please input your Name"),
      email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a correct Email"),
      password: z.string().min(1, "Password is required"),
      confirm_password: z.string().min(1, "Confirm Password is required"),
    })
    .refine((data) => data.password === data.confirm_password, {
      message: "Passwords do not match.",
      path: ["confirm_password"],
    });

  // React Hook Form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  // Form submit handler
  const onSubmit = async (values) => {
    const { full_name, email, password } = values;

    const res = await UserRegister(full_name, email, password);

    if (res.error) {
      setBackendError(res.error); // Show backend error
    } else {
      setBackendError(""); // Clear error on success
      console.log("User registered:", res.data);
      form.reset(); // Optional: reset form on success
      router.push("/Login");
    }
  };

  return (
    <div className="w-[75%] mx-auto">
      <h1 className="text-[1.75rem] text-[#fff] font-bold text-left">REGISTER</h1>
      <h3 className="text-[#fff] text-[0.75rem]">Let's Get Started</h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 my-6">
          {/* Full Name */}
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#fff]">Full Name</FormLabel>
                <FormControl className="bg-[#262626] border-0 focus-visible:outline-none text-[#fff]">
                  <Input placeholder="Enter Name" {...field} />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#fff]">Email</FormLabel>
                <FormControl className="bg-[#262626] border-0 focus-visible:outline-none text-[#fff]">
                  <Input placeholder="Enter Email" {...field} onChange={(e) => {
                    field.onChange(e);
                    setBackendError("");
                  }} />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          {backendError && (
            <p className="text-red-600 text-sm mt-1">{backendError}</p>
          )}

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#fff]">Password</FormLabel>
                <FormControl className="bg-[#262626] border-0 focus-visible:outline-none text-[#fff]">
                  <Input type="password" placeholder="Enter Password" {...field} />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#fff]">Confirm Password</FormLabel>
                <FormControl className="bg-[#262626] border-0 focus-visible:outline-none text-[#fff]">
                  <Input type="password" placeholder="Confirm Password" {...field} />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <FormItem>
            <Button
              type="submit"
              className="w-full bg-[#703BF7] text-[#fff] cursor-pointer"
              block={true}
            >
              CONTINUE
            </Button>
          </FormItem>
        </form>
      </Form>

      <p className="text-center text-[#fff] text-[0.875rem] mt-4">
        Already have an account?
        <Link href="/Login" className="text-[#703BF7] font-semibold ml-1">
          Login Now
        </Link>
      </p>
    </div>
  );
}
