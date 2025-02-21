"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { message, Spin } from "antd";
import Cookies from "js-cookie";

const User = () => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<{ userName?: string; role: string } | null>(
    null
  );

  useEffect(() => {
    const storedUser = Cookies.get("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setUser(null);
    message.success("You have successfully logged out.");
    setShowMenu(false);
    setTimeout(() => {
      router.push("/admin");
    }, 1000);
  };

  const handleNavigation = (path: string) => {
    setIsLoading(true);
    setTimeout(() => {
      router.push(path);
    }, 500);
  };

  return (
    <div className="relative">
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <Spin size="large" className="text-white" />
        </div>
      )}

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
                onClick={() => handleNavigation("/portal")}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Portal
              </button>
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
