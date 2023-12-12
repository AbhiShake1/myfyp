"use client"

/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/Onm5AeqPDSC
 */
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import React, { useCallback, useState } from "react";

const components = [
  {
    name: "Text",
    icon: TextIcon,
  },
  {
    name: "Image",
    icon: ImageIcon,
  },
  {
    name: "Video",
    icon: VideoIcon,
  },
  {
    name: "Form",
    icon: FormInputIcon,
  },
];

export function GuiBuilder() {
  const [items, setItems] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const onDragStart = useCallback((e: React.DragEvent, type: string) => {
    e.dataTransfer.setData("widget", type);
    if (!isDragging)
      setIsDragging(true);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    const widget = e.dataTransfer.getData("widget");
    setItems(i => [...i, widget])
    if (isDragging)
      setIsDragging(false);
  }, [isDragging]);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const onDragEnd = useCallback(() => {
    if (isDragging) setIsDragging(false);
  }, [isDragging])

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[300px_1fr]">
      <div className="hidden lg:block border-r bg-gray-100/40 dark:bg-gray-800/40">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-16 items-center border-b px-4">
            <Link className="flex items-center gap-2 font-semibold" href="/">
              <TextIcon className="h-6 w-6" />
              <span>MERO FYP</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              {components.map(({ icon: Icon, name }) => (
                <Button
                  key={name}
                  draggable
                  onDragStart={e => onDragStart(e, name)}
                  onDragEnd={onDragEnd}
                  variant="ghost" className="gap-2 justify-start"
                >
                  <Icon className="h-4 w-4" />
                  {name}
                </Button>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-16 items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <Link className="lg:hidden" href="#">
            <FacebookIcon className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Link>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
                  placeholder="Search components..."
                  type="search"
                />
              </div>
            </form>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="flex items-center">
            <h1 className="font-semibold text-lg md:text-2xl">Website Builder</h1>
            <Button className="ml-auto text-lg" size="lg">
              Save
            </Button>
          </div>
          <div className={`border ${isDragging && "border-primary"} shadow-sm rounded-lg flex flex-col space-y-2`} onDrop={onDrop} onDragOver={onDragOver}>
            {items.length === 0 && <h2 className="text-lg font-semibold p-4">Drag and drop components here</h2>}
            {items.map(i => <div className="bg-red-400">{i}</div>)}
          </div>
        </main>
      </div>
    </div>
  )
}


function FacebookIcon(props: { className: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}


function TextIcon(props: { className: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 6.1H3" />
      <path d="M21 12.1H3" />
      <path d="M15.1 18H3" />
    </svg>
  )
}


function ImageIcon(props: { className: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  )
}


function VideoIcon(props: { className: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 8-6 4 6 4V8Z" />
      <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
    </svg>
  )
}


function FormInputIcon(props: { className: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="12" x="2" y="6" rx="2" />
      <path d="M12 12h.01" />
      <path d="M17 12h.01" />
      <path d="M7 12h.01" />
    </svg>
  )
}


function SearchIcon(props: { className: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
