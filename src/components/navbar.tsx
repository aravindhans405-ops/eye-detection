import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Eye, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/", label: "Home" },
  { to: "/#features", label: "Features" },
  { to: "/#how-it-works", label: "How It Works" },
  { to: "/#recovery-guide", label: "Recovery Guide" },
  { to: "/#about", label: "About" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 text-navy">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-accent text-white shadow-glow">
            <Eye className="h-5 w-5" />
          </div>
          <span className="font-display text-xl font-bold">EyeAI</span>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <li key={l.to}>
              <a
                href={l.to}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-electric"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <Link to="/login">
            <Button variant="outline" className="rounded-xl border-navy text-navy hover:bg-navy hover:text-white">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button className="rounded-xl bg-navy text-white hover:bg-electric hover:shadow-glow transition-all">
              Sign Up
            </Button>
          </Link>
        </div>

        <button
          className="lg:hidden text-navy"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-border bg-white px-6 py-6 space-y-4 animate-in slide-in-from-top">
          {links.map((l) => (
            <a
              key={l.to}
              href={l.to}
              onClick={() => setOpen(false)}
              className="block text-sm font-medium text-foreground/80"
            >
              {l.label}
            </a>
          ))}
          <div className="flex gap-3 pt-3">
            <Link to="/login" className="flex-1">
              <Button variant="outline" className="w-full rounded-xl">Login</Button>
            </Link>
            <Link to="/register" className="flex-1">
              <Button className="w-full rounded-xl bg-navy text-white">Sign Up</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
