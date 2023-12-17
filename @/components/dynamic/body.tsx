"use client";

import { useMemo } from "react";
import { FypButton, type FypButtonProps } from "./button";
import { type FypCardProps, FypCard } from "./card";
import { FypForm, type FypFormProps } from "./form";
import { type FypInputProps } from "./input";

export type FypPageBodySection = (
  FypCardProps |
  FypInputProps |
  FypButtonProps |
  FypFormProps |
  FypPageBodyProps
);

export type FypPageBodyProps = {
  expand?: boolean,
  layout?: "grid" | "col" | "row",
  sections?: FypPageBodySection[],
};

export function FypPageBody(body: FypPageBodyProps) {
  const layout = useMemo(() => {
    switch (body.layout) {
      case "row":
        return "py-4 flex flex-row space-x-2 justify-center";
      case "grid":
        return "py-4 grid grid-flow-col auto-cols-max gap-4 place-items-center justify-center";
      default:
        return "my-4 flex flex-col justify-center w-full items-stretch space-y-4";
    }
  }, [body.layout])

  return <div className={layout}>
    {
      body.sections?.map(
        (props, index) => {
          if (!("type" in props)) {
            return <FypPageBody {...props} key={index} />;
          }
          switch (props.type) {
            case "card":
              return <FypCard {...props} key={index} />;
            case "button":
              return <FypButton {...props} key={index} />;
            case "form":
              return <FypForm {...props} key={index} />
          }
        },
      )
    }
  </div>
}
