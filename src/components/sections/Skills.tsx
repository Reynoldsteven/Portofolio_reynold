"use client";

import { motion } from "framer-motion";
import { SectionHeader, SectionReveal, fadeUp } from "@/components/ui";
import { skills } from "@/lib/portfolioData";

/* Level bar component */
function LevelBar({ level }: { level: number }) {
  return (
    <div className="mt-1 h-1 w-full rounded-full bg-[rgba(139,92,246,0.10)]">
      <motion.div
        className="h-full rounded-full"
        style={{ background: `linear-gradient(90deg, #8b5cf6, #6366f1)` }}
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
      />
    </div>
  );
}

/* Category color map */
const catColors: Record<string, string> = {
  "Frontend":  "#8b5cf6",
  "Backend":   "#6366f1",
  "Database":  "#60a5fa",
  "Dev Tools": "#a78bfa",
};

export function Skills() {
  return (
    <SectionReveal id="skills" className="mx-auto max-w-6xl px-4 py-24 md:px-8">
      <SectionHeader
        number="// 02"
        title="My Skills"
        subtitle="Technologies I work with — from mobile to full-stack web development."
      />

      {/* Bento grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group) => {
          const accent = catColors[group.category] ?? "#8b5cf6";
          return (
            <motion.div
              key={group.category}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, borderColor: "rgba(139,92,246,0.40)" }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className={`rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] p-6 cursor-default
                ${group.colSpan === 2 ? "sm:col-span-2 lg:col-span-2" : ""}
              `}
              style={{ boxShadow: `0 0 0 0 ${accent}` }}
            >
              {/* Category label */}
              <div className="mb-5 flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: accent }}
                />
                <span className="text-xs font-bold uppercase tracking-widest text-[var(--fg-muted)]">
                  {group.category}
                </span>
              </div>

              {/* Items */}
              <div className="flex flex-col gap-4">
                {group.items.map((item) => (
                  <div key={item.name}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-[var(--fg-heading)]">
                        {item.name}
                      </span>
                      <span className="font-mono text-xs text-[var(--fg-muted)]">
                        {item.level}%
                      </span>
                    </div>
                    <LevelBar level={item.level} />
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionReveal>
  );
}
