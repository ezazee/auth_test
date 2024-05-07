"use client";
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const LogoutBtn = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Hapus token JWT dari cookie
    Cookies.remove("jwt_token");

    // Redirect ke halaman login
    router.push("/");
  };
  return (
    <div className="hidden mr-3 -mb-1 sm:block">
      <button
        onClick={handleLogout}
        className="w-full text-white bg-red-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutBtn;
