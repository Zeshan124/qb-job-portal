import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ClientProvider from "@/components/HOC/ClientProvider";
import { Nav, Footer, ScrollToTop } from "@/paths";
import { UserProvider } from "@/contexts/UserContext";

const font = Plus_Jakarta_Sans({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Qist-Bazaar Job Portal",
  description: "Find the best job opportunities across Qist-Bazaar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body id="__next" className={font.className}>
        <UserProvider>
          <Nav />
          {children}
          <ScrollToTop />
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
