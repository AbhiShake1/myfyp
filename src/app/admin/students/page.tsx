"use client";

import { CRUDTable } from "@/components/table";
import { api } from "~/trpc/react";

export default function Page() {
  const { data: users } = api.student.all.useQuery();
  const updateMutation = api.student.update.useMutation();

  if (!users) return null;

  return <CRUDTable data={users} updateMutation={updateMutation} createSchema={{
    name: {
      label: "Name",
      placeholder: "John Doe",
    },
    email: {
      label: "Email",
      placeholder: "john.doe@gmail.com",
    },
  }} />;
}
