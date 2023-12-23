import { CRUDTable } from "@/components/table";

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
  return <CRUDTable data={staffs} createSchema={[]}/>;
}
