import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { getServerAuthSession } from "~/server/auth";

export async function AdminDashboard() {
  const session = await getServerAuthSession();

  return <>
    <div className="flex items-center">
      <h1 className="font-semibold text-lg md:text-2xl">Welcome to Admin Dashboard</h1>
    </div>
    <div className="grid lg:grid-cols-3 gap-4">
      {
        session?.user.role === "admin" && <Card>
          <CardHeader className="pb-4">
            <CardTitle>Manage Staff</CardTitle>
            <CardDescription>View, add, update, and delete staff members.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin/staffs">
              <Button className="w-full" size="sm">
                Go to Staff
              </Button>
            </Link>
          </CardContent>
        </Card>
      }
      <Card>
        <CardHeader className="pb-4">
          <CardTitle>Manage Students</CardTitle>
          <CardDescription>View, add, update, and delete students.</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/admin/students">
            <Button className="w-full" size="sm">
              Go to Students
            </Button>
          </Link>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-4">
          <CardTitle>Manage Assignments</CardTitle>
          <CardDescription>View, add, update, and delete assignments.</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="admin/assignments">
            <Button className="w-full" size="sm">
              Go to Assignments
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  </>
}
