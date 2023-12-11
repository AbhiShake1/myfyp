import { HomePage } from "@/components/home-page";

import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();
  console.log(session ?? "no session")

  return <HomePage />;
}
