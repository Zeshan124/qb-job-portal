// components/Helpers/User.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

interface UserProps {
  user: {
    userName: string;
    role: string;
  };
}

const User: React.FC<UserProps> = ({ user }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = `${process.env.NEXT_PUBLIC_URL_API}/`;
  };

  return (
    <div className="relative">
      {user && (
        <div
          onClick={() => setShowMenu(!showMenu)}
          className="flex flex-col items-center justify-center cursor-pointer"
        >
          <Image
            src="/images/user-avatar.png"
            alt="logged_img"
            className="rounded-full mt-3"
            width={50}
            height={50}
          />
          <span className="hidden sm:block sm:text-xs">{user.userName}</span>
        </div>
      )}

      {showMenu && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <ul className="py-1">
            <li>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </li>
            <li>
              <Link href="/candidates">
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Candidates
                </button>
              </Link>
            </li>
            <li>
              <Link href="/postedjobs">
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Posted Jobs
                </button>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default User;
