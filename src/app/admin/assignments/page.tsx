"use client";

import { CRUDTable } from "@/components/table";
import { api } from "~/trpc/react";

export default function Page() {
  const { data: assignments } = api.assignment.all.useQuery();
  const updateMutation = api.assignment.update.useMutation();
  const createMutation = api.assignment.create.useMutation();
  const deleteMutation = api.assignment.delete.useMutation();

  if (!assignments) return null;

  return <CRUDTable data={assignments} deleteMutation={deleteMutation} createMutation={createMutation} updateMutation={updateMutation} createSchema={{
    userId: {
      type: "text",
      label: "User ID",
      placeholder: "user_01",
      required: true,
    },
  }} searchField="userId" />;
}

