import { EventEmitter, TemplateRef } from '@angular/core';
import {
  QuizQuestion,
  QuizQuestionType,
  QuizSession,
} from '../../state/quiz.model';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import * as i0 from '@angular/core';
export declare class QuestionComponent {
  private _store;
  private dialog;
  question: QuizQuestion;
  stopQuiz: EventEmitter<boolean>;
  QuestionTypes: typeof QuizQuestionType;
  ImageIndex: number;
  SWIPE_ACTION: {
    LEFT: string;
    RIGHT: string;
  };
  QuizSession: Observable<QuizSession | null>;
  backPopup: TemplateRef<any>;
  skipPopup: TemplateRef<any>;
  constructor(_store: Store, dialog: MatDialog);
  onNextQuestionClicked(correct: number): void;
  swipe(currentIndex: number, imageLength: number, action?: string): void;
  onChartBtnClick(): void;
  onSkipToEnd(): void;
  onBackBtnClick(): void;
  onBackToStart(): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<QuestionComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    QuestionComponent,
    'solid-quiz-question',
    never,
    { question: { alias: 'question'; required: false } },
    { stopQuiz: 'stopQuiz' },
    never,
    never,
    false,
    never
  >;
}
