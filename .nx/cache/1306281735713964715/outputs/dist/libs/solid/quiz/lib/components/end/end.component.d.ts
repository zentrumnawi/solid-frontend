import { EventEmitter, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { QuizSession } from '../../state/quiz.model';
import { UntypedFormControl } from '@angular/forms';
import * as i0 from '@angular/core';
export declare class EndComponent implements OnDestroy {
  private _store;
  private $destroyed;
  questionCount: UntypedFormControl;
  QuizSession: QuizSession | null;
  FeedbackText: string;
  correctQuestions: number;
  correctPercentage: number;
  answeredQuestions: number;
  stopQuiz: EventEmitter<boolean>;
  constructor(_store: Store);
  onRestartClick(): void;
  onStartClick(): void;
  ngOnDestroy(): void;
  onBackBtnClick(): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<EndComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    EndComponent,
    'solid-quiz-end',
    never,
    {},
    { stopQuiz: 'stopQuiz' },
    never,
    never,
    false,
    never
  >;
}
