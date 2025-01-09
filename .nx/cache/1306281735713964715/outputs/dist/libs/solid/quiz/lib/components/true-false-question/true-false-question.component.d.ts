import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { QuizQuestion } from '../../state/quiz.model';
import * as i0 from '@angular/core';
export declare class TrueFalseQuestionComponent implements OnChanges {
  question: QuizQuestion;
  nextQuestionClicked: EventEmitter<number>;
  selectedAnswer: boolean;
  showAnswers: boolean;
  correct: number;
  ngOnChanges(changes: SimpleChanges): void;
  onTrueClick(): void;
  onFalseClick(): void;
  onShowAnswersClick(): void;
  onNextQuestionClick(): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<TrueFalseQuestionComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    TrueFalseQuestionComponent,
    'solid-quiz-true-false-question',
    never,
    { question: { alias: 'question'; required: false } },
    { nextQuestionClicked: 'nextQuestionClicked' },
    never,
    never,
    false,
    never
  >;
}
