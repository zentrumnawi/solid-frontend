import { MediaModel, MediaObjectModel } from '@zentrumnawi/solid-core';

export interface QuizQuestion extends QuizQuestionApi {
  images: MediaModel[];
}

export interface QuizQuestionApi {
  id: number;
  type: QuizQuestionType;
  difficulty: 1 | 2 | 3 | 4 | 5;
  answers: QuizAnswer[];
  img: MediaObjectModel[];
  tags: string[];
  text: string;
}

export interface QuizAnswer {
  id: number;
  text: string;
  correct: boolean;
  feedback_correct: string;
  feedback_incorrect: string;
  ranking_position: number;
  subsequences: boolean;
  feedback_subsequences: string;
  range_value: number;
  unit: string;
  range_max: number;
  range_min: number;
  range_step: number;
  tolerance: number;
}

export enum QuizQuestionType {
  SingleChoice = 'SC',
  MultipleChoice = 'MC',
  TrueFalse = 'TF',
  Ranking = 'RG',
  Range = 'RN',
}

export type QuizQuestionInSession = QuizQuestion & { answered: 0 | -1 | 1 };

export interface QuizSession {
  progress: number;
  currentQuestion: number;
  currentQuestionId: number;
  questions: QuizQuestionInSession[];
}

export interface QuizMetadata {
  question_count: number;
  tags: string[];
  difficulties: number[];
}
