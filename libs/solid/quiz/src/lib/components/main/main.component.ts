import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { QuizSession } from '../../state/quiz.model';
import { QuizActions } from '../../state/quiz.actions';
import { QuizState } from '../../state/quiz.state';

@Component({
  selector: 'solid-quiz-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  @Select(QuizState.getSession)
  QuizSession!: Observable<QuizSession | null>;

  constructor(store: Store) {
    store.dispatch(new QuizActions.LoadQuestions());
  }
}
