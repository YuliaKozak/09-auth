"use client";

import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore"; // 🛠 Імпортуємо наш Zustand стор
import { logout } from "@/lib/api/clientApi"; // 🛠 Імпортуємо функцію logout з вашого API
import css from "./AuthNavigation.module.css";

export const AuthNavigation = () => {
  // 🛠 Беремо з Zustand актуальний стан та метод очищення
  const { user, isAuthenticated, clearIsAuthenticated } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout(); // Викликаємо запит виходу на бекенд, щоб стерти cookies
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      clearIsAuthenticated(); // 🛠 Очищаємо Zustand-стор у будь-якому випадку
    }
  };

  return (
    <>
      {isAuthenticated && user ? (
        // Рендериться, якщо користувач УВІЙШОВ
        <>
          <li className={css.navigationItem}>
            <Link
              href="/profile"
              prefetch={false}
              className={css.navigationLink}
            >
              Profile
            </Link>
          </li>
          <li className={css.navigationItem}>
            {/* 🛠 Замість захардкодженного тексту виводимо реальну пошту користувача */}
            <p className={css.userEmail}>{user.email}</p>
            <button className={css.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </li>
        </>
      ) : (
        // Рендериться, якщо користувач ГОСТЬ
        <>
          <li className={css.navigationItem}>
            <Link
              href="/sign-in"
              prefetch={false}
              className={css.navigationLink}
            >
              Login
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link
              href="/sign-up"
              prefetch={false}
              className={css.navigationLink}
            >
              Sign up
            </Link>
          </li>
        </>
      )}
    </>
  );
};

export default AuthNavigation;
