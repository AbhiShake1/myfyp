import { LoginForm } from "@/components/login-form"
import { Center } from "@/components/ui/center"
import { getServerAuthSession } from "~/server/auth"
import { redirect } from "next/navigation"

export default async function Page() {
  if ((await getServerAuthSession())?.user) {
    return redirect("/");
  }

  return <Center>
    <LoginForm />
  </Center>
}
