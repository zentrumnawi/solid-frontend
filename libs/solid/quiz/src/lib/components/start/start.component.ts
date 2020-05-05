import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { QuizActions } from '../../state/quiz.actions';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'solid-quiz-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent {
  public QuizLoaded: Observable<boolean>;
  questionCount = 10;

  constructor(private _store: Store) {
    this.QuizLoaded = this._store
      .select(s => s.quiz.questions)
      .pipe(map(v => v.length > 0));
  }

  public onStartClick() {
    this._store.dispatch(new QuizActions.StartSession(this.questionCount));
  }
}
