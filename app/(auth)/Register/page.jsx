"use client";
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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

export default function Register() {
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
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="w-[75%]">
      <h1 className="text-[1.75rem] text-[#fff] text-primary text-left font-bold">
        REGISTER
      </h1>
      <h3 className=" text-[#fff] text-[0.75rem]">Lets Get Started</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 my-6">
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={"text-[#fff]"}>
                  Full Name
                </FormLabel>
                <FormControl className="bg-[#262626] focus-visible:outline-none border-0 text-[#fff]">
                  <Input
                    placeholder="Enter Name"
                    
                    {...field}
                  />
                </FormControl>
                <FormMessage className={"text-red-600"} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={"text-[#fff]"}>
                  Email
                </FormLabel>
                <FormControl className="bg-[#262626] focus-visible:outline-none border-0 text-[#fff]">
                  <Input
                    placeholder="Enter Email"
                    
                    {...field}
                  />
                </FormControl>
                <FormMessage className={"text-red-600"} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={"text-[#fff]"}>
                  Password
                </FormLabel>
                <FormControl className="bg-[#262626] focus-visible:outline-none border-0 text-[#fff]">
                  <Input
                    type="password"
                    placeholder="Enter Password"
                    
                    {...field}
                  />
                </FormControl>
                <FormMessage className={"text-red-600"} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={"text-[#fff]"}>
                  Confirm New Password
                </FormLabel>
                <FormControl className="bg-[#262626] focus-visible:outline-none border-0 text-[#fff]">
                  <Input
                    type="password"
                    placeholder="Enter Password"
                    
                    {...field}
                  />
                </FormControl>
                <FormMessage className={"text-red-600"} />
              </FormItem>
            )}
          />

          <FormItem>
            <Button
              type="submit"
            className="w-full cursor-pointer bg-[#703BF7] text-[#fff]"
              block="true"
            >
              CONTINUE
            </Button>
          </FormItem>
        </form>
      </Form>
      <p className="text-center text-normal text-[#fff] text-[0.875rem]">
        Already have an account?
        <a href={"Login"} className="text-[#703BF7] font-semibold ml-1">
          Login Now
        </a>
      </p>
    </div>
  );
}
