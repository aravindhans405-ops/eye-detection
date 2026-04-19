import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { DRY_RECOVERY, WET_RECOVERY } from "@/lib/constants";

export function RecoveryTabs() {
  const [tab, setTab] = useState<"dry" | "wet">("dry");
  const data = tab === "dry" ? DRY_RECOVERY : WET_RECOVERY;

  return (
    <div>
      <div className="mx-auto mb-10 inline-flex rounded-2xl bg-secondary p-1.5 shadow-card">
        {(["dry", "wet"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 ${
              tab === t
                ? "bg-navy text-white shadow-md"
                : "text-foreground/70 hover:text-navy"
            }`}
          >
            {t === "dry" ? "Dry Eye Recovery" : "Wet Eye Recovery"}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.ol
          key={tab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35 }}
          className="relative mx-auto max-w-3xl space-y-6 border-l-2 border-electric/30 pl-8"
        >
          {data.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="relative"
            >
              <span className="absolute -left-[42px] flex h-8 w-8 items-center justify-center rounded-full bg-gradient-accent text-sm font-bold text-white shadow-glow">
                {i + 1}
              </span>
              <div className="rounded-2xl border border-border bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-glow">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <h4 className="font-display text-lg font-semibold">
                    <span className="mr-2 text-2xl">{s.icon}</span>
                    {s.title}
                  </h4>
                  <Badge className="bg-electric/10 text-electric hover:bg-electric/10">{s.badge}</Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </AnimatePresence>
    </div>
  );
}
