import { CRUDTable } from "@/components/table";

const users = [
	{
		name: 'abhi',
		age: 22,
		height: 161,
	},
	{
		name: 'abhi',
		age: 22,
		height: 161,
	},
];

export default function Page() {
  return <CRUDTable data={users} />;
}
