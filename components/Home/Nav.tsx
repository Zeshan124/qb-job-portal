import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/Auth";
import LogoImage from "@/public/images/QB-logo.webp";
import User from "../Helpers/User";

const Nav = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="h-[13vh] shadow-md">
      <div className="w-[90%] md:w-[80%] h-full mx-auto flex items-center justify-between">
        {/* Logo */}
        <div>
          <Link href="/">
            <div className="w-[100px] h-[45px] md:w-[180px] md:h-[50px]">
              <Image src={LogoImage} alt="logo" className="w-full h-full" />
            </div>
          </Link>
        </div>

        {/* Admin Options - Only visible if the admin is logged in */}
        {session && (
          <div className="flex space-x-4 items-center">
            <User session={session} />
            <Link href="/jobposting">
              <button className="px-4 py-1.5 text-[14px] sm:text-[16px] bg-[#8570C5] text-white font-semibold rounded-lg hover:bg-purple-600 transition-colors">
                Post a Job
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
