import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Store } from '@ngxs/store';
import { QuizSession } from '../../state/quiz.model';
import { EndQuizSession, StartQuizSession } from '../../state/quiz.actions';
import { QuizFeedback } from './end-feedback';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UntypedFormControl, Validators } from '@angular/forms';

@Component({
  selector: 'solid-quiz-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss'],
})
export class EndComponent implements OnDestroy {
  private $destroyed = new Subject<boolean>();
  questionCount = new UntypedFormControl(10, [Validators.min(1)]);
  QuizSession: QuizSession | null = null;
  FeedbackText = '';
  correctQuestions = 0;
  correctPercentage = 0;
  answeredQuestions = 0;
  @Output() stopQuiz = new EventEmitter<boolean>();

  constructor(private _store: Store) {
    this._store
      .select((s) => s.quiz.session)
      .pipe(takeUntil(this.$destroyed))
      .subscribe((session: QuizSession | null) => {
        if (session) {
          this.QuizSession = session;
          this.questionCount.setValue(session.questions.length);
          this.correctQuestions = session.questions
            .map((q) => q.answered)
            .reduce((curr, val) => (val === 1 ? curr + 1 : curr), 0 as number);
          this.answeredQuestions = session.questions
            .map((q) => q.answered)
            .reduce((curr, val) => (val !== 0 ? curr + 1 : curr), 0 as number);
          this.correctPercentage =
            this.correctQuestions / this.answeredQuestions;
          let feedbacks: string[] = [];
          if (this.correctPercentage === 0) {
            feedbacks = QuizFeedback.e0;
          } else if (this.correctPercentage < 0.25) {
            feedbacks = QuizFeedback.lt25;
          } else if (this.correctPercentage < 0.5) {
            feedbacks = QuizFeedback.lt50;
          } else if (this.correctPercentage < 0.75) {
            feedbacks = QuizFeedback.lt75;
          } else if (this.correctPercentage === 1) {
            feedbacks = QuizFeedback.e100;
          } else if (isNaN(this.correctPercentage)) {
            feedbacks = QuizFeedback.nan;
          } else {
            feedbacks = QuizFeedback.ge75;
          }
          this.FeedbackText =
            feedbacks[Math.floor(Math.random() * feedbacks.length)];
          this.FeedbackText = this.FeedbackText.replace(
            '{{correctPercentage}}',
            Math.round(100 * this.correctPercentage).toString(10),
          );
        }
      });
  }

  onRestartClick() {
    this._store.dispatch(new StartQuizSession(this.questionCount.value));
    this.stopQuiz.emit(false);
  }

  onStartClick() {
    this._store.dispatch(new EndQuizSession());
    this.stopQuiz.emit(false);
  }

  ngOnDestroy(): void {
    this.$destroyed.next(true);
  }

  onBackBtnClick() {
    this._store.dispatch(new EndQuizSession());
    this.stopQuiz.emit(false);
  }
}
