import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRightIcon } from "lucide-react"
import { useState } from "react"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.")
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.")
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      alert("✅ Logged in successfully!")
    }, 1200)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="shadow-lg w-1/3 rounded-3xl gap-3 py-5 px-10 flex flex-col"
    >
      <h1 className="text-4xl font-extrabold mb-2">Sign In</h1>

      <div className="flex flex-col mb-3">
        <label className="text-sm text-gray-600 mb-1">Email</label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@email.com"
        />
      </div>

      <div className="flex flex-col mb-4">
        <label className="text-sm text-gray-600 mb-1">Password</label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </div>

      {error && (
        <div className="text-sm text-red-600 text-center mb-2">{error}</div>
      )}

      <div className="flex flex-col items-center gap-4 mt-2">
        <Button
          type="submit"
          size="lg"
          variant="default"
          label="Login"
          className="rounded-full"
          iconPosition="right"
          icon={<ArrowRightIcon />}
          loading={loading}
        />
      </div>
    </form>
  )
}
