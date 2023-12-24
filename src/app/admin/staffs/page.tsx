"use client";

import { CRUDTable } from "@/components/table";
import { api } from "~/trpc/react";

export default function Page() {
  const { data: staffs } = api.staff.all.useQuery();
  const updateMutation = api.staff.update.useMutation();

  if (!staffs) return null;

  return <CRUDTable data={staffs} createSchema={{
    name: {
      label: "Name",
      placeholder: "John Doe",
    },
    email: {
      label: "Email",
      placeholder: "john.doe@gmail.com",
    },
  }} updateMutation={updateMutation} />;
}
