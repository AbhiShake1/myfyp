/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/9FK4gNCtAGn
 */
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function LoginJourneyForm() {
  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">User Registration</h1>
        <p className="text-gray-500 dark:text-gray-400">Please enter your details to create an account</p>
      </div>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Step 1: Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First name</Label>
                <Input id="first-name" placeholder="John" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" placeholder="Doe" required />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Step 2: College Selection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-2">
              <Label htmlFor="college">College</Label>
              <Input id="college" placeholder="Harvard University" required />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Step 3: Batch and Course Selection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="batch">Batch</Label>
                <Input id="batch" placeholder="2022" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="course">Course</Label>
                <Input id="course" placeholder="Computer Science" required />
              </div>
            </div>
          </CardContent>
        </Card>
        <Button className="w-full" type="submit">
          Register
        </Button>
      </div>
    </div>
  )
}
