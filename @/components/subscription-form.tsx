/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/r8FRtpBRP5f
 */
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export function SubscriptionForm() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Choose Your Subscription
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Select a plan that best fits your needs. We offer flexible subscription options for every type of user.
            </p>
          </div>
          <div className="flex md:flex-row flex-col justify-center items-center space-y-2 md:space-y-0 md:space-x-4">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Plan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>Unlimited access for a month</p>
                <Button variant="outline">Select Plan</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Weekly Plan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>Unlimited access for a week</p>
                <Button variant="outline">Select Plan</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Annual Plan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>Unlimited access for a year</p>
                <Button variant="outline">Select Plan</Button>
              </CardContent>
            </Card>
          </div>
          <div className="w-full max-w-md space-y-2">
            <form className="flex flex-col space-y-2">
              <Label htmlFor="custom-subscription">Custom Subscription</Label>
              <Input
                className="max-w-lg flex-1"
                id="custom-subscription"
                placeholder="Enter number of days, months, or years"
              />
              <Link href="/admin">
                <Button type="submit">Create Plan</Button>
              </Link>
            </form>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Create a custom plan based on your needs.
              <Link className="underline underline-offset-2" href="#">
                Terms & Conditions
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
