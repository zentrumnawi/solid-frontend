import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { QuizAnswer, QuizQuestion } from '../../state/quiz.model';
import * as i0 from '@angular/core';
export declare class MultipleChoiceQuestionComponent implements OnChanges {
  question: QuizQuestion;
  nextQuestionClicked: EventEmitter<number>;
  selectedAnswers: number[];
  showAnswers: boolean;
  correct: number;
  ngOnChanges(changes: SimpleChanges): void;
  onSelectChange(e: MatCheckboxChange, answer: QuizAnswer): void;
  isAnswerCorrect(answer: QuizAnswer): boolean;
  isAnswerIncorrect(answer: QuizAnswer): boolean;
  trackByFn(index: number, item: QuizAnswer): number;
  onShowAnswersClick(): void;
  onNextQuestionClick(): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<MultipleChoiceQuestionComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    MultipleChoiceQuestionComponent,
    'solid-quiz-multiple-choice-question',
    never,
    { question: { alias: 'question'; required: false } },
    { nextQuestionClicked: 'nextQuestionClicked' },
    never,
    never,
    false,
    never
  >;
}
