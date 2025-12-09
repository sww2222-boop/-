export enum ModuleType {
  HOME = 'HOME',
  MAP_SYSTEM = 'MAP_SYSTEM',
  ACADEMIC = 'ACADEMIC',
  CAREER = 'CAREER',
  TRIP_PLANNER = 'TRIP_PLANNER',
  DASHBOARD = 'DASHBOARD'
}

export interface PolicyDoc {
  id: string;
  title: string;
  level: 'Central' | 'Provincial' | 'Local';
  date: string;
  category: string;
}

export interface JobListing {
  id: string;
  title: string;
  organization: string;
  location: string;
  type: 'Government' | 'Research' | 'Enterprise';
  salary: string;
}

export interface AcademicPaper {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  abstract: string;
}

export interface ParkData {
  id: string;
  name: string;
  level: 'National Park' | '5A Scenic Spot';
  visitors: number;
  area: string;
  coordinates: [number, number]; // Simulated
}