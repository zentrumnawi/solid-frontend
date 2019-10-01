import {Action, State, StateContext} from "@ngxs/store";
import {QuizQuestion, QuizQuestionInSession, QuizSession} from "./quiz.model";
import {QuizQuestionAnswered, QuizQuestionsAdd, QuizSessionEnd, QuizSessionStart} from "./quiz.actions";

export interface QuizStateModel {
  questions: QuizQuestion[];
  session: QuizSession | null;
}

@State<QuizStateModel>({
  name: 'quiz',
  defaults: {
    questions: [],
    session: null,
  }
})
export class QuizState {

  @Action(QuizQuestionsAdd)
  public set(ctx: StateContext<QuizStateModel>, action: QuizQuestionsAdd) {
    ctx.patchState({
      questions: action.questions,
    });
  }

  @Action(QuizSessionStart)
  public startSession({ patchState, getState }: StateContext<QuizStateModel>, { questionCount }: QuizSessionStart) {
    const questions = getState().questions;
    const sessionQuestions: QuizQuestionInSession[] = [];
    for (let i = 0; i < questionCount;) {
      const rnd = Math.floor(Math.random() * (questions.length));
      if (sessionQuestions.find(q => q.id === questions[rnd].id)) {
        continue;
      }
      sessionQuestions.push({ answered: 0, ...questions[rnd], });
      i++;
    }
    patchState({
      session: {
        progress: 0,
        currentQuestion: 0,
        questions: sessionQuestions,
      }
    })
  }

  @Action(QuizSessionEnd)
  public endSession({ patchState }: StateContext<QuizStateModel>, {}: QuizSessionEnd) {
    patchState({
      session: null,
    })
  }

  @Action(QuizQuestionAnswered)
  public questionAnswered({ patchState, getState }: StateContext<QuizStateModel>, { correct }: QuizQuestionAnswered) {
    const session = { ...getState().session as QuizSession };
    const answeredQuestion = { ...session.questions[session.currentQuestion], answered: (correct ? 1 : -1) as 1 | -1};
    patchState({
      session: {
        currentQuestion: session.currentQuestion + 1,
        progress: 100.0 / session.questions.length * (session.currentQuestion + 1),
        questions: session.questions.map(q => q.id === answeredQuestion.id ? answeredQuestion : q),
      },
    })
  }


}
