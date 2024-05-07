"use client";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import React, { createContext, useEffect, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";


interface AuthContextProps {
  login: (username: string, password: string) => void;
  logout: () => void;
  currentUser: Omit<ResponseCreateUser, "parent"> | null;
  loading: boolean;
}

interface Props {
  children: React.ReactNode;
}

const getRole = (role: string) => {
  return searchRole(routeConfig, role);
};

export const AuthContext = createContext<AuthContextProps>({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: (username: string, password: string) => {},
  logout: () => {},
  currentUser: null,
  loading: false,
});

export const AuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<Omit<
    ResponseCreateUser,
    "parent"
  > | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathName = usePathname();
  const params = useParams();
  const accessToken = getCookie("accessToken");

  const getCurrentUser = async () => {
    try {
      setLoading(true);
      const result = await getMe();
      if (result) {
        setCurrentUser(result.data);
      }
    } catch (error) {
      toastMessage("Failed to get user data", "error");
    } finally {
      setLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      const result = await postLogin({ username, password });
      if (result) {
        setCookie("accessToken", result.data.access_token);
        await getCurrentUser();
        toastMessage("Login Success", "success");
        router.replace("/");
      }
    } catch (error) {
      toastMessage("Login Failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    deleteCookie("accessToken");
    router.replace("/login");
  };

  useEffect(() => {
    if (accessToken) {
      getCurrentUser();
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      const d = getRole(currentUser.role);
      let currentPath = pathName;

      if (Array.isArray(Object.keys(params))) {
        Object.keys(params).forEach((key) => {
          const newPath = `/${params[key]}`;
          currentPath = currentPath.replace(
            new RegExp(newPath, "g"),
            `/:${key}`
          );
        });
      }
      if (!d.includes(currentPath) && !publicRoutes.includes(currentPath)) {
        router.replace("/login");
      }
      return;
    }
    if (!publicRoutes.includes(pathName) && !accessToken) {
      router.replace("/login");
      return;
    }
  }, [pathName, currentUser]);

  return (
    <AuthContext.Provider value={{ login, logout, currentUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
