import { UserTable } from "@/components/user-table";

const staffs = [
  {
    name: 'Abhi',
    designation: 'Developer',
    stack: 'Flutter/next/nest',
  },
  {
    name: 'Abhi',
    designation: 'Developer',
    stack: 'Flutter/next/nest',
  },
];

export default function Page() {
  return <UserTable props={staffs} />;
}
