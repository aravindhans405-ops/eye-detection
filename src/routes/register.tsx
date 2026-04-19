import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Mail, Lock, User, Loader2, Check, X } from "lucide-react";
import { toast } from "sonner";
import { AuthShell } from "@/components/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create Account — EyeAI" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const checks = useMemo(() => ({
    len: password.length >= 8,
    upper: /[A-Z]/.test(password),
    num: /\d/.test(password),
  }), [password]);

  const strength = (Object.values(checks).filter(Boolean).length / 3) * 100;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return toast.error("Please fill all fields.");
    if (password !== confirm) return toast.error("Passwords do not match.");
    if (!checks.len || !checks.upper || !checks.num) return toast.error("Password does not meet requirements.");
    if (!terms) return toast.error("Please accept the terms.");

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login({ name, email });
      toast.success("Account created! Welcome to EyeAI.");
      navigate({ to: "/dashboard" });
    }, 1000);
  };

  return (
    <AuthShell title="Create Account" subtitle="Start your eye health journey">
      <form onSubmit={submit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Aravindhan" className="pl-10 rounded-xl py-6" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className="pl-10 rounded-xl py-6" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="pl-10 rounded-xl py-6" />
          </div>

          <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${strength}%`,
                background: strength < 67 ? "var(--warning)" : "var(--success)",
              }}
            />
          </div>
          <ul className="grid grid-cols-3 gap-2 text-[11px]">
            {[
              { ok: checks.len, label: "8+ chars" },
              { ok: checks.upper, label: "Uppercase" },
              { ok: checks.num, label: "Number" },
            ].map((c) => (
              <li key={c.label} className={`flex items-center gap-1 ${c.ok ? "text-success" : "text-muted-foreground"}`}>
                {c.ok ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />} {c.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm">Confirm Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="confirm" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="••••••••" className="pl-10 rounded-xl py-6" />
          </div>
        </div>

        <label className="flex items-start gap-2 text-xs text-muted-foreground">
          <Checkbox checked={terms} onCheckedChange={(v) => setTerms(!!v)} className="mt-0.5" />
          <span>I agree to the <a className="text-electric font-medium hover:underline" href="#">Terms & Conditions</a></span>
        </label>

        <Button type="submit" disabled={loading} className="w-full rounded-xl bg-navy py-6 text-base font-semibold text-white hover:bg-electric hover:shadow-glow transition-all">
          {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Creating account...</> : "Create Account"}
        </Button>

        <div className="relative my-1 flex items-center">
          <div className="flex-1 border-t border-border" />
          <span className="mx-3 text-xs text-muted-foreground">OR</span>
          <div className="flex-1 border-t border-border" />
        </div>

        <Button type="button" variant="outline" className="w-full rounded-xl py-6 font-semibold">
          Continue with Google
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-electric hover:underline">Login →</Link>
      </p>
    </AuthShell>
  );
}
