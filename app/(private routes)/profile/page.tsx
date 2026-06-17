import { getMe } from "../../../lib/api/serverApi";
import { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import css from "./ProfilePage.module.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Profile | NoteHub",
  description: "Your personal profile dashboard on NoteHub.",
  robots: "noindex, nofollow",
};

export default async function ProfilePage() {
  let user = null;
  try {
    user = await getMe();
  } catch (error) {
    console.error("Failed to fetch user session:", error);
  }
  if (!user) {
    redirect("/sign-in");
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
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
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}
