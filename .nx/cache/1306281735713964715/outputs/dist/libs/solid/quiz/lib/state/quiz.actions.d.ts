export declare class LoadQuizQuestions {
  questionCount: number;
  tags: string[];
  difficulty: number[];
  static readonly type = '[Quiz] questions load';
  constructor(questionCount: number, tags: string[], difficulty: number[]);
}
export declare class StartQuizSession {
  questionCount: number;
  static readonly type = '[Quiz] session start';
  constructor(questionCount: number);
}
export declare class EndQuizSession {
  static readonly type = '[Quiz] session end';
}
export declare class QuizQuestionAnswered {
  correct: number;
  static readonly type = '[Quiz] question answered';
  constructor(correct: number);
}
export declare class LoadQuizMetadata {
  static readonly type = '[Quiz] metadata load';
}
export declare class ToggleExpertMode {
  static readonly type = '[Quiz] expert mode set';
}
