// app/not-found.tsx
import css from "./Home.module.css";
import { Metadata } from "next";

import Link from "next/link";

export const metadata: Metadata = {
  title: "404 - Page not found | NoteHub",
  description:
    "The page you are looking for does not exist. Return to NoteHub to manage your notes and tasks.",

  openGraph: {
    title: "404 - Page not found | NoteHub",
    description:
      "The page you are looking for does not exist. Return to NoteHub to manage your notes and tasks.",
    url: "https://notehub.com/",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/">Go back home</Link>
    </div>
  );
};

export default NotFound;
