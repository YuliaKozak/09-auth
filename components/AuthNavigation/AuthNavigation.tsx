"use client";

import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import { logout } from "@/lib/api/clientApi";
import css from "./AuthNavigation.module.css";
import { useRouter } from "next/navigation";

export const AuthNavigation = () => {
  const router = useRouter();
  const { user, isAuthenticated, clearIsAuthenticated } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      clearIsAuthenticated();
      router.push("/sign-in");
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
