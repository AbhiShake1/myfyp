/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/j6tSza98reY
 */
import { LoginWithGoogleButton } from "./login-with-google-button"

export function LoginForm() {
  return (
    <div className="mx-auto max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-gray-500 dark:text-gray-400">Login with your Google organization account</p>
      </div>
      <div className="space-y-4">
        <LoginWithGoogleButton />
      </div>
    </div>
  )
}
