import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Play, Sparkles, Activity, FileText, Loader2, Download, X } from "lucide-react";
import { RequireAuth } from "@/components/require-auth";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useScan } from "@/hooks/use-scan";
import { DRY_RECOVERY, WET_RECOVERY } from "@/lib/constants";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/detection")({
  head: () => ({ meta: [{ title: "Eye Detection — EyeAI" }] }),
  component: () => (
    <RequireAuth>
      <AppShell>
        <DetectionPage />
      </AppShell>
    </RequireAuth>
  ),
});

function DetectionPage() {
  const { scanning, result, start, reset } = useScan();
  const [showRecovery, setShowRecovery] = useState(false);

  const severityColor =
    result?.severity === "Healthy"
      ? "bg-success"
      : result?.severity === "Mild"
      ? "bg-warning"
      : result?.severity === "Moderate"
      ? "bg-warning"
      : "bg-danger";

  const recoverySteps = result?.condition === "WET EYE" ? WET_RECOVERY : DRY_RECOVERY;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-navy">Eye Detection</h1>
        <p className="text-sm text-muted-foreground">Live AI scan powered by OpenCV + LLM</p>
      </div>

      {/* Camera box */}
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-border bg-navy shadow-card">
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Camera className="h-20 w-20 text-white/20" />
        </div>
        {/* scan overlay */}
        {scanning && (
          <div className="absolute inset-0 overflow-hidden">
            <div className="animate-scan-line absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-bright to-transparent shadow-[0_0_24px_var(--cyan-bright)]" />
            {/* corner brackets */}
            {[
              "top-6 left-6 border-l-2 border-t-2",
              "top-6 right-6 border-r-2 border-t-2",
              "bottom-6 left-6 border-l-2 border-b-2",
              "bottom-6 right-6 border-r-2 border-b-2",
            ].map((c) => (
              <div key={c} className={`absolute h-10 w-10 border-cyan-bright ${c}`} />
            ))}
          </div>
        )}

        <div className="absolute top-4 left-4">
          <Badge className={`${scanning ? "bg-warning" : "bg-success"} text-white border-0`}>
            <span className="mr-2 h-2 w-2 rounded-full bg-white animate-pulse" />
            {scanning ? "Scanning..." : "Camera Active"}
          </Badge>
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={() => start()}
          disabled={scanning}
          size="lg"
          className="rounded-xl bg-navy px-10 py-7 text-base font-semibold text-white hover:bg-electric hover:shadow-glow transition-all animate-pulse-glow"
        >
          {scanning ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Analyzing...</> : <><Play className="mr-2 h-5 w-5" />Start Eye Scan</>}
        </Button>
      </div>

      {/* Results */}
      <AnimatePresence mode="wait">
        {scanning && (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-4 rounded-2xl border border-border bg-white p-6"
          >
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-6 animate-pulse rounded-lg bg-secondary" />
            ))}
          </motion.div>
        )}

        {result && !scanning && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid gap-6 rounded-2xl border border-border bg-white p-6 shadow-card md:grid-cols-3"
          >
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-electric" />
                <span className="text-xs font-bold tracking-widest text-electric">DETECTION RESULT</span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-display text-2xl font-bold text-navy">{result.condition}</h2>
                <Badge className={`${severityColor} text-white border-0`}>Severity: {result.severity}</Badge>
              </div>

              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Activity className="h-4 w-4 text-electric" />
                {result.movement}
              </div>

              <div className="rounded-xl border border-border bg-secondary p-4">
                <div className="mb-2 flex items-center gap-2 text-xs font-bold tracking-widest text-navy">
                  <FileText className="h-3.5 w-3.5" /> LLM SUMMARY
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">{result.llmSummary}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => setShowRecovery(true)}
                  className="rounded-xl bg-navy text-white hover:bg-electric hover:shadow-glow"
                >
                  View Full Recovery Guide
                </Button>
                <Button variant="outline" className="rounded-xl" onClick={reset}>
                  Run Again
                </Button>
              </div>
            </div>

            {/* Confidence ring */}
            <div className="flex flex-col items-center justify-center">
              <ConfidenceRing value={result.confidence} />
              <p className="mt-3 text-sm text-muted-foreground">Confidence Score</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recovery Modal */}
      <AnimatePresence>
        {showRecovery && result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={() => setShowRecovery(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl"
            >
              <button
                onClick={() => setShowRecovery(false)}
                className="absolute right-4 top-4 rounded-full p-2 hover:bg-secondary"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
              <h2 className="font-display text-2xl font-bold text-navy">Recovery Guide</h2>
              <p className="text-sm text-muted-foreground">Personalized for: {result.condition}</p>

              <Accordion type="single" collapsible className="mt-6">
                {recoverySteps.map((s, i) => (
                  <AccordionItem key={i} value={`s-${i}`} className="border-border">
                    <AccordionTrigger className="text-left font-semibold">
                      <span className="mr-3 text-xl">{s.icon}</span> {s.title}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{s.desc}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="mt-6 flex gap-3">
                <Button className="flex-1 rounded-xl bg-navy text-white hover:bg-electric">
                  <Download className="mr-2 h-4 w-4" /> Download PDF
                </Button>
                <Button variant="outline" className="rounded-xl" onClick={() => setShowRecovery(false)}>
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ConfidenceRing({ value }: { value: number }) {
  const r = 50;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="relative h-36 w-36">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={r} stroke="var(--border)" strokeWidth="10" fill="none" />
        <motion.circle
          cx="60"
          cy="60"
          r={r}
          stroke="var(--electric)"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-display text-2xl font-bold text-navy">{value.toFixed(1)}%</span>
      </div>
    </div>
  );
}
