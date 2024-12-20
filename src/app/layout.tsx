import type { Metadata } from "next";
import Link from "next/link";
import localFont from "next/font/local";
import "./globals.css";
import styles from "./layout.module.scss";

const jediSans = localFont({
  src: "./fonts/StarJedi Hollow.ttf",
  variable: "--font-star-jedi-hollow-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Star Wars App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jediSans.variable}`}>
        <div className={styles.wrapper}>
          <header className={styles.header}>
            <Link href="/">
              <h1>starwars</h1>
            </Link>
          </header>
          <main className={styles.main}>{children}</main>
          <footer className={styles.footer}>
            Developed by <a>AngryKat</a> 2024
          </footer>
        </div>
      </body>
    </html>
  );
}
