"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { message } from "antd";
import { useUser } from "@/contexts/UserContext"; // Import UserContext to update user state

interface UserProps {
  user: {
    userName?: string;
    role: string;
  };
}

const User: React.FC<UserProps> = ({ user }) => {
  const router = useRouter();
  const { setUser } = useUser(); // Get setUser function to update user state
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    // Remove user data from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Update user state in context (Navbar will hide Avatar)
    setUser(null);

    // Show success message using Ant Design
    message.success("You have successfully logged out.");

    // Redirect to /admin after a slight delay for better UX
    setTimeout(() => {
      router.push("/admin");
    }, 1500);
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
            {/* <li>
              <Link href="/portal">
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Portal
                </button>
              </Link>
            </li> */}
          </ul>
        </div>
      )}
    </div>
  );
};

export default User;
