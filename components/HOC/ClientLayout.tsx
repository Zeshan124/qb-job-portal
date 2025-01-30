"use client";

import { usePathname } from "next/navigation";
import { Nav, ScrollToTop } from "@/paths";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      {/* Hide Nav on /portal */}
      {pathname !== "/portal" && <Nav />}
      {children}
      <ScrollToTop />
    </>
  );
}
