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
                name: 'abhi',
                age: 22,
                height: 161,
              },
              {
                name: 'abhi',
                age: 22,
                height: 161,
              },
            ],
          },
        ],
      },
    }}
  </FypPage>
}
