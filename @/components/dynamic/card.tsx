import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { FypButton, type FypButtonProps } from "./button";
import { type FypInputProps, FypInputs } from "./input";

export type FypCardProps = {
  type: "card",
  header: {
    title: string,
    description?: string,
  },
  content?: (string | FypButtonProps)[],
  inputs?: Omit<FypInputProps, "type">[],
  button?: FypButtonProps,
};

export function FypCard({ content, header, inputs }: FypCardProps) {
  return <Card className="text-center">
    <CardHeader>
      <CardTitle>{header?.title ?? ""}</CardTitle>
      <CardDescription>{header?.description ?? ""}</CardDescription>
    </CardHeader>
    <CardContent className="space-y-2">
      {
        content?.map(c => {
          if (typeof c === "string") {
            return <p>{c}</p>
          }
          if ("type" in c) {
            switch (c.type) {
              case "button":
                return <FypButton {...c} />
            }
          }
        })
      }
      <FypInputs>{inputs}</FypInputs>
    </CardContent>
  </Card>
}

