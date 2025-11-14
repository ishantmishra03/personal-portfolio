export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
  image: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Tranquilify",
    description:
      "A serene web app designed to help users relax and manage stress through differnet ways and AI-powered features.",
    tech: [
      "React",
      "JavaScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "GROQ",
      "LLM",
      "TailwindCSS",
    ],
    github: "https://github.com/ishantmishra03/tranquilify", // placeholder
    demo: "https://tranquilify.vercel.app",
    image: "/projects/tranquilify.png",
  },
  {
    id: 2,
    title: "StayZa",
    description:
      "Accommodation booking platform with secure payments, file/image handling, user authentication, and seamless UI for tourists.",
    tech: [
      "React",
      "JavaScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Stripe",
      "Clerk",
      "Cloudinary",
      "TailwindCSS",
    ],
    github: "https://github.com/ishantmishra03/stayza",
    demo: "https://stayza.vercel.app",
    image: "/projects/stayza.png",
  },
  {
    id: 3,
    title: "TourismSewa",
    description:
      "Platform where local businesses can register and sell experiences to tourists, featuring AI-based booking recommendations and a seamless checkout process.",
    tech: [
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Stripe",
      "GROQ",
      "LLM",
      "TailwindCSS",
    ],
    github: "https://github.com/ishantmishra03/TourismSewa",
    demo: "https://tourismsewa.vercel.app",
    image: "/projects/tourism-sewa.png",
  },
  {
    id: 4,
    title: "Klyora",
    description:
      "Full-featured e-commerce platform for modern online stores, with cart management, payments.",
    tech: [
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Redux",
      "Stripe",
      "TailwindCSS",
    ],
    github: "https://github.com/ishantmishra03/ecommerce-typescript",
    demo: "https://klyora.vercel.app",
    image: "/projects/klyora.png",
  },
];
