export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  coverImage: string;
  github?: string;
  live?: string;
  featured?: boolean;
}

export interface ContactMethod {
  icon: any;
  label: string;
  value: string;
  href: string | null;
}
