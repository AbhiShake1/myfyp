import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import { SessionProvider } from "~/providers/session";
import { ThemeProvider } from "~/providers/theme";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from '@vercel/analytics/react';
import Script from "next/script";
import { OneTapSignin } from "~/hoc/one-tap-sign-in";
import { ModeToggle } from "@/components/theme-mode-toggle";
import { Toaster } from "@/components/ui/sonner";
import { ProfileAvatar } from "@/components/profile-avatar";
import { getServerAuthSession } from "~/server/auth";
import { LoginWithGoogleButton } from "@/components/login-with-google-button";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Mero FYP",
  description: "FYP; final year project",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  return (
    <html lang="en">
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SessionProvider>
          <OneTapSignin>
            <body className={`font-sans ${inter.variable}`}>
              <TRPCReactProvider cookies={cookies().toString()}>
                <SpeedInsights />
                <Analytics />
                <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" />
                <nav className="sticky space-x-4 top-0 backdrop-blur-lg py-4 px-8 border-b-primary-foreground border-b flex flex-row items-center justify-end">
                  {session ? <ProfileAvatar user={session} /> : <LoginWithGoogleButton className="w-fit" size="lg" variant="default" />}
                  <ModeToggle />
                </nav>
                {children}
                <Toaster richColors />
              </TRPCReactProvider>
            </body>
          </OneTapSignin>
        </SessionProvider>
      </ThemeProvider>
    </html>
  );
}
