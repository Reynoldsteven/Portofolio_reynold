"use client";

import { SectionHeader, SectionReveal } from "@/components/ui";
import { techStack } from "@/lib/portfolioData";

const FigmaIcon = () => (
  <svg viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 drop-shadow-md">
    <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
    <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
    <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
    <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
    <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
  </svg>
);

export function TechStack() {
  // Duplicate the tech stack array to create a seamless infinite scroll loop (4x for ultra-wide screens)
  const marqueeItems = [...techStack, ...techStack, ...techStack, ...techStack];

  return (
    <SectionReveal id="stack" className="mx-auto max-w-6xl px-4 py-24 md:px-8 overflow-hidden">
      <SectionHeader
        number="// 05"
        title="Tech Stack"
        subtitle="Tools and technologies I reach for when building products."
      />

      <div className="relative mt-8 flex w-full overflow-hidden">
        {/* Gradient masks for smooth fading at edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-[var(--background)] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-[var(--background)] to-transparent" />

        <div className="flex w-max animate-marquee items-center gap-6 hover:[animation-play-state:paused]">
          {marqueeItems.map((item, i) => (
            <div
              key={`${item.name}-${i}`}
              className="flex items-center gap-3 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] px-6 py-4 transition-colors hover:border-[var(--border-hover)]"
            >
              {item.name === "Figma" ? (
                <FigmaIcon />
              ) : item.icon.startsWith("devicon") ? (
                <i className={`${item.icon} text-3xl drop-shadow-md`} />
              ) : (
                <span className="text-2xl leading-none">{item.icon}</span>
              )}
              <span className="whitespace-nowrap font-semibold text-[var(--fg-heading)]">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
