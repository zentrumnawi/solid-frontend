import {QuizQuestion} from "./quiz.model";

export class QuizQuestionsAdd {
  static readonly type = '[Quiz] Questions Add';

  constructor(public questions: QuizQuestion[]) {
  }
}
