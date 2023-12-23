import { CRUDTable } from "@/components/table";

const assignments = [
  {
    name: 'a',
    user: 'b',
    semester: '5',
  },
];

const schema = [
  {
    type: "text",
    label: "Name",
    placeholder: "John Doe",
		required: true,
  },
  {
    type: "select",
		placeholder: "User",
    label: "User",
    options: ["a", "b"].map(o => ({ label: o, value: o })),
  },
];

export default function Page() {
  return <CRUDTable data={assignments} createSchema={schema} />;
}
