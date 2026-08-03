// ─────────────────────────────────────────────────────────────────────────────
//  PORTFOLIO DATA — edit this file to fill in your real content
// ─────────────────────────────────────────────────────────────────────────────

// ── Types ─────────────────────────────────────────────────────────────────────
export interface PersonalInfo {
  name: string;
  title: string;
  taglines: string[];
  shortBio: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
  resumeUrl: string;
}

export interface SkillItem  { name: string; level: number; }
export interface SkillGroup {
  category: string;
  items: SkillItem[];
  colSpan?: number; // bento sizing
  rowSpan?: number;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  image: string;
  year: string;
  featured?: boolean;
}

export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credentialUrl: string;
  image?: string;
}

export interface TechItem {
  name: string;
  icon: string; // devicon class or simple emoji
  category: "Frontend" | "Backend" | "Database" | "Tools";
}

export interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  companyUrl: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
  technologies: string[];
}

// ── Data ──────────────────────────────────────────────────────────────────────
export const personalInfo: PersonalInfo = {
  name:      "Reynold Steven L.",
  title:     "Full Stack Developer",
  taglines:  ["Full Stack Developer", "UI/UX Enthusiast", "Mobile Developer", "Open Source Contributor"],
  shortBio:  "Passionate developer who loves crafting beautiful, performant experiences — from web to mobile. I turn complex ideas into elegant digital products.",
  location:  "Riau Islands, Batam, Indonesia",
  email:     "reynoldsteven2506@gmail.com",
  github:    "Reynoldsteven",
  linkedin:  "reynold-steven-a72b3840b",
  twitter:   "",
  resumeUrl: "#",
};

export const skills: SkillGroup[] = [
  {
    category: "Frontend",
    colSpan: 2,
    items: [
      { name: "Flutter",      level: 90 },
      { name: "TypeScript",   level: 85 },
      { name: "Tailwind CSS", level: 88 },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Laravel", level: 85 },
    ],
  },
  {
    category: "Database",
    items: [
      { name: "MySQL",  level: 80 },
      { name: "SQLite", level: 75 },
    ],
  },
  {
    category: "Dev Tools",
    colSpan: 2,
    items: [
      { name: "Git",    level: 90 },
      { name: "GitHub", level: 85 },
      { name: "Figma",  level: 80 },
    ],
  },
];

export const techStack: TechItem[] = [
  { name: "Flutter",      icon: "devicon-flutter-plain colored", category: "Frontend"  },
  { name: "TypeScript",   icon: "devicon-typescript-plain colored", category: "Frontend"  },
  { name: "Tailwind CSS", icon: "devicon-tailwindcss-original colored", category: "Frontend"  },
  { name: "Laravel",      icon: "devicon-laravel-original colored", category: "Backend"   },
  { name: "MySQL",        icon: "devicon-mysql-plain colored", category: "Database"  },
  { name: "SQLite",       icon: "devicon-sqlite-plain colored", category: "Database"  },
  { name: "Git",          icon: "devicon-git-plain colored", category: "Tools"     },
  { name: "GitHub",       icon: "devicon-github-original dark:invert", category: "Tools"     },
  { name: "Figma",        icon: "devicon-figma-plain colored", category: "Tools"     },
];

export const projects: Project[] = [
  {
    id:          1,
    title:       "Floralish",
    description: "Web CMS untuk UMKM Penjualan Buket Bunga.",
    tags:        ["Laravel", "MySQL", "HTML", "Tailwind CSS", "JavaScript"],
    githubUrl:   "https://github.com/Reynoldsteven/floralish.git",
    liveUrl:     "https://www.youtube.com/watch?v=nzffyuLR3Cg",
    image:       "",
    year:        "2025",
    featured:    true,
  },
  {
    id:          2,
    title:       "WorkRadar",
    description: "Aplikasi Mobile To-do list.",
    tags:        ["Laravel", "MySQL", "Flutter", "Dart"],
    githubUrl:   "https://github.com/Reynoldsteven/workradar.git",
    liveUrl:     "https://www.youtube.com/watch?v=qVj2oXKTowU",
    image:       "",
    year:        "2025",
    featured:    true,
  },
  {
    id:          3,
    title:       "IbuSehat",
    description: "Aplikasi Mobile Panduan Diet, WorkOut, dan Skincare untuk Ibu Paska Melahirkan",
    tags:        ["Laravel", "Flutter", "MySQL", "Dart"],
    githubUrl:   "https://github.com/Aplikasi-Mobile-IbuSehat/IbuSehat.git",
    liveUrl:     "https://www.youtube.com/watch?v=nzffyuLR3Cg",
    image:       "",
    year:        "2026",
    featured:    true,
  },
];

export const certificates: Certificate[] = [
  {
    id:            1,
    title:         "PBL - TA 2024/2025 Ganjil",
    issuer:        "Politeknik Negeri Batam",
    date:          "March 2024",
    credentialUrl: "/certificates/Certificate-of Completion-PBL1.pdf#toolbar=0",
  },
  {
    id:            2,
    title:         "PBL - TA 2024/2025 Genap",
    issuer:        "Politeknik Negeri Batam",
    date:          "January 2024",
    credentialUrl: "/certificates/Certificate-of Completion-PBL2.pdf#toolbar=0",
  },
  {
    id:            3,
    title:         "PBL - TA 2025/2026 Ganjil",
    issuer:        "Politeknik Negeri Batam",
    date:          "November 2025",
    credentialUrl: "/certificates/Certificate-of-Completion-PBL3.pdf#toolbar=0",
  },
  {
    id:            4,
    title:         "PBL - TA 2025/2026 Genap",
    issuer:        "Politeknik Negeri Batam",
    date:          "November 2023",
    credentialUrl: "/certificates/Certificate-of-Completion-PBL4.pdf#toolbar=0",
  },
  {
    id:            5,
    title:         "Third Certificate",
    issuer:        "Organization Name",
    date:          "November 2023",
    credentialUrl: "/certificates/Reynold Steven_Certificate.pdf#toolbar=0",
  },
  {
    id:            6,
    title:         "Third Certificate",
    issuer:        "Organization Name",
    date:          "November 2023",
    credentialUrl: "/certificates/Certificate_cisco.pdf#toolbar=0",
  },
  {
    id:            7,
    title:         "Third Certificate",
    issuer:        "Organization Name",
    date:          "November 2023",
    credentialUrl: "/certificates/sertifikat_lomba.pdf#toolbar=0",
  },
];

export const experiences: ExperienceItem[] = [
  {
    id:           1,
    role:         "Your Job Title",
    company:      "Company Name",
    companyUrl:   "#",
    startDate:    "Jan 2024",
    endDate:      "Present",
    current:      true,
    description:  ["Tanggung jawab / pencapaian pertama.", "Pencapaian kedua — sertakan metrics."],
    technologies: ["Flutter", "Laravel", "MySQL"],
  },
];
