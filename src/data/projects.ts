export interface Project {
  id: string;
  name: string;
  description: string;
  category: string;
  technologies: string[];
  image?: string;
  link?: string;
  results?: string;
}

export const projects: Project[] = [];
