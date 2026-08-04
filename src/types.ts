export interface SkillItem {
  id: string;
  name: string;
  category: 'all' | 'languages' | 'databases' | 'tools' | 'concepts';
  level: number;
  description: string;
  iconName: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  badgeText: string;
  description: string;
  keyEngineering: string[];
  techStack: string[];
  githubUrl: string;
  liveDemoUrl?: string;
  featured: boolean;
  type: 'ai' | 'enterprise' | 'web';
}

export interface AcademicAchievement {
  id: string;
  title: string;
  subtitle: string;
  score: string;
  scoreLabel: string;
  description: string;
  year?: string;
  highlight?: boolean;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  university: string;
  year: string;
  score: string;
  details: string;
  specials: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  ticketId?: string;
  timestamp?: string;
  error?: string;
}

export interface FridayChatMessage {
  id: string;
  sender: 'user' | 'friday';
  text: string;
  timestamp: string;
}
