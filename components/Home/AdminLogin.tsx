"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import signupImage from "@/public/images/chair.jpg";
import Image from "next/image";

const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError(res.error);
    } else {
      router.push("/"); // Redirect after successful login
    }
  };

  return (
    <div className="h-[100vh] flex flex-col items-center justify-center">

      {/* image */}
      <Image src={signupImage} alt="signupImage" width={400} height={200} />
      {/* button */}
      <button
        type="submit"
        onClick={() => {
          signIn("google", { callbackUrl: process.env.NEXT_PUBLIC_URL });
        }}
        className="px-12 py-3 mt-[2rem] bg-purple-700 hover:bg-purple-900 transition-colors duration-300 font-semibold text-white rounded-lg"
      >
        Sign Up Now
      </button>
    </div>
  );
};

export default AdminLogin;
