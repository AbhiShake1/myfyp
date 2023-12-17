import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { FypPageBody, type FypPageBodyProps } from "./body";

export type FypCardProps = {
  type: "card",
  header: {
    title: string,
    description?: string,
  },
  content?: FypPageBodyProps["sections"],
};

export function FypCard({ content, header }: FypCardProps) {
  return <Card className="text-center">
    <CardHeader>
      <CardTitle>{header?.title ?? ""}</CardTitle>
      <CardDescription>{header?.description ?? ""}</CardDescription>
    </CardHeader>
    <CardContent className="space-y-2">
      {content && <FypPageBody sections={content} />}
    </CardContent>
  </Card>
}

