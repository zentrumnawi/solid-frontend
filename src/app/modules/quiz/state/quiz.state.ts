import {Action, State, StateContext} from "@ngxs/store";
import {QuizQuestion} from "./quiz.model";
import {QuizQuestionsAdd} from "./quiz.actions";

export interface QuizStateModel {
  questions: QuizQuestion[];
}

@State<QuizStateModel>({
  name: 'quiz',
  defaults: {
    questions: []
  }
})
export class QuizState {
  @Action(QuizQuestionsAdd)
  public set(ctx: StateContext<QuizStateModel>, action: QuizQuestionsAdd) {
    ctx.setState({
      questions: action.questions,
    });
  }
}
