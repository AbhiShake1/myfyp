import { Input } from "../ui/input";
import { Label } from "../ui/label";

export type FypInputProps = {
  type: "input",
  title: string,
  placeholder: string,
  required?: boolean,
};

export function FypInputs({ children: inputs }: { children: Omit<FypInputProps, "type">[] | undefined }) {
  if (inputs?.length === 1) {
    const { title } = inputs[0]!;
    return <div className="space-y-1 w-full text-left" key={title}>
      <Label htmlFor={title}>
        {title}
      </Label>
      <Input className="mx-w-lg flex-1" id={title} {...inputs[0]!} />
    </div>
  }
  return <div className="grid grid-cols-2 gap-4 text-left">
    {
      inputs?.map(({ title, placeholder, required = false }) => {
        return <div className="space-y-1" key={title}>
          <Label htmlFor={title}>{title}</Label>
          <Input className="max-w-lg flex-1" id={title} placeholder={placeholder} required={required} />
        </div>
      })
    }
  </div>
}
