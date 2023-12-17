"use client";

import { useRouter } from "next/navigation";
import { Button, type ButtonProps } from "../ui/button";

export type FypButtonProps = {
  type: "button",
  text: string,
  // array for future use, to input multiple independent handlers
  actions?: FypClickAction[],
  buttonType?: ButtonProps["type"],
  variant?: ButtonProps["variant"],
  expand?: boolean,
};

export type FypClickAction = {
  navigate?: "refresh" | "back" | {
    to: string,
    type: "push" | "replace",
  },
};

export function FypButton({ variant, buttonType, actions, text, expand = true }: FypButtonProps) {
  const router = useRouter();
  return <Button className={`${expand ? "w-full" : ""} my-2`} type={buttonType} variant={variant} onClick={() => {
    for (const action of actions ?? []) {
      if (action.navigate) {
        switch (action.navigate) {
          case "back":
            router.back();
            break;
          case "refresh":
            router.refresh();
            break;
          default:
            const { navigate: { to, type } } = action;
            switch (type) {
              case "push":
                router.push(to);
                break;
              case "replace":
                router.replace(to);
                break;
            }
        }
      }
    }
  }}
  >
    {text}
  </Button>
}
