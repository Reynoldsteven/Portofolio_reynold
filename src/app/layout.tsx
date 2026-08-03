import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Reynold Steven L. — Full Stack Developer",
  description:
    "Portfolio of Reynold Steven L., a Full Stack Developer specializing in Flutter, Laravel, and TypeScript. Based in Batam, Indonesia.",
  keywords: ["portfolio", "developer", "flutter", "laravel", "typescript", "full stack"],
  openGraph: {
    title: "Reynold Steven L. — Full Stack Developer",
    description: "Portfolio · Full Stack Developer · Batam, Indonesia",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SmoothScroll>
            <Navbar />
            <main>{children}</main>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
