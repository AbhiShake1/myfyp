"use client"

import { useCallback, useState } from "react";
import { useSession, signIn, type SignInOptions } from "next-auth/react";
import { env } from "~/env";
import { type CredentialResponse } from "google-one-tap";

interface OneTapSigninOptions {
  parentContainerId?: string;
}

type Props = { children: React.ReactNode, options?: OneTapSigninOptions & Pick<SignInOptions, "redirect" | "callbackUrl"> };

export const OneTapSignin = ({ children, options }: Props) => {
  const { parentContainerId } = options ?? {};
  const [isLoading, setIsLoading] = useState(false);

  const signInCallback = useCallback(async (response: CredentialResponse) => {
    setIsLoading(true);

    await signIn("googleonetap", {
      redirect: false,
			credential: response.credential,
      callbackUrl: `${window.location.origin}/login/journey`,
      ...options,
    });

    setIsLoading(false);
  }, [])

  useSession({
    required: true,
    onUnauthenticated() {
      if (isLoading) return;
      const { google } = window;
      if (!google) return;
      google.accounts.id.initialize({
        client_id: env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: (res) => void signInCallback(res),
        prompt_parent_id: parentContainerId,
      });

      // Here we just console.log some error situations and reason why the google one tap
      // is not displayed. You may want to handle it depending on yuor application
      google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed()) {
          console.log("getNotDisplayedReason ::", notification.getNotDisplayedReason());
        } else if (notification.isSkippedMoment()) {
          console.log("getSkippedReason  ::", notification.getSkippedReason());
        } else if (notification.isDismissedMoment()) {
          console.log("getDismissedReason ::", notification.getDismissedReason());
        }
      });
    },
  });

  return children;
};
