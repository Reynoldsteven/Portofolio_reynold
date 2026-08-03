"use client";

import { motion, type Variants } from "framer-motion";
import React from "react";

/* ── Section wrapper that fades + slides in on viewport entry ── */

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}

export function SectionReveal({ children, className, delay = 0, id }: SectionRevealProps) {
  return (
    <motion.section
      id={id}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: { opacity: 0, y: 32 },
        show:   { opacity: 1, y: 0, transition: { duration: 0.65, delay, ease: [0.4, 0, 0.2, 1] } },
      }}
    >
      {children}
    </motion.section>
  );
}

/* ── Staggered children container ── */
interface StaggerProps { children: React.ReactNode; className?: string; delay?: number; }

const staggerContainer: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1 } },
};

export function StaggerContainer({ children, className, delay = 0 }: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ ...staggerContainer, show: { transition: { staggerChildren: 0.08, delayChildren: delay } } }}
    >
      {children}
    </motion.div>
  );
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y:  0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
};

/* ── Reusable section header ── */
interface SectionHeaderProps {
  number?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}
export function SectionHeader({ number, title, subtitle, align = "center" }: SectionHeaderProps) {
  const textAlign = align === "center" ? "text-center items-center" : "items-start";
  return (
    <motion.div
      className={`mb-12 flex flex-col gap-3 ${textAlign}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {number && (
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--fg-muted)]">
          {number}
        </span>
      )}
      <h2 className="text-3xl font-black tracking-tight sm:text-4xl text-[var(--fg-heading)]">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-xl text-base text-[var(--fg-body)]">{subtitle}</p>
      )}
    </motion.div>
  );
}
