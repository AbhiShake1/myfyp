import { FypPage } from "@/components/dynamic";

export default function Page() {
  return <FypPage>
    {{
      body: {
        expand: true,
        sections: [
          {
            type: "table",
						searchField: "name",
            data: [
              {
                name: 'b',
                user: 'c',
                semester: 6,
              },
              {
                name: 'a',
                user: 'b',
                semester: '5',
              },
            ],
          },
        ],
      },
    }}
  </FypPage>
}
