"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminLogin from "@/components/Home/AdminLogin";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/");
    }
  }, []);

  return isAuthenticated ? null : <AdminLogin />;
}
