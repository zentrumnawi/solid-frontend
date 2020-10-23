export enum QuizQuestionType {
  SingleChoice = 'SC',
  MultipleChoice = 'MC',
  DragAndDrop = 'DD',
}

export interface QuizAnswer {
  id: number;
  text: string;
  correct: boolean;
  feedback_correct: string;
  feedback_incorrect: string;
}

export interface QuestionBase {
  id: number;
  difficulty: 1 | 2 | 3 | 4 | 5;
  tags: string[];
  text: string;
}

export interface MultipleChoiceQuestion extends QuestionBase {
  type: QuizQuestionType.MultipleChoice;
  answers: QuizAnswer[];
}

export interface SingleChoiceQuestion extends QuestionBase {
  type: QuizQuestionType.SingleChoice;
  answers: QuizAnswer[];
}

export interface DragAndDropQuestion extends QuestionBase {
  type: QuizQuestionType.DragAndDrop;
  answers: {
    text: string;
    position: number;
  }[];
  feedback_correct: string;
  feedback_incorrect: string;
}

export type QuizQuestions =
  | MultipleChoiceQuestion
  | SingleChoiceQuestion
  | DragAndDropQuestion;

export type QuizQuestionInSession = QuizQuestions & { answered: 0 | -1 | 1 };

export interface QuizSession {
  progress: number;
  currentQuestion: number;
  questions: QuizQuestionInSession[];
}
