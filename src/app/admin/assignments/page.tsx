import { CRUDTable } from "@/components/table";

const assignments = [
  {
    name: 'a',
    user: 'b',
    semester: '5',
  },
];

export default function Page() {
  return <CRUDTable data={assignments} />;
}
