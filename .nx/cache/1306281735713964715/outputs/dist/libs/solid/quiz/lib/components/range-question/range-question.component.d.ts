import { EventEmitter } from '@angular/core';
import { QuizQuestion } from '../../state/quiz.model';
import * as i0 from '@angular/core';
export declare class RangeQuestionComponent {
  question: QuizQuestion;
  nextQuestionClicked: EventEmitter<number>;
  correct: number;
  showAnswers: boolean;
  sliderPosition: number;
  onShowAnswersClick(): void;
  onSliderChange(value: number): void;
  onNextQuestionClick(): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<RangeQuestionComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    RangeQuestionComponent,
    'solid-quiz-range-question',
    never,
    { question: { alias: 'question'; required: false } },
    { nextQuestionClicked: 'nextQuestionClicked' },
    never,
    never,
    false,
    never
  >;
}
