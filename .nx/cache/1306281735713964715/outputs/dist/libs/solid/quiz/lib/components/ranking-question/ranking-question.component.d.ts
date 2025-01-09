import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { QuizQuestion } from '../../state/quiz.model';
import * as i0 from '@angular/core';
export declare class RankingQuestionComponent implements OnInit, OnChanges {
  question: QuizQuestion;
  nextQuestionClicked: EventEmitter<number>;
  showAnswers: boolean;
  correct: number;
  index: number;
  answersList: any[];
  hasSubsequence: boolean;
  subsequence: number[];
  ngOnInit(): void;
  ngOnChanges(changes: SimpleChanges): void;
  drop(event: CdkDragDrop<any[]>): void;
  onShowAnswersClick(): void;
  isCorrectPosition(answer: any): boolean;
  isInCorrectPosition(answer: any): boolean;
  onNextQuestionClick(): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<RankingQuestionComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    RankingQuestionComponent,
    'solid-quiz-ranking-question',
    never,
    { question: { alias: 'question'; required: false } },
    { nextQuestionClicked: 'nextQuestionClicked' },
    never,
    never,
    false,
    never
  >;
}
