import { Toaster } from "@/components/ui/sonner";
import "../app/styles/globals.css";
import { Open_Sans } from "next/font/google";
// import { getServerSession } from "next-auth";
// import authOptions from "./api/auth/[...nextauth]/options";
// import NeProvidersxtAuthSessionProvider from "@/lib/Providers/NextAuthSessionProvider";
// import TanstackProvider from "@/lib//TanstackProvider";
// import { ThemeProvider } from "@/lib/Providers/ThemeProvider";

const OpenSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-openSans",
});

export const metadata = {
  title: "Talha Traders",
  description:
    "Talha Trades is a premium real estate service offering personalized property solutions and investment opportunities.",
};

export default function RootLayout({ children }) {
  // const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={OpenSans.className} suppressHydrationWarning>
        {/* <NextAuthSessionProvider session={session ?? undefined}>
          <TanstackProvider>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>*/}
        {children}
        <Toaster richColors position="top-right" />
        {/*   </ThemeProvider>
          </TanstackProvider>
        </NextAuthSessionProvider> */}
        {/* {children} */}
      </body>
    </html>
  );
}
