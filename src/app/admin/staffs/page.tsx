import { FypPage } from "@/components/dynamic";
import { api } from "~/trpc/server";

export default async function Page() {
  const data = await api.staff.all.query();

  return <FypPage>
    {{
      body: {
        expand: true,
        sections: [
          {
            type: "table",
            data,
          },
        ],
      },
    }}
  </FypPage>
}
