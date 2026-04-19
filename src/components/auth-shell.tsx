import { motion } from "framer-motion";
import { Eye } from "lucide-react";

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left side */}
      <div className="relative hidden overflow-hidden bg-gradient-hero text-white lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-electric/30 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-cyan-bright/20 blur-3xl" />

        <div className="relative flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-accent">
            <Eye className="h-5 w-5" />
          </div>
          <span className="font-display text-xl font-bold">EyeAI</span>
        </div>

        <div className="relative">
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="mx-auto flex h-64 w-64 items-center justify-center rounded-full glass shadow-glow"
          >
            <svg viewBox="0 0 200 200" className="h-40 w-40">
              <defs>
                <radialGradient id="iris2" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#00C8FF" />
                  <stop offset="60%" stopColor="#1E90FF" />
                  <stop offset="100%" stopColor="#0A1628" />
                </radialGradient>
              </defs>
              <circle cx="100" cy="100" r="80" fill="url(#iris2)" />
              <circle cx="100" cy="100" r="32" fill="#0A1628" />
              <circle cx="88" cy="88" r="9" fill="white" opacity="0.9" />
            </svg>
          </motion.div>
          <p className="mt-8 text-center text-lg font-display">
            See clearly. <span className="text-cyan-bright">Detect early.</span>
          </p>
        </div>

        <p className="relative text-xs text-white/50">
          © 2025 EyeAI · Academic Research
        </p>
      </div>

      {/* Right side */}
      <div className="flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden mb-8 flex items-center gap-2 text-navy">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-accent text-white">
              <Eye className="h-5 w-5" />
            </div>
            <span className="font-display text-xl font-bold">EyeAI</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-navy">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </motion.div>
      </div>
    </div>
  );
}
