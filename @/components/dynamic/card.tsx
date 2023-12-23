import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { FypButton, type FypButtonProps } from "./button";
import { FypForm, type FypFormProps } from "./form";
import { type FypInputProps, FypInputs } from "./input";

export type FypCardProps = {
  type: "card",
  header: {
    title: string,
    description?: string,
  },
  content?: (string | FypButtonProps | FypFormProps | FypInputProps)[],
};

export function FypCard({ content, header }: FypCardProps) {
  return <Card className="text-center">
    <CardHeader>
      <CardTitle>{header?.title ?? ""}</CardTitle>
      <CardDescription>{header?.description ?? ""}</CardDescription>
    </CardHeader>
    <CardContent className="space-y-2">
      {
        content?.map((c, index) => {
          if (typeof c === "string") {
            return <p key={index}>{c}</p>
          }
          if ("type" in c) {
            switch (c.type) {
              case "button":
                return <FypButton {...c} key={index} />
              case "form":
                return <FypForm {...c} key={index} />
              case "input":
                return <FypInputs key={index}>{[c]}</FypInputs>
            }
          }
        })
      }
    </CardContent>
  </Card>
}

