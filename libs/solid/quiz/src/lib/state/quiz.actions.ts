export class LoadQuizQuestions {
  static readonly type = '[Quiz] questions load';

  constructor(
    public questionCount: number,
    public tags: string[],
    public difficulty: number[]
  ) {}
}

export class StartQuizSession {
  static readonly type = '[Quiz] session start';

  constructor(public questionCount: number) {}
}

export class EndQuizSession {
  static readonly type = '[Quiz] session end';
}

export class QuizQuestionAnswered {
  static readonly type = '[Quiz] question answered';

  constructor(public correct: number) {}
}

export class LoadQuizMetadata {
  static readonly type = '[Quiz] metadata load';
}

export class ToggleExpertMode {
  static readonly type = '[Quiz] expert mode set';
}
