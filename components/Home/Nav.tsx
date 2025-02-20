"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import LogoImage from "@/public/images/HR-Portal-Logo.png";
import User from "../Helpers/User";
import Cookies from "js-cookie";

const Nav = () => {
  const [user, setUser] = useState<{ userName?: string; role: string } | null>(null);

  useEffect(() => {
    const storedUser = Cookies.get("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="h-[13vh] shadow-md">
      <div className="w-[90%] md:w-[80%] p-2 h-full mx-auto flex items-center justify-between">
        <div>
          <Link href="/">
            <div className="w-[110px] h-[42px] md:w-[180px] md:h-[55px]">
              <Image src={LogoImage} alt="logo" className="w-full h-full" />
            </div>
          </Link>
        </div>
        {user && user.role === "superadmin" && (
          <div className="flex space-x-4 items-center">
            <User />
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
