import { StateContext } from '@ngxs/store';
import { QuizMetadata, QuizQuestion, QuizSession } from './quiz.model';
import {
  LoadQuizQuestions,
  StartQuizSession,
  QuizQuestionAnswered,
} from './quiz.actions';
import { HttpClient } from '@angular/common/http';
import { SolidCoreConfig } from '@zentrumnawi/solid-core';
import * as i0 from '@angular/core';
export interface QuizStateModel {
  metadata: QuizMetadata | null;
  questions: QuizQuestion[];
  session: QuizSession | null;
  expertMode: boolean | false;
}
export declare class QuizState {
  private _config;
  private _http;
  static getSession(state: QuizStateModel): QuizSession | null;
  static getMeta(state: QuizStateModel): QuizMetadata | null;
  static getExpertMode(state: QuizStateModel): boolean | false;
  constructor(_config: SolidCoreConfig, _http: HttpClient);
  setMeta(
    ctx: StateContext<QuizStateModel>
  ): import('rxjs').Observable<QuizMetadata>;
  setExpertMode(ctx: StateContext<QuizStateModel>): void;
  set(
    ctx: StateContext<QuizStateModel>,
    { questionCount, tags, difficulty }: LoadQuizQuestions
  ): import('rxjs').Observable<QuizQuestion[]>;
  startNewSession(
    { patchState, getState }: StateContext<QuizStateModel>,
    { questionCount }: StartQuizSession
  ): void;
  endSession({ patchState }: StateContext<QuizStateModel>): void;
  questionAnswered(
    { patchState, getState }: StateContext<QuizStateModel>,
    { correct }: QuizQuestionAnswered
  ): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<QuizState, never>;
  static ɵprov: i0.ɵɵInjectableDeclaration<QuizState>;
}
