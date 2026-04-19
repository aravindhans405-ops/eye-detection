import { Link, useNavigate, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, Home, ScanEye, History, BarChart3, Heart, Settings, LogOut, Menu, X, Bell, Search } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Input } from "@/components/ui/input";

const navItems = [
  { to: "/dashboard", icon: Home, label: "Overview" },
  { to: "/detection", icon: ScanEye, label: "New Detection" },
  { to: "/dashboard", icon: History, label: "History" },
  { to: "/dashboard", icon: BarChart3, label: "Reports" },
  { to: "/recovery", icon: Heart, label: "Recovery Guide" },
  { to: "/dashboard", icon: Settings, label: "Settings" },
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  return (
    <div className="flex min-h-screen bg-secondary">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-navy text-white transition-transform lg:relative lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-5 border-b border-white/10">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-accent">
              <Eye className="h-4 w-4" />
            </div>
            <span className="font-display font-bold">EyeAI</span>
          </Link>
          <button className="lg:hidden" onClick={() => setOpen(false)}><X className="h-5 w-5" /></button>
        </div>

        <nav className="p-3 space-y-1">
          {navItems.map((n, i) => {
            const Icon = n.icon;
            const active = location.pathname === n.to;
            return (
              <Link
                key={i}
                to={n.to}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                  active
                    ? "bg-electric text-white shadow-glow"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                {n.label}
              </Link>
            );
          })}
          <button
            onClick={handleLogout}
            className="mt-6 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/70 transition-all hover:bg-danger/20 hover:text-danger"
          >
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </nav>
      </aside>

      {open && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-border bg-white/80 px-4 backdrop-blur lg:px-8">
          <button className="lg:hidden text-navy" onClick={() => setOpen(true)}><Menu className="h-5 w-5" /></button>
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search scans, reports..." className="pl-10 rounded-xl bg-secondary border-transparent" />
          </div>
          <button className="relative rounded-full p-2 hover:bg-secondary" aria-label="Notifications">
            <Bell className="h-5 w-5 text-navy" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-danger" />
          </button>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-accent text-sm font-bold text-white">
              {user?.name?.[0]?.toUpperCase() ?? "U"}
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-semibold text-navy">{user?.name}</div>
              <div className="text-xs text-muted-foreground">{user?.email}</div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
