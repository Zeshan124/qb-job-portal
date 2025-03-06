"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { message, Spin } from "antd";
import Cookies from "js-cookie";
import LoadingSpinner from "../loader/LoadingSpinner";

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
          {/* <Spin size="large" className="text-white" /> */}
          <LoadingSpinner />
        </div>
      )}

      {user && (
        <div
          onClick={() => setShowMenu(!showMenu)}
          className="group flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ease-in-out"
        >
          <div className="relative">
            <Image
              src="/images/user-avatar.png"
              alt={`${user.userName}'s avatar`}
              className="rounded-full mt-3 border-2 border-gray-200 group-hover:border-blue-500 transition-colors duration-200"
              width={50}
              height={50}
              priority
            />

            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
          </div>
          <span className="hidden sm:block sm:text-xs font-medium text-gray-700 mt-1 group-hover:text-blue-500 transition-colors duration-200">
            {user.userName}
          </span>
        </div>
      )}

      {showMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-50 transform transition-all duration-200 ease-in-out scale-95 origin-top-right hover:scale-100">
          <ul className="py-2">
            <li>
              <button
                onClick={() => handleNavigation("/portal")}
                className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Portal
              </button>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
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
