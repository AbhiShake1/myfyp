import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import { SessionProvider } from "~/providers/session";
import { ThemeProvider } from "@/components/theme-provider";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from '@vercel/analytics/react';
import Script from "next/script";
import { OneTapSignin } from "~/hoc/one-tap-sign-in";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Mero FYP",
  description: "FYP; final year project",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ThemeProvider attribute="class" defaultTheme="dark">
        <SessionProvider>
          <OneTapSignin>
            <body className={`font-sans ${inter.variable}`}>
              <TRPCReactProvider cookies={cookies().toString()}>
                <SpeedInsights />
                <Analytics />
                <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" />
                {children}
              </TRPCReactProvider>
            </body>
          </OneTapSignin>
        </SessionProvider>
      </ThemeProvider>
    </html>
  );
}
