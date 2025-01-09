import { OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { QuizSession } from '../../state/quiz.model';
import * as i0 from '@angular/core';
export declare class MainComponent implements OnDestroy {
  private store;
  QuizSession: Observable<QuizSession | null>;
  stopQuiz: boolean;
  constructor(store: Store);
  ngOnDestroy(): void;
  setStopQuiz(stopQuiz: boolean): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<MainComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    MainComponent,
    'solid-quiz-main',
    never,
    {},
    {},
    never,
    never,
    false,
    never
  >;
}
