import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "../ui/card"

export function Login({ onLogin, onToggleMode }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = e => {
    e.preventDefault()
    const role = email.includes("admin") ? "admin" : "user"
    onLogin(email, role)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 px-4">
      {/* 🌟 Hero Section */}
      <div className="text-center mb-12 animate-fade-in">
        <h1
          className="font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 drop-shadow-md mb-4"
          style={{
            fontSize: "56px",
            lineHeight: "1.1"
          }}
        >
          Online Workshop & Training Platform
        </h1>
        <p
          className="text-muted-foreground max-w-2xl mx-auto"
          style={{
            fontSize: "18px",
            lineHeight: "1.6"
          }}
        >
          Organize, manage, and participate in interactive workshops designed
          for growth and skill development.
        </p>
      </div>

      {/* 💻 Login Card */}
      <div className="w-full max-w-md">
        <Card className="shadow-xl border border-border/60">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-semibold">Welcome Back</CardTitle>
            <CardDescription className="text-sm">
              Sign in to your workshop account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full text-base py-2.5">
                Sign In
              </Button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={onToggleMode}
                  className="text-primary hover:underline font-medium"
                >
                  Sign up
                </button>
              </p>
            </div>

            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground mb-2">
                Demo accounts:
              </p>
              <p className="text-xs">Admin: admin@workshop.com</p>
              <p className="text-xs">User: user@workshop.com</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
