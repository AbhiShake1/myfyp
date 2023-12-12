"use client"

import { DndProvider as Provider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export function DndProvider({ children }: { children: React.ReactNode }) {
  return <Provider backend={HTML5Backend}>{children}</Provider>
}
