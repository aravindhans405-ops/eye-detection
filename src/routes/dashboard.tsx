import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ScanEye,
  AlertTriangle,
  Droplets,
  CheckCircle2,
  Download,
  Heart,
  ArrowRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { RequireAuth } from "@/components/require-auth";
import { AppShell } from "@/components/app-shell";
import { CountUp } from "@/components/count-up";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { RECENT_SCANS, WEEKLY_SCANS, CONDITION_BREAKDOWN } from "@/lib/constants";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — EyeAI" }] }),
  component: () => (
    <RequireAuth>
      <AppShell>
        <Dashboard />
      </AppShell>
    </RequireAuth>
  ),
});

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning";
  if (h < 18) return "Good Afternoon";
  return "Good Evening";
}

function Dashboard() {
  const { user } = useAuth();
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const stats = [
    { label: "Total Scans", value: 24, icon: ScanEye, color: "var(--electric)" },
    { label: "Dry Eye Cases", value: 9, icon: AlertTriangle, color: "var(--danger)" },
    { label: "Wet Eye Cases", value: 6, icon: Droplets, color: "var(--cyan-bright)" },
    { label: "Normal", value: 9, icon: CheckCircle2, color: "var(--success)" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-gradient-hero p-6 text-white shadow-card"
      >
        <h1 className="font-display text-2xl font-bold lg:text-3xl">
          {greeting()}, {user?.name} 👋
        </h1>
        <p className="text-sm text-white/70">{today}</p>
      </motion.div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-border bg-white p-6 shadow-card transition-all hover:-translate-y-1"
            >
              <div
                className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ background: `color-mix(in oklab, ${s.color} 15%, transparent)`, color: s.color }}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="font-display text-3xl font-bold text-navy">
                <CountUp end={s.value} />
              </div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-white p-6 shadow-card lg:col-span-2">
          <h3 className="font-display text-lg font-bold text-navy">Weekly Scans</h3>
          <p className="text-xs text-muted-foreground">Last 7 days</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WEEKLY_SCANS}>
                <XAxis dataKey="day" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "#0A1628",
                    border: "none",
                    borderRadius: 12,
                    color: "white",
                  }}
                />
                <Bar dataKey="scans" fill="#1E90FF" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6 shadow-card">
          <h3 className="font-display text-lg font-bold text-navy">Condition Breakdown</h3>
          <p className="text-xs text-muted-foreground">All-time results</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CONDITION_BREAKDOWN}
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {CONDITION_BREAKDOWN.map((d, i) => (
                    <Cell key={i} fill={d.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent scans */}
      <div className="rounded-2xl border border-border bg-white shadow-card">
        <div className="border-b border-border p-6">
          <h3 className="font-display text-lg font-bold text-navy">Recent Scans</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Condition</th>
                <th className="px-6 py-3 text-left">Severity</th>
                <th className="px-6 py-3 text-left">Score</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_SCANS.map((r, i) => (
                <tr key={i} className="border-t border-border">
                  <td className="px-6 py-4">{r.date}</td>
                  <td className="px-6 py-4 font-medium text-navy">{r.condition}</td>
                  <td className="px-6 py-4">
                    <Badge
                      className={`border-0 text-white ${
                        r.severity === "Healthy"
                          ? "bg-success"
                          : r.severity === "Mild"
                          ? "bg-warning"
                          : "bg-danger"
                      }`}
                    >
                      {r.severity}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 font-semibold">{r.score}%</td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm" className="text-electric hover:bg-electric/10">
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { to: "/detection" as const, icon: ScanEye, label: "Start New Scan", color: "var(--electric)" },
          { to: "/dashboard" as const, icon: Download, label: "Download Report", color: "var(--cyan-bright)" },
          { to: "/recovery" as const, icon: Heart, label: "View Recovery Plan", color: "var(--success)" },
        ].map((q, i) => {
          const Icon = q.icon;
          return (
            <Link key={i} to={q.to}>
              <div className="group flex h-full items-center justify-between rounded-2xl border border-border bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-glow">
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ background: `color-mix(in oklab, ${q.color} 15%, transparent)`, color: q.color }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-display font-semibold text-navy">{q.label}</span>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-electric" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
