// components/Nav.tsx
"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import LogoImage from "@/public/images/QB-logo.webp";
import User from "../Helpers/User";
import { useUser } from "@/contexts/UserContext";

const Nav = () => {
  const { user } = useUser();

  return (
    <div className="h-[13vh] shadow-md">
      <div className="w-[90%] md:w-[80%] p-2 h-full mx-auto flex items-center justify-between">
        <div>
          <Link href="/">
            <div className="w-[100px] h-[45px] md:w-[180px] md:h-[50px]">
              <Image src={LogoImage} alt="logo" className="w-full h-full" />
            </div>
          </Link>
        </div>
        {user && user.role === "superadmin" && (
          <div className="flex space-x-4 items-center">
            <User user={user} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
