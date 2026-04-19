import { motion } from "framer-motion";

export function EyeIllustration() {
  return (
    <div className="relative mx-auto h-80 w-80 lg:h-96 lg:w-96">
      {/* outer rings */}
      <motion.div
        className="absolute inset-0 rounded-full border border-electric/30"
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.2, 0.6] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute inset-6 rounded-full border border-cyan-bright/40"
        animate={{ scale: [1, 1.05, 1], opacity: [0.7, 0.3, 0.7] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
      />

      {/* eye shape */}
      <div className="absolute inset-12 flex items-center justify-center rounded-full bg-gradient-to-br from-white to-secondary shadow-glow">
        <svg viewBox="0 0 200 200" className="h-full w-full">
          <defs>
            <radialGradient id="iris" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00C8FF" />
              <stop offset="60%" stopColor="#1E90FF" />
              <stop offset="100%" stopColor="#0A1628" />
            </radialGradient>
          </defs>
          <motion.g
            animate={{ x: [0, 8, -8, 0], y: [0, -4, 4, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <circle cx="100" cy="100" r="55" fill="url(#iris)" />
            <circle cx="100" cy="100" r="22" fill="#0A1628" />
            <circle cx="92" cy="92" r="6" fill="white" opacity="0.85" />
          </motion.g>
        </svg>
      </div>

      {/* scan line */}
      <div className="pointer-events-none absolute inset-12 overflow-hidden rounded-full">
        <div className="animate-scan-line absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-bright to-transparent shadow-[0_0_20px_var(--cyan-bright)]" />
      </div>
    </div>
  );
}
