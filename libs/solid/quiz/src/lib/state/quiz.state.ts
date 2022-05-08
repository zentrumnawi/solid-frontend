import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  QuizMetadata,
  QuizQuestion,
  QuizQuestionApi,
  QuizQuestionInSession,
  QuizSession,
} from './quiz.model';
import {
  LoadQuizQuestions,
  StartQuizSession,
  EndQuizSession,
  QuizQuestionAnswered,
  LoadQuizMetadata,
} from './quiz.actions';
import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  SOLID_CORE_CONFIG,
  SolidCoreConfig,
  ImageModel,
} from '@zentrumnawi/solid-core';
import { map, tap } from 'rxjs/operators';

export interface QuizStateModel {
  metadata: QuizMetadata | null;
  questions: QuizQuestion[];
  session: QuizSession | null;
}

@State<QuizStateModel>({
  name: 'quiz',
  defaults: {
    metadata: null,
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

  @Selector()
  static getMeta(state: QuizStateModel): QuizMetadata | null {
    return state.metadata;
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
          metadata: res,
        });
      })
    );
  }

  @Action(LoadQuizQuestions)
  public set(
    ctx: StateContext<QuizStateModel>,
    { questionCount, tags, difficulty }: LoadQuizQuestions
  ) {
    let params;

    if (tags.length == 0 && difficulty == 0) {
      params = new HttpParams().set('count', questionCount);
    } else if (tags.length == 0) {
      params = new HttpParams()
        .set('count', questionCount)
        .set('difficulty', difficulty);
    } else if (difficulty == 0) {
      params = new HttpParams()
        .set('count', questionCount)
        .set('tags', JSON.stringify(tags));
    } else {
      params = new HttpParams()
        .set('count', questionCount)
        .set('tags', JSON.stringify(tags))
        .set('difficulty', difficulty);
    }

    return this._http
      .get<QuizQuestion[]>(`${this._config.apiUrl}/quizsession`, {
        params: params,
      })
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

  @Action(EndQuizSession)
  public endSession({ patchState }: StateContext<QuizStateModel>) {
    patchState({
      session: null,
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
