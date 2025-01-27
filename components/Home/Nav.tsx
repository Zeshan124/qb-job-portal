import Link from "next/link";
import React from "react";
import LogoImage from "@/public/images/qb.jpg";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/Auth";
import User from "../Helpers/User";

const Nav = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <div className="h-[13vh] shadow-md">
      <div className="w-[90%] md:w-[80%] h-full mx-auto flex items-center justify-between">
        {/* logo */}
        <div>
          <div className="w-[50px] h-[50px] md:w-[100px] md:h-[100px]">
            <Link href="/">
              <Image src={LogoImage} alt="logo" className="w-full h-full" />
            </Link>
          </div>
        </div>
        {/* navigation menu */}
        <div className="flex-1 flex justify-center items-center space-x-4 lg:space-x-8">
          <Link
            href="/"
            className="text-sm md:text-lg lg:text-xl font-medium text-[#8570C5] font-semibold"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-sm md:text-lg lg:text-xl font-medium text-[#8570C5] font-semibold"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="text-sm md:text-lg lg:text-xl font-medium text-[#8570C5] font-semibold"
          >
            Contact
          </Link>
        </div>
        <div className="flex space-x-2 items-center">
          {!session && (
            <Link href="/signup">
              <button className="px-4 py-1.5 text-[14px] sm:text-[16px] sm:px-6 sm:py-2 bg-blue-600 font-semibold text-white rounded-lg hover:bg-blue-800 transition-colors duration-300">
                Sign up
              </button>
            </Link>
          )}
          {session && <User session={session} />}
          {session && (
            <Link href="/jobposting">
              <button className="px-4 py-1.5 text-[14px] h-[3em] sm:text-[16px] sm:px-6 sm:py-2 bg-[#8570C5] hover:bg-purple-800 font-semibold text-white rounded-lg transition-colors duration-300">
                Post a job
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
