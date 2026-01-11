
export enum DonorType {
  DEVOUT = 'The Devout',
  REALIST = 'The Realist',
  INNER_PEACE_SEEKER = 'The Inner Peace Seeker',
  ACTIVIST = 'The Activist',
  COMMUNITARIAN = 'The Communitarian',
  ADVOCATE = 'The Advocate',
  NETWORKER = 'The Networker',
  RECOGNITION_SEEKER = 'The Recognition Seeker'
}

export interface Option {
  id: string;
  text: string;
  weights: Partial<Record<DonorType, number>>;
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
}

export interface AssessmentResult {
  id: string;
  date: string;
  donorType: DonorType;
  scores: Record<DonorType, number>;
  userData?: {
    name: string;
    email: string;
    status: string;
  };
}

export type AppState = 'landing' | 'assessment' | 'results' | 'admin';
