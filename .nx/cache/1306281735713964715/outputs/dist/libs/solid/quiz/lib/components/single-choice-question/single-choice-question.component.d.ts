import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { QuizAnswer, QuizQuestion } from '../../state/quiz.model';
import * as i0 from '@angular/core';
export declare class SingleChoiceQuestionComponent implements OnChanges {
  question: QuizQuestion;
  nextQuestionClicked: EventEmitter<number>;
  selectedAnswer?: number;
  showAnswers: boolean;
  correct: number;
  ngOnChanges(changes: SimpleChanges): void;
  onRadioChange(e: MatRadioChange): void;
  trackByFn(index: number, item: QuizAnswer): number;
  isAnswerCorrect(answer: QuizAnswer): boolean;
  isAnswerIncorrect(answer: QuizAnswer): boolean;
  onShowAnswersClick(): void;
  onNextQuestionClick(): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<SingleChoiceQuestionComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    SingleChoiceQuestionComponent,
    'solid-quiz-single-choice-question',
    never,
    { question: { alias: 'question'; required: false } },
    { nextQuestionClicked: 'nextQuestionClicked' },
    never,
    never,
    false,
    never
  >;
}
