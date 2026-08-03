"use client";

import Image from "next/image";
import { SectionHeader, SectionReveal } from "@/components/ui";
import { personalInfo } from "@/lib/portfolioData";

/**
 * GitHub Statistics section.
 * Uses the popular github-readme-stats API to embed dynamic cards.
 * All cards are plain <img> tags (via next/image) which are statically embedded.
 *
 * Theme params: the query strings adjust for dark/light via data-theme attribute.
 * For full control you can swap the URL to fetch from the GitHub REST API
 * and render custom charts.
 */
const GITHUB_USER = personalInfo.github; // "Reynoldsteven"
const STATS_BASE  = "https://github-readme-stats.anuraghazra1.vercel.app/api";

export function GitHubStats() {
  return (
    <SectionReveal id="github" className="mx-auto max-w-6xl px-4 py-24 md:px-8">
      <SectionHeader
        number="// 06"
        title="GitHub Activity"
        subtitle="An overview of my open-source contributions and coding habits."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Stats card */}
        <div className="col-span-full sm:col-span-1 flex items-center justify-center rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] p-4 overflow-hidden">
          <Image
            src={`${STATS_BASE}?username=${GITHUB_USER}&show_icons=true&theme=transparent&hide_border=true&title_color=8b5cf6&icon_color=a78bfa&text_color=ffffff&bg_color=00000000&rank_icon=github`}
            alt="GitHub Stats"
            width={495}
            height={195}
            className="w-full object-contain"
            unoptimized // external URL
          />
        </div>

        {/* Top languages */}
        <div className="flex items-center justify-center rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] p-4 overflow-hidden">
          <Image
            src={`${STATS_BASE}/top-langs?username=${GITHUB_USER}&layout=compact&theme=transparent&hide_border=true&title_color=8b5cf6&text_color=ffffff&bg_color=00000000`}
            alt="Top Languages"
            width={350}
            height={165}
            className="w-full object-contain"
            unoptimized
          />
        </div>

        {/* Streak */}
        <div className="flex items-center justify-center rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] p-4 overflow-hidden">
          <Image
            src={`https://streak-stats.demolab.com?user=${GITHUB_USER}&theme=transparent&hide_border=true&ring=8b5cf6&fire=a78bfa&currStreakLabel=8b5cf6&sideLabels=6366f1`}
            alt="GitHub Streak"
            width={495}
            height={195}
            className="w-full object-contain"
            unoptimized
          />
        </div>
      </div>
    </SectionReveal>
  );
}
