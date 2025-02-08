"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { message } from "antd";
import { useUser } from "@/contexts/UserContext";

interface UserProps {
  user: {
    userName?: string;
    role: string;
  };
}

const User: React.FC<UserProps> = ({ user }) => {
  const router = useRouter();
  const { setUser } = useUser();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    message.success("You have successfully logged out.");
    setTimeout(() => {
      router.push("/admin");
    }, 1000);
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
              <Link href="/portal">
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Portal
                </button>
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default User;
