"use client";

import { motion } from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeader, SectionReveal, fadeUp } from "@/components/ui";
import { certificates } from "@/lib/portfolioData";
import Image from "next/image";
import { useRef, useState } from "react";

export function Certificates() {
  const isSlider = certificates.length > 3;
  const scrollRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX]         = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!scrollRef.current || !isSlider) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !scrollRef.current || !isSlider) return;
    e.preventDefault();
    const x    = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const onPointerUp = () => setIsDragging(false);

  return (
    <SectionReveal id="certs" className="mx-auto max-w-6xl px-4 py-24 md:px-8">
      <SectionHeader
        number="// 04"
        title="Certificates"
        subtitle="Credentials and professional development."
      />

      <div className="relative group/slider">
        {/* Navigation Buttons — desktop only */}
        {isSlider && (
          <>
            <button
              onClick={() => scrollRef.current?.scrollBy({ left: -340, behavior: "smooth" })}
              className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full border border-[var(--border-card)] bg-[var(--bg-card)] text-[var(--fg-muted)] shadow-xl opacity-0 group-hover/slider:opacity-100 transition-all hover:text-[var(--fg-heading)] hover:border-[var(--border-hover)]"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scrollRef.current?.scrollBy({ left: 340, behavior: "smooth" })}
              className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full border border-[var(--border-card)] bg-[var(--bg-card)] text-[var(--fg-muted)] shadow-xl opacity-0 group-hover/slider:opacity-100 transition-all hover:text-[var(--fg-heading)] hover:border-[var(--border-hover)]"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Card track */}
        <div
          ref={scrollRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          className={
            isSlider
              ? `flex w-full gap-4 overflow-x-auto pb-6 pt-2 select-none scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${
                  isDragging ? "cursor-grabbing" : "cursor-grab snap-x snap-mandatory"
                }`
              : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          }
        >
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={!isDragging ? { scale: 1.02, y: -3 } : {}}
              /* ── LANDSCAPE card: fixed 200px tall, full width on mobile ── */
              className={`group relative overflow-hidden rounded-2xl border border-[var(--border-card)] ${
                isSlider ? "h-[200px] w-[85vw] max-w-[340px] shrink-0 snap-center" : "h-[200px]"
              }`}
            >
              {/* ── Background layer: real image OR gradient badge ── */}
              {cert.image ? (
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  draggable={false}
                />
              ) : (
                /* Gradient badge — visible on ALL devices, no iframe/CSS tricks */
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3"
                  style={{
                    background:
                      "linear-gradient(135deg, #1e1040 0%, #0f0c29 40%, #1a1a4e 100%)",
                  }}
                >
                  {/* Decorative rings */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div
                      className="h-36 w-36 rounded-full border border-[#8b5cf6] opacity-20"
                      style={{ boxShadow: "0 0 40px rgba(139,92,246,0.15)" }}
                    />
                    <div className="absolute h-24 w-24 rounded-full border border-[#6366f1] opacity-15" />
                  </div>

                  {/* Seal icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="44"
                    height="44"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="url(#seal-grad)"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="relative z-10 drop-shadow-lg"
                  >
                    <defs>
                      <linearGradient id={`seal-grad-${cert.id}`} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#a78bfa" />
                        <stop offset="100%" stopColor="#60a5fa" />
                      </linearGradient>
                    </defs>
                    <circle cx="12" cy="8" r="6" stroke={`url(#seal-grad-${cert.id})`} />
                    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" stroke={`url(#seal-grad-${cert.id})`} />
                  </svg>

                  {/* Issuer name */}
                  <span className="relative z-10 text-[11px] font-semibold tracking-widest uppercase text-[#a78bfa] opacity-80">
                    {cert.issuer.split(" ").slice(0, 3).join(" ")}
                  </span>
                </div>
              )}

              {/* ── Gradient overlay: dark at bottom for text readability ── */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              {/* ── Top accent line on hover ── */}
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[#8b5cf6] via-[#6366f1] to-[#3b82f6] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* ── Text + button overlay at bottom ── */}
              <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-1">
                <h3 className="text-sm font-bold text-white leading-snug line-clamp-1 drop-shadow">
                  {cert.title}
                </h3>
                <p className="text-[11px] text-white/70 line-clamp-1">
                  {cert.issuer} · {cert.date}
                </p>

                {cert.credentialUrl !== "#" && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => { if (isDragging) e.preventDefault(); }}
                    className={`mt-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm px-3 py-1.5 text-[10px] font-semibold text-white hover:bg-white/20 transition-colors ${
                      isDragging ? "pointer-events-none" : ""
                    }`}
                  >
                    <ExternalLink size={11} /> View Certificate
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
