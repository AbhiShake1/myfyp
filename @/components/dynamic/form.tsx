import Link from "next/link";
import { FypButton, type FypButtonProps } from "./button";
import { type FypInputProps, FypInputs } from "./input";

export type FypFooterProps = {
  text: string,
  link: {
    href: string,
    text: string,
  },
};

export type FypFormProps = {
  type: "form",
  title?: string,
  inputs: Omit<FypInputProps, "type">[],
  button?: Omit<FypButtonProps, "type">,
  footer?: FypFooterProps,
};

export function FypForm({ button, footer, inputs }: FypFormProps) {
  return <div className="w-full max-w-md text-center">
    <form className="flex flex-col items-center">
      <FypInputs>
        {inputs}
      </FypInputs>
      {button && <FypButton type="button" {...button} />}
    </form>
    {
      footer && <p className="text-xs text-gray-500 dark:text-gray-400">
        {footer.text}
        <Link className="pl-1 underline underline-offset-2" href={footer.link.href}>
          {footer.link.text}
        </Link>
      </p>
    }
  </div>
}
