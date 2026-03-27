export interface Session {
  id: string;
  title: string;
  originalInput: string;
  category: SessionCategory;
  clarityScore: number | null; // null = in progress/draft
  status: SessionStatus;
  createdAt: number;
  insights?: string;
  isStarred?: boolean;
}

export type SessionCategory = '研究' | '编程' | '策略' | '写作' | '战略';

export type SessionStatus = 'draft' | 'in_progress' | 'completed';

export type Language = 'zh' | 'en';

export interface ClarificationStep {
  component: string;
  status: 'identified' | 'missing' | 'undefined';
  label: string;
  detail: string;
}

export interface OutputFormat {
  id: string;
  label: string;
}
