import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chandra Kiran Chidurala | Full Stack Developer",

  description:
    "Portfolio of Chandra Kiran Chidurala — Full Stack Developer and technical professional working across web development, AI data quality, and data workflows.",

  icons: {
    icon: [
      {
        url: "/favicon/favicon.ico",
        type: "image/x-icon",
      },
      {
        url: "/favicon/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],

    apple: [
      {
        url: "/favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        />

        {/* Favicon */}
        <link
          rel="icon"
          href="/favicon/favicon.ico"
          type="image/x-icon"
        />

        <link
          rel="icon"
          href="/favicon/favicon-16x16.png"
          type="image/png"
          sizes="16x16"
        />

        <link
          rel="icon"
          href="/favicon/favicon-32x32.png"
          type="image/png"
          sizes="32x32"
        />

        {/* Apple */}
        <link
          rel="apple-touch-icon"
          href="/favicon/apple-touch-icon.png"
          sizes="180x180"
        />

        {/* Web App Manifest */}
        <link
          rel="manifest"
          href="/favicon/site.webmanifest"
        />
      </head>

      <body>{children}</body>
    </html>
  );
}