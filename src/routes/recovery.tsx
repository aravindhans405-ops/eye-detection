import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AlertTriangle, CalendarCheck } from "lucide-react";
import { RequireAuth } from "@/components/require-auth";
import { AppShell } from "@/components/app-shell";
import { RecoveryTabs } from "@/components/recovery-tabs";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GENERAL_TIPS, FAQS } from "@/lib/constants";

export const Route = createFileRoute("/recovery")({
  head: () => ({ meta: [{ title: "Recovery Guide — EyeAI" }] }),
  component: () => (
    <RequireAuth>
      <AppShell>
        <RecoveryPage />
      </AppShell>
    </RequireAuth>
  ),
});

function RecoveryPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-display text-3xl font-bold text-navy lg:text-4xl">Recovery Guide</h1>
        <p className="mt-2 text-muted-foreground">
          Clinically-informed step-by-step recovery for both dry and wet eye conditions.
        </p>
      </motion.div>

      <section className="text-center">
        <RecoveryTabs />
      </section>

      <div className="rounded-2xl border border-warning/30 bg-warning/10 p-5 flex gap-3">
        <AlertTriangle className="h-5 w-5 shrink-0 text-warning" />
        <p className="text-sm text-foreground/80">
          <strong>Important:</strong> This guide is AI-assisted and informational only. Always consult a licensed ophthalmologist for medical treatment.
        </p>
      </div>

      {/* General Eye Health Tips */}
      <section>
        <h2 className="font-display text-2xl font-bold text-navy">General Eye Health Tips</h2>
        <p className="text-sm text-muted-foreground">Daily habits to keep your eyes healthy</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {GENERAL_TIPS.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-border bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-glow"
            >
              <div className="text-3xl">{t.icon}</div>
              <h3 className="mt-3 font-display font-semibold text-navy">{t.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section>
        <h2 className="font-display text-2xl font-bold text-navy">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="mt-6 rounded-2xl border border-border bg-white px-6 shadow-card">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`f-${i}`} className="border-border">
              <AccordionTrigger className="font-semibold text-navy">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <div className="rounded-2xl bg-gradient-hero p-8 text-center text-white shadow-card">
        <h3 className="font-display text-2xl font-bold">Need a professional opinion?</h3>
        <p className="mt-2 text-white/70">Book a consultation with a certified ophthalmologist.</p>
        <Button className="mt-5 rounded-xl bg-white px-6 py-5 text-navy font-semibold hover:bg-cyan-bright hover:text-white transition-all">
          <CalendarCheck className="mr-2 h-4 w-4" /> Book Consultation
        </Button>
      </div>
    </div>
  );
}
