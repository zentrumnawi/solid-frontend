import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  QuizQuestion,
  QuizQuestionApi,
  QuizQuestionInSession,
  QuizSession,
} from './quiz.model';
import { QuizActions } from './quiz.actions';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  SOLID_CORE_CONFIG,
  SolidCoreConfig,
  ImageModel,
} from '@zentrumnawi/solid-core';
import { map, tap } from 'rxjs/operators';

export interface QuizStateModel {
  questions: QuizQuestion[];
  session: QuizSession | null;
}

@State<QuizStateModel>({
  name: 'quiz',
  defaults: {
    questions: [],
    session: null,
  },
})
@Injectable()
export class QuizState {
  @Selector()
  static getSession(state: QuizStateModel): QuizSession | null {
    return state.session;
  }
  constructor(
    @Inject(SOLID_CORE_CONFIG) private _config: SolidCoreConfig,
    private _http: HttpClient
  ) {}

  @Action(QuizActions.LoadQuestions)
  public set(ctx: StateContext<QuizStateModel>) {
    return this._http
      .get<QuizQuestion[]>(`${this._config.apiUrl}/quizquestions`)
      .pipe(
        map((response) => {
          const mapit = (input: QuizQuestionApi[]): QuizQuestion[] => {
            return input.map((question) => {
              return {
                ...question,
                images: question.img.map((p) => new ImageModel(p)),
              };
            });
          };
          return mapit(response);
        }),
        tap((res) => {
          ctx.patchState({
            questions: res,
          });
        })
      );
  }

  @Action(QuizActions.StartSession)
  public startSession(
    { patchState, getState }: StateContext<QuizStateModel>,
    { questionCount }: QuizActions.StartSession
  ) {
    const questions = getState().questions;
    const sessionQuestions: QuizQuestionInSession[] = [];
    questionCount =
      questionCount > questions.length ? questions.length : questionCount;
    for (let i = 0; i < questionCount; ) {
      const rnd = Math.floor(Math.random() * questions.length);
      if (sessionQuestions.find((q) => q.id === questions[rnd].id)) {
        continue;
      }
      sessionQuestions.push({ answered: 0, ...questions[rnd] });
      i++;
    }
    patchState({
      session: {
        progress: 0,
        currentQuestion: 0,
        questions: sessionQuestions,
      },
    });
  }

  @Action(QuizActions.EndSession)
  public endSession({ patchState }: StateContext<QuizStateModel>) {
    patchState({
      session: null,
    });
  }

  @Action(QuizActions.QuestionAnswered)
  public questionAnswered(
    { patchState, getState }: StateContext<QuizStateModel>,
    { correct }: QuizActions.QuestionAnswered
  ) {
    const session = { ...(getState().session as QuizSession) };
    const answeredQuestion = {
      ...session.questions[session.currentQuestion],
      answered: (correct ? 1 : -1) as 1 | -1,
    };
    patchState({
      session: {
        currentQuestion: session.currentQuestion + 1,
        progress:
          (100.0 / session.questions.length) * (session.currentQuestion + 1),
        questions: session.questions.map((q) =>
          q.id === answeredQuestion.id ? answeredQuestion : q
        ),
      },
    });
  }
}
