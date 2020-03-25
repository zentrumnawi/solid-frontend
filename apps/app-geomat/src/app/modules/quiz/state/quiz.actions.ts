import {QuizQuestion} from './quiz.model';

export class QuizQuestionsAdd {
  static readonly type = '[Quiz] questions add';

  constructor(public questions: QuizQuestion[]) {
  }
}

export class QuizSessionStart {
  static readonly type = '[Quiz] session start';

  constructor(public questionCount: number) {
  }
}

export class QuizSessionEnd {
  static readonly type = '[Quiz] session end';

  constructor() {
  }
}

export class QuizQuestionAnswered {
  static readonly type = '[Quiz] question answered';

  constructor(public correct: boolean) {
  }
}

