export type SkillCategory = "frontend" | "backend" | "tools";
export type Skill = {
  name: string;
  category: SkillCategory;
  orbit: 1 | 2 | 3;
};

export const skills: Skill[] = [
  // Frontend
  { name: "react", category: "frontend", orbit: 1 },
  { name: "nextjs", category: "frontend", orbit: 1 },
  { name: "typescript", category: "frontend", orbit: 1 },
  { name: "redux", category: "frontend", orbit: 1 },
  { name: "tailwind", category: "frontend", orbit: 1 },
  { name: "html", category: "frontend", orbit: 1 },
  { name: "css", category: "frontend", orbit: 1 },
  { name: "javascript", category: "frontend", orbit: 1 },

  // Backend
  { name: "nodejs", category: "backend", orbit: 2 },
  { name: "express", category: "backend", orbit: 2 },
  { name: "mongodb", category: "backend", orbit: 2 },
  { name: "mysql", category: "backend", orbit: 2 },
  { name: "python", category: "backend", orbit: 2 },
  { name: "redis", category: "backend", orbit: 2 },

  // Tools / DevOps
  { name: "git", category: "tools", orbit: 3 },
  { name: "github", category: "tools", orbit: 3 },
  { name: "docker", category: "tools", orbit: 3 },
  { name: "vscode", category: "tools", orbit: 3 },
  { name: "npm", category: "tools", orbit: 3 },
  { name: "postman", category: "tools", orbit: 3 },
];
