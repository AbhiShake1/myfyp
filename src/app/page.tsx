import { HomePage } from "@/components/home-page";

import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();
  console.log(session)

  return <HomePage showLogin={!session} />;
}
