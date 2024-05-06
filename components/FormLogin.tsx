"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const FormLogin: React.FC = () => {
  const Cookies = require("js-cookie");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://api-isat.bejo6.com/api/v1/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Authentication failed");
      }

      const data = await response.json();

      // Simpan token JWT ke dalam cookie
      Cookies.set("jwt_token", data.access_token);

      // Redirect to dashboard after successful login
      router.push("/dashboard");
    } catch (error) {
      setError("Authentication failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Username"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </button>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Don’t have an account yet?{" "}
          <a
            href="#"
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Sign up
          </a>
        </p>
      </form>
    </>
  );
};

export default FormLogin;
