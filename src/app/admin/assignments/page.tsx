import { FypPage } from "@/components/dynamic";
import { getServerAuthSession } from "~/server/auth";

export default async function Page() {
  const session = await getServerAuthSession();
  console.log(session);

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
