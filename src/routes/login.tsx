import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock, Eye as EyeIcon, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AuthShell } from "@/components/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — EyeAI" }] }),
  component: LoginPage,
});

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in both fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (password.length < 4) {
        toast.error("Invalid credentials. Please try again.");
        return;
      }
      login({ name: email.split("@")[0] || "User", email });
      toast.success("Welcome back to EyeAI!");
      navigate({ to: "/dashboard" });
    }, 900);
  };

  return (
    <AuthShell title="Welcome Back" subtitle="Sign in to your EyeAI account">
      <form onSubmit={submit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="pl-10 rounded-xl py-6"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              type={show ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="pl-10 pr-10 rounded-xl py-6"
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              aria-label="Toggle password"
            >
              {show ? <EyeOff className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <Checkbox /> <span className="text-muted-foreground">Remember me</span>
          </label>
          <a href="#" className="text-electric font-medium hover:underline">Forgot password?</a>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-navy py-6 text-base font-semibold text-white hover:bg-electric hover:shadow-glow transition-all"
        >
          {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Signing in...</> : "Sign In"}
        </Button>

        <div className="relative my-2 flex items-center">
          <div className="flex-1 border-t border-border" />
          <span className="mx-3 text-xs text-muted-foreground">OR</span>
          <div className="flex-1 border-t border-border" />
        </div>

        <Button type="button" variant="outline" className="w-full rounded-xl py-6 font-semibold">
          <svg className="mr-2 h-4 w-4" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5h-1.6V20H24v8h11.3C33.7 32.6 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.5 29.3 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5c10.7 0 19.5-8.7 19.5-19.5 0-1.2-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.5 29.3 4.5 24 4.5 16.3 4.5 9.7 8.7 6.3 14.7z"/><path fill="#4CAF50" d="M24 43.5c5.2 0 9.9-2 13.5-5.2L31.2 33c-2 1.5-4.5 2.4-7.2 2.4-5.2 0-9.6-3.3-11.3-8L6.2 32c3.3 6.6 10.1 11.5 17.8 11.5z"/><path fill="#1976D2" d="M43.6 20.5H24v8h11.3c-.8 2.4-2.4 4.4-4.5 5.8l6.3 5.3c-.4.4 6.9-5 6.9-15.6 0-1.2-.1-2.4-.4-3.5z"/></svg>
          Continue with Google
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link to="/register" className="font-semibold text-electric hover:underline">
          Sign Up →
        </Link>
      </p>
    </AuthShell>
  );
}
