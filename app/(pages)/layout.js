import React from "react";
import Header from "../components/web/common/Header/page";
import Footer from "../components/web/common/Footer/page";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Weblayout({ children }) {
  return (
    <>
      <Header />
      <Button variant={"primary"} asChild={true}>
        <Link href={"/admin/Dashboard"}>GO to Admin Protal</Link>
      </Button>
      {children}
      <Footer />
    </>
  );
}
