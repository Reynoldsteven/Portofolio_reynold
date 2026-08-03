"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Mail } from "lucide-react";
import { personalInfo } from "@/lib/portfolioData";

/** Lazy-load the heavy Three.js canvas — never SSR */
const Scene = dynamic(() => import("@/components/canvas/Scene"), { ssr: false });

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4"
    >
      {/* ── Gradient mesh blobs ─────────────────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="blob h-[500px] w-[500px] -left-32 top-1/4 bg-[#8b5cf6]" />
        <span className="blob h-[400px] w-[400px] right-0 top-1/3 bg-[#6366f1]" />
        <span className="blob h-[300px] w-[300px] left-1/2 bottom-16 bg-[#3b82f6]" />
      </div>

      {/* ── 3D Particle Sphere (background) ───────────────────── */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </div>

      {/* ── Content ──────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 flex items-center gap-2 rounded-full border border-[rgba(16,185,129,0.25)] bg-[rgba(16,185,129,0.08)] px-4 py-1.5 text-xs font-semibold text-[#10b981]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#10b981] animate-pulse" />
          Available for work
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-4 text-5xl font-black tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl text-[var(--fg-heading)]"
        >
          {personalInfo.name}
        </motion.h1>

        {/* Title pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mb-6 rounded-full bg-accent-gradient px-6 py-1.5 text-sm font-bold text-white shadow-lg shadow-purple-500/25"
        >
          {personalInfo.title}
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mb-4 max-w-2xl text-base text-[var(--fg-body)] sm:text-lg leading-relaxed"
        >
          {personalInfo.shortBio}
        </motion.p>

        {/* Location */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="mb-10 flex items-center gap-1.5 text-sm text-[var(--fg-muted)]"
        >
          <MapPin size={13} />
          {personalInfo.location}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 rounded-full bg-accent-gradient px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-purple-500/30"
          >
            View Projects
            <ArrowRight size={16} />
          </motion.a>

          <motion.a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.email}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 rounded-full border border-[var(--border-card)] bg-[var(--bg-card)] px-8 py-3.5 text-sm font-bold text-[var(--fg-heading)] transition-colors hover:border-[var(--border-hover)]"
          >
            <Mail size={16} />
            Contact Me
          </motion.a>
        </motion.div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────── */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--fg-muted)]">Scroll</span>
        <div className="h-10 w-px animate-pulse bg-gradient-to-b from-[var(--fg-muted)] to-transparent" />
      </motion.div>
    </section>
  );
}
