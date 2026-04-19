import { Link } from "@tanstack/react-router";
import { Eye } from "lucide-react";
import { COLLEGE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-accent">
                <Eye className="h-5 w-5" />
              </div>
              <span className="font-display text-xl font-bold">EyeAI</span>
            </div>
            <p className="mt-3 text-sm text-white/70 max-w-xs">
              AI-powered eye health detection — combining LLM intelligence with OpenCV vision.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="/#features" className="hover:text-cyan-bright">Features</a></li>
              <li><a href="/#how-it-works" className="hover:text-cyan-bright">How It Works</a></li>
              <li><a href="/#recovery-guide" className="hover:text-cyan-bright">Recovery Guide</a></li>
              <li><Link to="/login" className="hover:text-cyan-bright">Login</Link></li>
              <li><Link to="/register" className="hover:text-cyan-bright">Sign Up</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-3">Academic</h4>
            <p className="text-sm text-white/70">{COLLEGE}</p>
            <p className="mt-3 text-xs text-warning">
              Built for Academic Research — Not for Clinical Use
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/50">
          © 2025 EyeAI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
