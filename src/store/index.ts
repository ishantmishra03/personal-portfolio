import type { ContactMethod, Project } from "../types";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";

import klyoraImage from "../assets/projects/klyora.webp";
import tranquilifyImage from "../assets/projects/tranquilify.webp";
import astrynelImage from "../assets/projects/astrynel.webp";

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Astrynel",
    description:
      "A modern real-time collaboration platform with shared workspaces, collaborative notes, task management, and integrated chat — all synchronized via WebSocket and Redis pub/sub.",
    tags: ["Next.js", "Node.js", "MongoDB", "Redis", "Socket.IO", "Docker"],
    coverImage: astrynelImage,
    github: "https://github.com/ishantmishra03/astrynel",
    featured: true,
  },
  {
    id: 2,
    title: "Tranquilify",
    description:
      "An AI-powered mental wellness companion with mood tracking, stress analytics, habit building, journaling, AI therapist chat, live voice sessions, and personalized soundscapes.",
    tags: ["React", "Node.js", "MongoDB", "Groq AI", "VAPI", "ImageKit"],
    coverImage: tranquilifyImage,
    github: "https://github.com/ishantmishra03/tranquilify",
    live: "https://tranquilify.vercel.app",
    featured: true,
  },
  {
    id: 3,
    title: "Klyora",
    description:
      "A full-featured MERN stack eCommerce platform with Stripe checkout, JWT auth, admin dashboard for product/order/user management, and a Dockerized backend.",
    tags: ["TypeScript", "React", "Express", "MongoDB", "Stripe", "Docker"],
    coverImage: klyoraImage,
    github: "https://github.com/ishantmishra03/ecommerce-typescript",
    live: "https://klyora.vercel.app",
  },
  {
    id: 4,
    title: "Stayza",
    description:
      "A hotel booking platform where companies list and manage hotels while users explore, book rooms, and pay securely via Stripe — with Clerk-based role authentication.",
    tags: ["React", "Node.js", "MongoDB", "Stripe", "Clerk", "ImageKit"],
    coverImage:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    github: "https://github.com/ishantmishra03/stayza",
    live: "https://stayza.vercel.app",
  },
];

export const TECH: { name: string; path: string }[] = [
  { name: "JavaScript", path: "https://skillicons.dev/icons?i=js" },
  { name: "TypeScript", path: "https://skillicons.dev/icons?i=ts" },
  { name: "React", path: "https://skillicons.dev/icons?i=react" },
  { name: "Redux", path: "https://skillicons.dev/icons?i=redux" },
  { name: "Tailwind", path: "https://skillicons.dev/icons?i=tailwind" },
  { name: "Next.js", path: "https://skillicons.dev/icons?i=nextjs" },
  { name: "Node.js", path: "https://skillicons.dev/icons?i=nodejs" },
  { name: "Express", path: "https://skillicons.dev/icons?i=express" },
  { name: "MongoDB", path: "https://skillicons.dev/icons?i=mongodb" },
  { name: "MySQL", path: "https://skillicons.dev/icons?i=mysql" },
  { name: "PostgreSQL", path: "https://skillicons.dev/icons?i=postgres" },
  { name: "PHP", path: "https://skillicons.dev/icons?i=php" },
  {name: "Docker", path: "https://skillicons.dev/icons?i=docker"},
  {name: "Git", path: "https://skillicons.dev/icons?i=git"},
  {name: "GitHub", path: "https://skillicons.dev/icons?i=github"},
  {name: "pnpm", path: "https://skillicons.dev/icons?i=pnpm"},
];

export const contactMethods: ContactMethod[]  = [
  {
    icon: Mail,
    label: "Email",
    value: "ishantmishra.work@gmail.com",
    href: "mailto:ishantmishra.work@gmail.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/ishantmishra03",
    href: "https://linkedin.com/in/ishantmishra03",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/ishantmishra03",
    href: "https://github.com/ishantmishra03",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Available for remote work",
    href: null,
  },
];
