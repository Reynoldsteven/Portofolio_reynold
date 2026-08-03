"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { SectionHeader, SectionReveal, fadeUp } from "@/components/ui";
import { projects } from "@/lib/portfolioData";

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

export function Projects() {
  return (
    <SectionReveal id="projects" className="mx-auto max-w-6xl px-4 py-24 md:px-8">
      <SectionHeader
        number="// 03"
        title="Featured Projects"
        subtitle="A selection of things I've built — from mobile apps to full-stack web."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ scale: 1.025, y: -4, borderColor: "rgba(139,92,246,0.40)" }}
            style={{ transition: "none" }} // let framer handle it
            className="group flex flex-col rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] overflow-hidden cursor-default"
          >
            {/* Thumbnail / placeholder */}
            <div className="relative h-44 w-full overflow-hidden bg-gradient-to-br from-[rgba(139,92,246,0.10)] to-[rgba(99,102,241,0.10)]">
              {project.image ? (
                <Image src={project.image} alt={project.title} fill className="object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <span className="text-4xl opacity-30">🖥️</span>
                </div>
              )}
              {/* Year badge */}
              <span className="absolute top-3 left-3 rounded-full bg-[rgba(0,0,0,0.5)] px-2 py-0.5 font-mono text-[10px] text-white/70 backdrop-blur-sm">
                {project.year}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-5">
              <h3 className="mb-2 text-base font-bold text-[var(--fg-heading)] group-hover:text-gradient transition-colors">
                {project.title}
              </h3>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-[var(--fg-body)]">
                {project.description}
              </p>

              {/* Tags */}
              <div className="mb-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--border-card)] px-2.5 py-0.5 text-[10px] font-medium text-[var(--fg-muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-semibold text-[var(--fg-muted)] hover:text-[var(--fg-heading)] transition-colors"
                  >
                    <GithubIcon /> Code
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-semibold text-[var(--fg-muted)] hover:text-[var(--fg-heading)] transition-colors"
                  >
                    <ExternalLink size={13} /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionReveal>
  );
}
