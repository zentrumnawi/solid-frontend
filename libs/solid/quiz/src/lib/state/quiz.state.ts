import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  QuizAnswer,
  QuizMetadata,
  QuizQuestion,
  QuizQuestionApi,
  QuizQuestionInSession,
  QuizSession
} from './quiz.model';
import {
  LoadQuizQuestions,
  StartQuizSession,
  EndQuizSession,
  QuizQuestionAnswered,
  LoadQuizMetadata,
  ToggleExpertMode
} from './quiz.actions';
import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  SOLID_CORE_CONFIG,
  SolidCoreConfig,
  MediaModel
} from '@zentrumnawi/solid-core';
import { map, tap } from 'rxjs/operators';

export interface QuizStateModel {
  metadata: QuizMetadata | null;
  questions: QuizQuestion[];
  session: QuizSession | null;
  expertMode: boolean | false;
}

@State<QuizStateModel>({
  name: 'quiz',
  defaults: {
    metadata: null,
    questions: [],
    session: null,
    expertMode: false
  }
})
@Injectable()
export class QuizState {
  @Selector()
  static getSession(state: QuizStateModel): QuizSession | null {
    return state.session;
  }

  @Selector()
  static getMeta(state: QuizStateModel): QuizMetadata | null {
    return state.metadata;
  }

  @Selector()
  static getExpertMode(state: QuizStateModel): boolean | false {
    return state.expertMode;
  }

  constructor(
    @Inject(SOLID_CORE_CONFIG) private _config: SolidCoreConfig,
    private _http: HttpClient
  ) {}

  @Action(LoadQuizMetadata)
  public setMeta(ctx: StateContext<QuizStateModel>) {
    return this._http.get<QuizMetadata>(`${this._config.apiUrl}/quizmeta`).pipe(
      tap((res) => {
        ctx.patchState({
          metadata: res
        });
      })
    );
  }

  @Action(ToggleExpertMode)
  public setExpertMode(ctx: StateContext<QuizStateModel>) {
    const state = ctx.getState();
    ctx.setState({ ...state, expertMode: !state.expertMode });
    return;
  }

  @Action(LoadQuizQuestions)
  public set(
    ctx: StateContext<QuizStateModel>,
    { questionCount, tags, difficulty }: LoadQuizQuestions
  ) {
    let params;

    if (tags == null) tags = [];

    if (tags.length == 0 && difficulty.length == 0) {
      params = new HttpParams().set('count', questionCount);
    } else if (tags.length == 0) {
      params = new HttpParams()
        .set('count', questionCount)
        .set('difficulty', difficulty.toString());
    } else if (difficulty.length == 0) {
      params = new HttpParams()
        .set('count', questionCount)
        .set('tags', JSON.stringify(tags));
    } else {
      params = new HttpParams()
        .set('count', questionCount)
        .set('tags', JSON.stringify(tags))
        .set('difficulty', difficulty.toString());
    }

    return this._http
      .get<QuizQuestion[]>(`${this._config.apiUrl}/quizsession`, {
        params: params
      })
      .pipe(
        map((response) => {
          const mapit = (input: QuizQuestionApi[]): QuizQuestion[] => {
            return input.map((question) => {
              return {
                ...question,
                images: question.img.map((p) => new MediaModel(p))
              };
            });
          };
          return mapit(response);
        }),
        tap((res) => {
          ctx.patchState({
            questions: res
          });
        })
      );
  }

  @Action(StartQuizSession)
  public startNewSession(
    { patchState, getState }: StateContext<QuizStateModel>,
    { questionCount }: StartQuizSession
  ) {
    const sessionQuestions: QuizQuestionInSession[] = [];
    const questions = getState().questions;

    questionCount =
      questionCount > questions.length ? questions.length : questionCount;
    for (let i = 0; i < questionCount; ) {
      const rnd = Math.floor(Math.random() * questions.length);
      if (sessionQuestions.find((q) => q.id === questions[rnd].id)) {
        continue;
      }
      const rndQuestions = { ...questions[rnd] };
      rndQuestions.answers = [];
      for (let j = 0; j < questions[rnd].answers.length; ) {
        const random = Math.floor(
          Math.random() * questions[rnd].answers.length
        );
        if (
          rndQuestions.answers.find(
            (a) => a.id === questions[rnd].answers[random].id
          )
        )
          continue;
        rndQuestions.answers.push(questions[rnd].answers[random]);
        j++;
      }
      sessionQuestions.push({ answered: 0, ...rndQuestions });
      i++;
    }
    patchState({
      session: {
        progress: 0,
        currentQuestion: 0,
        questions: sessionQuestions
      }
    });
  }

  @Action(EndQuizSession)
  public endSession({ patchState }: StateContext<QuizStateModel>) {
    patchState({
      session: null
    });
  }

  @Action(QuizQuestionAnswered)
  public questionAnswered(
    { patchState, getState }: StateContext<QuizStateModel>,
    { correct }: QuizQuestionAnswered
  ) {
    const session = { ...(getState().session as QuizSession) };
    const answeredQuestion = {
      ...session.questions[session.currentQuestion],
      answered: correct as 0 | -1 | 1
    };
    patchState({
      session: {
        currentQuestion: session.currentQuestion + 1,
        progress:
          (100.0 / session.questions.length) * (session.currentQuestion + 1),
        questions: session.questions.map((q) =>
          q.id === answeredQuestion.id ? answeredQuestion : q
        )
      }
    });
  }
}
