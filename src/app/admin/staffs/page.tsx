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
                name: 'Abhi',
                designation: 'Developer',
                stack: 'Flutter/next/nest',
              },
              {
                name: 'Abhi',
                designation: 'Developer',
                stack: 'Flutter/next/nest',
              },
              {
                name: 'Abhi2',
                designation: 'Developer',
                stack: 'Flutter/next/nest',
              },
            ],
          },
        ],
      },
    }}
  </FypPage>
}
