import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReduxProvider from "@/providers/ReduxProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import StripeProvider from "@/providers/StripeProvider";

const popins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  

  return (
    <html lang="en">
      <body className={popins.variable}>
        <QueryProvider>
          <ReduxProvider>
            <StripeProvider>{children}</StripeProvider>
          </ReduxProvider>
        </QueryProvider>
        <ToasterProvider />
      </body>
    </html>
  );
}
