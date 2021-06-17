import { ImageModel, PhotographModel } from '@zentrumnawi/solid-core';

export interface QuizQuestion extends QuizQuestionApi {
  images: ImageModel[];
}

export interface QuizQuestionApi {
  id: number;
  type: QuizQuestionType;
  difficulty: 1 | 2 | 3 | 4 | 5;
  answers: QuizAnswer[];
  img: PhotographModel[];
  tags: string[];
  text: string;
}

export interface QuizAnswer {
  id: number;
  text: string;
  correct: boolean;
  feedback_correct: string;
  feedback_incorrect: string;
}

export enum QuizQuestionType {
  SingleChoice = 'SC',
  MultipleChoice = 'MC',
}

export type QuizQuestionInSession = QuizQuestion & { answered: 0 | -1 | 1 };

export interface QuizSession {
  progress: number;
  currentQuestion: number;
  questions: QuizQuestionInSession[];
}
