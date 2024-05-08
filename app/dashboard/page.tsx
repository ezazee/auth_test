"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Topbar from "@/components/Topbar";
import Cookies from "js-cookie";

const Dashboard = () => {  
  const apiUser = `${process.env.NEXT_PUBLIC_API_AUTH_ME}/api/v1/users/me`;
  interface User {
    username: string;
    email: string;
  }
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const getUser = async () => {
      try {
        const jwtToken = Cookies.get("jwt_token");

        if (!jwtToken) {
          throw new Error("JWT token not found");
        }

        const response = await fetch(`${apiUser}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        });
        console.log(response);

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData: User = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUser();
  }, []);
  return (
    <>
      <Topbar />
      <div className="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
        <Sidebar />
        <div
          className="fixed inset-0 z-10 hidden bg-gray-900/50 dark:bg-gray-900/90"
          id="sidebarBackdrop"
        />
        <div
          id="main-content"
          className="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900"
        >
          <main>
            <div className="p-5">
              {user ? (
                <div>
                  <p>Welcome, {user.username}</p>
                  <p>Email: {user.email}</p>
                  {/* Tampilkan informasi pengguna lainnya sesuai kebutuhan */}
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
