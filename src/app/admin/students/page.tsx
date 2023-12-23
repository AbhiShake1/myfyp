import { UserTable } from "@/components/user-table";

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
  return <UserTable props={users} />;
}
