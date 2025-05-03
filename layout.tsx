// app/layout.tsx
import "./styles/globals.css";
import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";

// 🧩 Global Providers
import Providers from "./providers";
import { ThemeProvider } from "./providers/ThemeProvider";
import { PomodoroProvider } from "./providers/PomodoroProvider";

// 🔧 Core Layout Components
import AuthHeader from "@/components/AuthHeader";
import ClientLayout from "@/components/ClientLayout";
import GlobalPomodoroToaster from "@/components/GlobalPomodoroToaster";
import GlobalJobToast from "@/components/GlobalJobToast";
import { AutoPomodoroStarter } from "@/components/AutoPomodoroStarter";
import Toaster from "@/components/ToasterWrapper";

// 🎨 Google Fonts
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// 🌐 Metadata
export const metadata: Metadata = {
  title: "Your App",
  description: "Protected app with OTP login and productivity tools",
};

// 🏗️ Root Layout
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
        <body className="antialiased">
          <ThemeProvider>
            <Providers>
              <PomodoroProvider>
                <ClientLayout>
                  <AuthHeader />
                  <AutoPomodoroStarter />
                  {children}
                  <GlobalPomodoroToaster />
                  <GlobalJobToast />
                </ClientLayout>
              </PomodoroProvider>
            </Providers>
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
