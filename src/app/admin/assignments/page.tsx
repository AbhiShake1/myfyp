import { FypPage } from "@/components/dynamic";

export default function Page() {
  return <FypPage>
    {{
      body: {
        expand: true,
        sections: [
          {
            type: "table",
            data: [
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
