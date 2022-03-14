import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { StartQuizSession } from '../../state/quiz.actions';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'solid-quiz-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent implements OnDestroy {
  private $destroyed = new Subject();
  public QuizLoaded: Observable<boolean>;
  questionCount = new FormControl(10, [Validators.min(1)]);

  constructor(private _store: Store) {
    this.QuizLoaded = this._store
      .select((s) => s.quiz.questions)
      .pipe(
        map((v) => v.length > 0),
        takeUntil(this.$destroyed)
      );
  }

  public onStartClick() {
    this._store.dispatch(new StartQuizSession(this.questionCount.value));
  }

  ngOnDestroy(): void {
    this.$destroyed.next(true);
  }
}
