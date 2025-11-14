import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

/* -------------------- FONTS -------------------- */
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

/* -------------------- METADATA -------------------- */
export const metadata: Metadata = {
  title: "Ishant Mishra | Dev",
  description:
    "Full-Stack Developer specializing in creating high-performance, scalable web applications and seamless digital experiences using modern web technologies.",

  keywords: [
    "Ishant",
    "Ishant Portfolio",
    "Ishant Mishra Portfolio",
    "Dev",
    "MERN Stack Developer",
    "Ishant Mishra",
    "Full-stack developer",
    "Web developer",
    "React",
    "React Developer",
    "Next.js",
    "Node.js",
    "Portfolio",
    "Software engineer",
  ],

  authors: [{ name: "Ishant Mishra" }],
  creator: "Ishant Mishra",
  publisher: "Ishant Mishra",

  metadataBase: new URL("https://ishantmishra.vercel.app"),

  openGraph: {
    title: "Ishant Mishra | Dev",
    description:
      "Explore my projects, experience, and expertise in full-stack web development.",
    url: "https://ishantmishra.vercel.app",
    siteName: "Ishant Mishra Portfolio",
    images: [
      {
        url: "/favicon.png",
        width: 1200,
        height: 630,
        alt: "Ishant Portfolio Preview",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Ishant Mishra | Dev",
    description: "Explore my projects, experience, and engineering journey.",
    images: ["/favicon.png"],
    creator: "@ishantmishra03",
  },

  icons: {
    icon: "/favicon.ico",
  },
};

/* -------------------- LAYOUT -------------------- */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${roboto.variable}
          antialiased
          bg-black
          text-white
        `}
      >
        {children}
      </body>
    </html>
  );
}
