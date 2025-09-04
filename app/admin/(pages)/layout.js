import Sidebar from "@/app/components/admin/common/Sidebar/page";
import Topbar from "@/app/components/admin/common/Topbar/page";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Talha Traders | Admin",
  description:
    "Talha Trades is a premium real estate service offering personalized property solutions and investment opportunities.",
};

export default async function AdminLayout({ children }) {
  return (
    <section className="flex justify-between ">
      <div className="w-[20%]">
        <Sidebar />
      </div>
      <div className="w-[80%]">
        <Topbar />
        <Button variant={"primary"} asChild={true}>
          <Link href={"/"}>GO to Admin Website</Link>
        </Button>
        {children}
      </div>
    </section>
  );
}
