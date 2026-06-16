// app/layout.tsx
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import "./globals.css";
import { Roboto } from "next/font/google";
import { Metadata } from "next";
//import AuthNavigation from "@/components/AuthNavigation/AuthNavigation";

export const metadata: Metadata = {
  title: "NoteHub | Your Personal Notebook",
  description:
    "Manage your personal notes, tasks, and ideas efficiently with NoteHub.",

  openGraph: {
    title: "NoteHub | Your Personal Notebook",
    description:
      "Manage your personal notes, tasks, and ideas efficiently with NoteHub.",
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

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export default function RootLayout({
  children,
  modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />
          <main>
            {children} {modal}
          </main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
