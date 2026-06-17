// components/AuthProvider/AuthProvider.tsx

"use client";

import { checkSession, getMe } from "../../lib/api/clientApi";
import { useAuthStore } from "../../lib/store/authStore";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Перевіряємо сесію
        const isAuthenticated = await checkSession();

        if (isAuthenticated) {
          const user = await getMe();
          if (user) {
            setUser(user);
            return;
          }
        }

        // Якщо перевірка повернула false
        clearIsAuthenticated();
      } catch (error) {
        console.error("Session checking failed or expired:", error);
        clearIsAuthenticated();
      }
    };
    fetchUser();
  }, [setUser, clearIsAuthenticated]);

  return children;
};

export default AuthProvider;
