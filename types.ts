
export type Sender = 'bot' | 'user';

export interface Message {
  id: string;
  sender: Sender;
  text: string;
  options?: string[];
  isLoading?: boolean;
}

export enum MenuLevel {
  MAIN = 'MAIN',
  COMPANY_SELECTION = 'COMPANY_SELECTION',
  INTERVIEW_PREP = 'INTERVIEW_PREP'
}

export interface CompanyInfo {
  name: string;
  overview: string;
  domain: string;
  headquarters: string;
  roles: string;
  salary: string;
}
