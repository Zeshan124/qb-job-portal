"use client";

import { Session } from "next-auth";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useState } from "react";

interface Props {
  session: Session;
}

const User = ({ session }: Props) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="relative">
      {session?.user?.image && (
        <div
          onClick={() => setShowMenu(!showMenu)}
          className="flex flex-col items-center justify-center cursor-pointer"
        >
          <Image
            src={session.user.image}
            alt="logged_img"
            className="rounded-full mt-3"
            width={50}
            height={50}
          />
          <span className="hidden sm:block sm:text-xs">
            {session?.user?.name}
          </span>
        </div>
      )}

      {showMenu && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <ul className="py-1">
            <li>
              <button
                onClick={() =>
                  signOut({
                    callbackUrl: `${process.env.NEXT_PUBLIC_URL}/signup`,
                  })
                }
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </li>
            {/* Add more menu items here in the future */}
            <li>
              <button
                onClick={() => {
                  /* Add logic for other future menu items */
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Future Option
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default User;
