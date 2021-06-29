import { Component, OnDestroy } from '@angular/core';
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
export class MainComponent implements OnDestroy {
  @Select(QuizState.getSession)
  QuizSession!: Observable<QuizSession | null>;
  stopQuiz = false;

  constructor(private store: Store) {
    store.dispatch(new QuizActions.LoadQuestions());
  }

  ngOnDestroy(): void {
    this.store.dispatch(new QuizActions.EndSession());
  }

  setStopQuiz(stopQuiz: boolean) {
    this.stopQuiz = stopQuiz;
  }
}
