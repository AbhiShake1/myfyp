"use client"

import { type ChangeEvent, useCallback, useState } from "react";
import { Input, type InputProps } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Switch } from "../ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import React from "react";

type DefaultProps = { label: string, placeholder?: string };

type FypOptions = { label: string, value: string }[];

type DefaultRadioProps = { type: "radio", options: FypOptions };

type DefaultSelectProps = { type: "select", options: FypOptions };

export type DefaultInputProps = DefaultProps & Omit<InputProps, "type"> & (
  { type?: Exclude<InputProps["type"], "radio"> } | DefaultSelectProps | DefaultRadioProps
);

export const FYPInput = React.forwardRef<HTMLInputElement, DefaultInputProps>(
  ({ label, placeholder, type, ...rest }, ref) => {
    const [val, setVal] = useState(rest.defaultValue ?? "");

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      switch (type) {
        case "number":
          setVal(e.target.value.replace(/\D/g, ""));
          break;
        default:
          setVal(e.target.value);
      }
    }, []);

    if (type === "switch") {
      return <div className="space-y-2" ref={ref}>
        <Label htmlFor="notification">{label}</Label>
        <div>
          <Switch id={label} />
        </div>
      </div>
    }

    if (type === "select" && "options" in rest) {
      return <div className="space-y-2" ref={ref}>
        <Label>{label}</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {rest.options.map(({ value, label }) => <SelectItem key={value} value={value}>{label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
    }

    if (type === "radio" && "options" in rest) {
      return <div className="space-y-2" ref={ref}>
        <Label>{label}</Label>
        <RadioGroup className="grid grid-cols-2 gap-2">
          {rest.options.map(({ value, label }) => {
            return <Label key={value} className="flex items-center gap-2" htmlFor={value}>
              <RadioGroupItem className="peer" id={value} value={value} />
              <span>{label}</span>
            </Label>
          })}
        </RadioGroup>
      </div>
    }

    if (type === "file") {
      return <div className="space-y-2" ref={ref}>
        <Label htmlFor="file">{label}</Label>
        <Input className={cn("border-dashed border-2 h-12", rest.className)} id="file" type="file" />
      </div>
    }

    if (type === "number") {
      return <div className="space-y-2" ref={ref}>
        <Label>{label}</Label>
        <Input placeholder={placeholder ?? label} value={val} onChange={onChange} {...rest} type="text" />
      </div>
    }

    return <div className="space-y-2" ref={ref}>
      <Label>{label}</Label>
      <Input placeholder={placeholder ?? label} {...rest} type="text" />
    </div>
  })
