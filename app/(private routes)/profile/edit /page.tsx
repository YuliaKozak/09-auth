"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuthStore } from "@/lib/store/authStore";
import { updateMe } from "@/lib/api/clientApi";
import { ApiError } from "@/lib/api/api";
import css from "./EditProfilePage.module.css";

export default function EditProfilePage() {
  const router = useRouter();
  const { user, setUser, isAuthenticated } = useAuthStore();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/sign-in");
    }
  }, [isAuthenticated, router]);

  if (!user) {
    return <p className={css.loading}>Loading profile data...</p>;
  }

  const handleSubmit = async (formData: FormData) => {
    setError("");
    setIsSubmitting(true);

    const username = formData.get("username") as string;

    if (!username || username.trim() === "") {
      setError("Username cannot be empty");
      setIsSubmitting(false);
      return;
    }

    try {
      // Відправляємо запит на бекенд для оновлення імені
      const updatedUser = await updateMe({ username: username.trim() });

      if (updatedUser) {
        setUser(updatedUser); // Оновлюємо дані у Zustand-сторі (user та isAuthenticated: true)
        router.push("/profile"); // Автоматичний редірект на сторінку профілю
      }
    } catch (err) {
      setError(
        (err as ApiError).response?.data?.error ??
          (err as ApiError).response?.data?.message ??
          (err as ApiError).message ??
          "Failed to update profile",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push("/profile"); // При натисканні на Cancel повертаємося назад на сторінку профілю
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={
            user.avatar ||
            "https://ac.goit.global/fullstack/react/default-avatar.png"
          }
          alt={`${user.username}'s avatar`}
          width={120}
          height={120}
          className={css.avatar}
          priority
        />

        <form action={handleSubmit} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              defaultValue={user.username}
              required
            />
          </div>

          <p className={css.emailText}>Email: {user.email}</p>
          {error && <p className={css.error}>{error}</p>}

          <div className={css.actions}>
            <button
              type="submit"
              className={css.saveButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
