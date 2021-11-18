// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace QuizActions {
  export class LoadQuestions {
    static readonly type = '[Quiz] questions load';
  }

  export class StartSession {
    static readonly type = '[Quiz] session start';

    constructor(public questionCount: number) {}
  }

  export class EndSession {
    static readonly type = '[Quiz] session end';
  }

  export class QuestionAnswered {
    static readonly type = '[Quiz] question answered';

    constructor(public correct: boolean) {}
  }
}
