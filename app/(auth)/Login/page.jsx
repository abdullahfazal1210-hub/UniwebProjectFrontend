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

// ✅ Schema for form validation
const formSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values) => {
    // console.log("values :", values);
    // alert(values.email);
    if (values.email == "admin@gmail.com" && values.password == "admin@!@#") {
      toast.success("Logged In Successfuly");
    } else {
      toast.error("Error");
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
      <p className="text-center text-normal text-[#fff] text-[0.875rem]">
        {`Don't have an account?`}
        <a href={"/Register"} className="text-[#703BF7] font-semibold ml-1">
          Register Now
        </a>
      </p>
    </div>
  );
}
