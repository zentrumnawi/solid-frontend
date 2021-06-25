import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Store } from '@ngxs/store';
import { QuizSession } from '../../state/quiz.model';
import { QuizActions } from '../../state/quiz.actions';
import { QuizFeedback } from './end-feedback';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'solid-quiz-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss'],
})
export class EndComponent implements OnDestroy {
  private $destroyed = new Subject();
  questionCount = new FormControl(10, [Validators.min(1)]);
  QuizSession: QuizSession | null = null;
  FeedbackText = '';
  correctQuestions = 0;
  correctPercentage = 0;
  oldCount = 0;
  @Output() stopQuiz = new EventEmitter<boolean>();

  constructor(private _store: Store) {
    this._store
      .select((s) => s.quiz.session)
      .pipe(takeUntil(this.$destroyed))
      .subscribe((session: QuizSession | null) => {
        if (session) {
          this.QuizSession = session;
          this.questionCount.setValue(session.questions.length);
          this.oldCount = session.questions.length;
          this.correctQuestions = session.questions
            .map((q) => q.answered)
            .reduce((curr, val) => (val === 1 ? curr + 1 : curr), 0 as number);
          this.correctPercentage = this.correctQuestions / this.oldCount;
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
          } else {
            feedbacks = QuizFeedback.ge75;
          }
          this.FeedbackText =
            feedbacks[Math.floor(Math.random() * feedbacks.length)];
          this.FeedbackText = this.FeedbackText.replace(
            '{{correctPercentage}}',
            Math.round(100 * this.correctPercentage).toString(10)
          );
          this.FeedbackText = this.FeedbackText.replace(
            '{{Count}}',
            this.oldCount.toString(10)
          );
        }
      });
  }

  onStartClick() {
    this._store.dispatch(
      new QuizActions.StartSession(this.questionCount.value)
    );
    this.stopQuiz.emit(false);
  }

  ngOnDestroy(): void {
    this.$destroyed.next();
  }
}
