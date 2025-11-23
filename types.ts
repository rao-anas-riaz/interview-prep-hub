
export interface InterviewQuestion {
  id: string;
  question: string;
  concepts: string;
  answer: string;
  example: string;
  whatIfs?: string[];
}

export interface QuestionCategoryMetadata {
  id: string;
  title: string;
  icon: string;
  description: string;
}

export interface QuestionCategory extends QuestionCategoryMetadata {
  questions: InterviewQuestion[];
}
