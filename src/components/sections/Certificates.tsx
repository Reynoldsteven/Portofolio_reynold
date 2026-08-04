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
              ? `flex w-full items-stretch gap-4 overflow-x-auto pb-6 pt-2 select-none scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${
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
              whileHover={!isDragging ? { scale: 1.02, borderColor: "rgba(139,92,246,0.40)", y: -3 } : {}}
              className={`group relative flex flex-col rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] p-5 overflow-hidden ${
                isSlider ? "w-[280px] sm:w-[320px] shrink-0 snap-center" : ""
              }`}
            >
              {/* Top accent line */}
              <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-accent-gradient opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* ── Thumbnail area — fixed height 160px ── */}
              <div className="mb-4 h-40 w-full shrink-0 overflow-hidden rounded-xl border border-[var(--border-card)] pointer-events-none">
                {cert.image ? (
                  /* Gambar asli */
                  <div className="relative h-full w-full bg-[var(--background)]">
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      draggable={false}
                    />
                  </div>
                ) : cert.credentialUrl.includes(".pdf") ? (
                  <>
                    {/* Desktop: iframe PDF */}
                    <div className="hidden md:flex h-full w-full bg-white items-center justify-center relative">
                      <iframe
                        src={cert.credentialUrl + "&view=FitH&scrollbar=0"}
                        className="w-[120%] h-[150%] origin-top -mt-4 border-none scale-90"
                        tabIndex={-1}
                        scrolling="no"
                      />
                      <div className="absolute inset-0" />
                    </div>

                    {/* Mobile: badge */}
                    <div
                      className="flex md:hidden h-full w-full flex-col items-center justify-center gap-2"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(59,130,246,0.12) 100%)",
                      }}
                    >
                      {/* Ring decorations */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                        <div className="h-32 w-32 rounded-full border-2 border-[#8b5cf6]" />
                        <div className="absolute h-24 w-24 rounded-full border border-[#8b5cf6]" />
                      </div>
                      {/* Seal icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#8b5cf6"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="relative z-10"
                      >
                        <circle cx="12" cy="8" r="6" />
                        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                      </svg>
                      {/* Title in badge */}
                      <span className="relative z-10 text-[11px] font-semibold text-[#8b5cf6] text-center px-4 leading-snug line-clamp-2">
                        {cert.title}
                      </span>
                      {/* Bottom ribbon */}
                      <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#8b5cf6] to-transparent opacity-40" />
                    </div>
                  </>
                ) : (
                  /* No image, no PDF → plain badge */
                  <div
                    className="h-full w-full flex flex-col items-center justify-center gap-2"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(59,130,246,0.12) 100%)",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#8b5cf6"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="8" r="6" />
                      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                    </svg>
                  </div>
                )}
              </div>

              {/* ── Text content — grows to fill remaining space ── */}
              <div className="flex flex-1 flex-col">
                <h3 className="mb-1 text-sm font-bold text-[var(--fg-heading)] leading-snug line-clamp-2">
                  {cert.title}
                </h3>
                <p className="mb-4 text-xs text-[var(--fg-muted)] line-clamp-2">
                  {cert.issuer} · {cert.date}
                </p>

                {/* Button pinned to bottom */}
                <div className="mt-auto">
                  {cert.credentialUrl !== "#" && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => { if (isDragging) e.preventDefault(); }}
                      className={`inline-flex items-center gap-1.5 rounded-full border border-[rgba(139,92,246,0.20)] px-3 py-1.5 text-[10px] font-semibold text-[#8b5cf6] hover:bg-[rgba(139,92,246,0.08)] transition-colors ${
                        isDragging ? "pointer-events-none" : ""
                      }`}
                    >
                      <ExternalLink size={12} /> View Certificate
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
