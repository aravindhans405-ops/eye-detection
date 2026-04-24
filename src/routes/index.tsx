import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Play, ArrowRight, ShieldCheck, Zap, Microscope, AlertTriangle } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { EyeIllustration } from "@/components/eye-illustration";
import { CountUp } from "@/components/count-up";
import { RecoveryTabs } from "@/components/recovery-tabs";
import { Button } from "@/components/ui/button";
import { FEATURES, STEPS } from "@/lib/constants";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EyeAI — AI-Powered Wet & Dry Eye Detection with LLM + OpenCV" },
      { name: "description", content: "Detect wet and dry eye conditions in real-time with eyeball movement tracking, powered by LLM and OpenCV. Free AI eye health screening." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="bg-background text-foreground">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-60" />
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-electric/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-cyan-bright/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-5xl font-extrabold leading-tight text-navy lg:text-6xl">
              AI-Powered <span className="bg-gradient-accent bg-clip-text text-white">Eye Health</span> Detection
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Real-time Wet & Dry Eye Detection with Eyeball Movement Tracking using LLM + OpenCV.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {[
                { icon: <Microscope className="h-4 w-4" />, label: "Medical Grade AI" },
                { icon: <Zap className="h-4 w-4" />, label: "Real-time Analysis" },
                { icon: <ShieldCheck className="h-4 w-4" />, label: "Clinically Validated" },
              ].map((b) => (
                <span
                  key={b.label}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-4 py-2 text-xs font-semibold text-navy shadow-sm backdrop-blur"
                >
                  {b.icon}
                  {b.label}
                </span>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link to="/register">
                <Button size="lg" className="rounded-xl bg-navy px-8 py-6 text-base font-semibold text-white hover:bg-electric hover:shadow-glow transition-all duration-300">
                  Start Free Detection
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="rounded-xl border-navy px-8 py-6 text-base font-semibold text-navy hover:bg-navy hover:text-white"
              >
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <EyeIllustration />
          </motion.div>
        </div>
      </section>

      {/* STATS BANNER */}
      <section className="bg-gradient-hero text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-14 md:grid-cols-4">
          {[
            { value: 10000, suffix: "+", label: "Scans" },
            { value: 98, suffix: ".7%", label: "Accuracy" },
            { value: 200, suffix: "ms", label: "Detection Speed", prefix: "<" },
            { value: 3, suffix: "", label: "Eye Conditions Detected" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-4xl font-extrabold lg:text-5xl">
                {s.prefix}<CountUp end={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-sm text-white/70">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold tracking-[0.3em] text-electric">CORE CAPABILITIES</span>
            <h2 className="mt-3 font-display text-4xl font-bold text-navy lg:text-5xl">
              Everything you need for eye-health screening
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-white p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
                style={{ borderLeft: `4px solid ${f.color}` }}
              >
                <div className="text-4xl">{f.icon}</div>
                <h3 className="mt-4 font-display text-xl font-bold text-navy">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                <div className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity group-hover:opacity-30" style={{ background: f.color }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="bg-secondary py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold tracking-[0.3em] text-electric">PROCESS</span>
            <h2 className="mt-3 font-display text-4xl font-bold text-navy lg:text-5xl">
              How It Works
            </h2>
          </div>

          <div className="relative mt-14">
            <div className="absolute left-0 right-0 top-8 hidden h-0.5 bg-gradient-to-r from-transparent via-electric to-transparent lg:block" />
            <div className="grid gap-10 lg:grid-cols-4">
              {STEPS.map((s, i) => (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-navy font-display text-xl font-bold text-white shadow-glow">
                    {s.n}
                  </div>
                  <div className="mt-4 text-3xl">{s.icon}</div>
                  <h3 className="mt-2 font-display text-lg font-bold text-navy">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RECOVERY GUIDE */}
      <section id="recovery-guide" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold tracking-[0.3em] text-electric">AFTER DETECTION</span>
            <h2 className="mt-3 font-display text-4xl font-bold text-navy lg:text-5xl">
              What Happens After Detection?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Once your eye condition is identified, EyeAI guides you through a clinically-informed recovery plan.
            </p>
          </div>

          <div className="mt-12 text-center">
            <RecoveryTabs />
          </div>

          <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-warning/30 bg-warning/10 p-5 flex gap-3">
            <AlertTriangle className="h-5 w-5 shrink-0 text-warning" />
            <p className="text-sm text-foreground/80">
              <strong>Important:</strong> This guide is AI-assisted and informational only. Always consult a licensed ophthalmologist for medical treatment.
            </p>
          </div>

          <div className="mt-10 text-center">
            <Link to="/register">
              <Button size="lg" className="rounded-xl bg-navy px-8 py-6 text-base font-semibold text-white hover:bg-electric hover:shadow-glow transition-all">
                Get My Personalized Recovery Plan
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="bg-gradient-hero py-20 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-display text-4xl font-bold">About the Project</h2>
          <p className="mt-4 text-white/80 leading-relaxed">
            EyeAI is an academic research project that combines OpenCV computer vision with large language models to deliver real-time wet & dry eye detection and eyeball movement tracking — built for accessible, screening-grade ophthalmic AI.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
