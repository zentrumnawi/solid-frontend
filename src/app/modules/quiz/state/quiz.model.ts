export interface QuizQuestion {
  id: number;
  qtype: QuizQuestionType;
  difficulty: 1 | 2 | 3 | 4 | 5;
  answers: QuizAnswer[];
  tags: string[];
  qtext: string;
}

export interface QuizAnswer {
  id: number;
  atext: string;
  correct: boolean;
  feedback_correct: string;
  feedback_incorrect: string;
}

export enum QuizQuestionType {
  SingleChoice = 'Single Choice',
  MultipleChoice = 'Multiple Choice',
}
