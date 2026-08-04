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
        {/* Navigation — desktop hover arrows */}
        {isSlider && (
          <>
            <button
              onClick={() => scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" })}
              className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full border border-[var(--border-card)] bg-[var(--bg-card)] text-[var(--fg-muted)] shadow-xl opacity-0 group-hover/slider:opacity-100 transition-all hover:text-[var(--fg-heading)] hover:border-[var(--border-hover)]"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" })}
              className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full border border-[var(--border-card)] bg-[var(--bg-card)] text-[var(--fg-muted)] shadow-xl opacity-0 group-hover/slider:opacity-100 transition-all hover:text-[var(--fg-heading)] hover:border-[var(--border-hover)]"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Scroll track */}
        <div
          ref={scrollRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          className={
            isSlider
              ? `flex w-full gap-4 overflow-x-auto pb-6 pt-2 select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${
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
              /**
               * Card: aspect-square (1:1), flex column
               * - top: image/badge fills remaining space
               * - bottom: text section fixed ~110px
               */
              className={`group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] ${
                isSlider
                  ? "w-[75vw] max-w-[260px] shrink-0 snap-center"
                  : "w-full"
              }`}
              style={{ aspectRatio: "1 / 1" }}
            >
              {/* ── Top: image / badge — flex-1 fills remaining card height ── */}
              <div className="relative flex-1 w-full overflow-hidden">
                {cert.credentialUrl !== "#" ? (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => { if (isDragging) e.preventDefault(); }}
                    className="absolute inset-0 z-20 cursor-pointer"
                    aria-label={`View ${cert.title}`}
                  />
                ) : null}

                {cert.image ? (
                  /* Real image */
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    draggable={false}
                  />
                ) : cert.credentialUrl.includes(".pdf") ? (
                  <>
                    {/* Desktop: iframe PDF preview */}
                    <div className="hidden md:block absolute inset-0 bg-white overflow-hidden pointer-events-none">
                      <iframe
                        src={cert.credentialUrl + "&view=FitH&scrollbar=0"}
                        className="w-[125%] h-[150%] origin-top-left scale-[0.8] border-none"
                        tabIndex={-1}
                        scrolling="no"
                      />
                      <div className="absolute inset-0 z-10 bg-transparent" />
                    </div>
                    {/* Mobile: Gradient badge */}
                    <div
                      className="md:hidden w-full h-full flex flex-col items-center justify-center gap-3"
                      style={{ background: "linear-gradient(135deg, #2d1b69 0%, #11093a 50%, #1a1a5e 100%)" }}
                    >
                      <div className="absolute w-28 h-28 rounded-full border border-[rgba(139,92,246,0.3)] shadow-[0_0_32px_rgba(139,92,246,0.2)]" />
                      <div className="absolute w-20 h-20 rounded-full border border-[rgba(99,102,241,0.2)]" />
                      <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 24 24" fill="none" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
                        <circle cx="12" cy="8" r="6" stroke="#a78bfa" />
                        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" stroke="#818cf8" />
                      </svg>
                      <span className="relative z-10 text-[11px] font-semibold tracking-widest uppercase text-[#c4b5fd] opacity-85 text-center px-3">
                        {cert.issuer}
                      </span>
                    </div>
                  </>
                ) : (
                  /* Default Gradient badge */
                  <div
                    className="w-full h-full flex flex-col items-center justify-center gap-3"
                    style={{ background: "linear-gradient(135deg, #2d1b69 0%, #11093a 50%, #1a1a5e 100%)" }}
                  >
                    <div className="absolute w-28 h-28 rounded-full border border-[rgba(139,92,246,0.3)] shadow-[0_0_32px_rgba(139,92,246,0.2)]" />
                    <div className="absolute w-20 h-20 rounded-full border border-[rgba(99,102,241,0.2)]" />
                    <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 24 24" fill="none" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
                      <circle cx="12" cy="8" r="6" stroke="#a78bfa" />
                      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" stroke="#818cf8" />
                    </svg>
                    <span className="relative z-10 text-[11px] font-semibold tracking-widest uppercase text-[#c4b5fd] opacity-85 text-center px-3">
                      {cert.issuer}
                    </span>
                  </div>
                )}

                {/* Hover top accent line */}
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[#8b5cf6] via-[#6366f1] to-[#3b82f6] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              {/* ── Bottom: text section — fixed, no stretch ── */}
              <div className="shrink-0 flex flex-col gap-1 border-t border-[var(--border-card)] px-4 py-3">
                <h3 className="text-xs font-bold text-[var(--fg-heading)] leading-snug line-clamp-1">
                  {cert.title}
                </h3>
                <p className="text-[10px] text-[var(--fg-muted)] line-clamp-1">
                  {cert.issuer} · {cert.date}
                </p>
                {cert.credentialUrl !== "#" && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => { if (isDragging) e.preventDefault(); }}
                    className={`mt-1 inline-flex w-fit items-center gap-1 rounded-full border border-[rgba(139,92,246,0.25)] px-2.5 py-1 text-[9px] font-semibold text-[#8b5cf6] hover:bg-[rgba(139,92,246,0.08)] transition-colors ${
                      isDragging ? "pointer-events-none" : ""
                    }`}
                  >
                    <ExternalLink size={10} /> View Certificate
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
