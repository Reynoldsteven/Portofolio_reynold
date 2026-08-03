"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { personalInfo } from "@/lib/portfolioData";

const NAV_LINKS = [
  { href: "#about",   label: "About"      },
  { href: "#skills",  label: "Skills"     },
  { href: "#projects",label: "Projects"   },
  { href: "#certs",   label: "Certificates"},
  { href: "#stack",   label: "Tech Stack" },
  { href: "#github",  label: "GitHub"     },
];

/** Smooth scroll to a section using Lenis (with navbar offset) */
function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  e.preventDefault();
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (!el) return;

  const lenis = (window as any).__lenis;
  if (lenis) {
    // Use Lenis for full inertia scroll with offset for fixed navbar
    lenis.scrollTo(el, { offset: -72, duration: 1.4 });
  } else {
    // Fallback
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const [scrolled,    setScrolled]   = useState(false);
  const [mobileOpen,  setMobileOpen] = useState(false);
  const [mounted,     setMounted]    = useState(false);

  // Avoid hydration mismatch for theme
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-[rgba(139,92,246,0.12)] bg-[var(--background)]/80 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      {/* Scroll progress bar */}
      <ScrollProgress />

      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-8">
        {/* Logo */}
        <a href="#" className="text-xl font-black tracking-tighter text-heading">
          <span className="text-gradient">Reynold</span>
          <span className="text-[var(--fg-muted)]">.</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--fg-body)] transition-colors hover:bg-[rgba(139,92,246,0.08)] hover:text-[var(--fg-heading)]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-card)] bg-[var(--bg-card)] text-[var(--fg-muted)] transition-all hover:border-[var(--border-hover)] hover:text-[var(--fg-heading)]"
              aria-label="Toggle theme"
            >
              <motion.div
                key={isDark ? "moon" : "sun"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {isDark ? <Moon size={16} /> : <Sun size={16} />}
              </motion.div>
            </button>
          )}

          {/* Resume CTA */}
          <a
            href={personalInfo.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-accent-gradient px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition-opacity hover:opacity-90 md:block"
          >
            Resume ↗
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-card)] bg-[var(--bg-card)] text-[var(--fg-muted)] md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-[var(--border-card)] bg-[var(--background)]/95 backdrop-blur-xl px-4 py-4 md:hidden"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { handleNavClick(e, link.href); setMobileOpen(false); }}
                className="block rounded-lg px-3 py-3 text-sm font-medium text-[var(--fg-body)] hover:bg-[rgba(168,85,247,0.08)] hover:text-[var(--fg-heading)]"
              >
                {link.label}
              </a>
            ))}
            <a
              href={personalInfo.resumeUrl}
              className="mt-3 block rounded-full bg-accent-gradient px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Resume ↗
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ── Scroll progress bar ─────────────────────────────── */
function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const update = () => {
      const el  = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setPct(pct);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div
      className="absolute top-0 left-0 h-0.5 bg-accent-gradient transition-all"
      style={{ width: `${pct}%` }}
    />
  );
}
