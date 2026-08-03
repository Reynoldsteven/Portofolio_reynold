"use client";

import { motion } from "framer-motion";
import { SectionHeader, SectionReveal, StaggerContainer, fadeUp } from "@/components/ui";
import { personalInfo } from "@/lib/portfolioData";
import { Code2, Rocket, Heart } from "lucide-react";

const HIGHLIGHTS = [
  {
    icon: <Code2 size={22} className="text-[#8b5cf6]" />,
    title: "Clean Code",
    desc:  "Focused on writing readable, maintainable, and scalable code.",
  },
  {
    icon: <Rocket size={22} className="text-[#6366f1]" />,
    title: "Performance First",
    desc:  "Every project is optimized for speed, UX, and Lighthouse scores.",
  },
  {
    icon: <Heart size={22} className="text-[#60a5fa]" />,
    title: "Design-Aware",
    desc:  "Bridging the gap between engineering and beautiful UI/UX.",
  },
];

export function About() {
  return (
    <SectionReveal id="about" className="mx-auto max-w-6xl px-4 py-24 md:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Text */}
        <div>
          <SectionHeader
            number="// 01"
            title="About Me"
            align="left"
          />
          <p className="mb-4 text-base leading-relaxed text-[var(--fg-body)]">
            {personalInfo.shortBio}
          </p>
          <p className="mb-8 text-base leading-relaxed text-[var(--fg-body)]">
            I&apos;m based in <span className="font-semibold text-[var(--fg-heading)]">{personalInfo.location}</span>.
            When I&apos;m not coding, I enjoy exploring UI patterns, contributing to open source, and
            learning new technologies.
          </p>
          <div className="flex flex-wrap gap-3">
            {["Flutter", "Laravel", "TypeScript", "Tailwind CSS"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--border-card)] bg-[var(--bg-card)] px-4 py-1.5 text-xs font-medium text-[var(--fg-body)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Highlights bento */}
        <StaggerContainer className="flex flex-col gap-4">
          {HIGHLIGHTS.map((h) => (
            <motion.div
              key={h.title}
              variants={fadeUp}
              whileHover={{ scale: 1.02, borderColor: "rgba(139,92,246,0.40)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex items-start gap-4 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] p-6 cursor-default"
            >
              <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[rgba(168,85,247,0.08)]">
                {h.icon}
              </div>
              <div>
                <h3 className="mb-1 font-bold text-[var(--fg-heading)]">{h.title}</h3>
                <p className="text-sm text-[var(--fg-body)]">{h.desc}</p>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </SectionReveal>
  );
}
