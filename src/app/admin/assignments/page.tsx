import { UserTable } from "@/components/user-table";

const assignments = [
  {
    name: 'a',
    user: 'b',
    semester: '5',
  },
];

export default function Page() {
  return <UserTable props={assignments} />;
}
