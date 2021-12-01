export class LoadQuizQuestions {
  static readonly type = '[Quiz] questions load';
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

  constructor(public correct: boolean) {}
}
