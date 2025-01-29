// components/Home/AdminLogin.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import signupImage from "@/public/images/chair.jpg";
import Image from "next/image";
import { authenticate } from "../../app/utils/action";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const result = await authenticate({ username, password });
      if (result) {
        router.push("/");
      }
    } catch (error) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="h-[100vh] flex flex-col items-center justify-center">
      <Image src={signupImage} alt="signupImage" width={400} height={200} />
      <input
        type="username"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="px-4 py-2 mt-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="px-4 py-2 mt-2 border rounded"
      />
      <button
        type="submit"
        onClick={handleLogin}
        className="px-12 py-3 mt-[2rem] bg-purple-700 hover:bg-purple-900 transition-colors duration-300 font-semibold text-white rounded-lg"
      >
        Log In
      </button>
    </div>
  );
};

export default AdminLogin;
