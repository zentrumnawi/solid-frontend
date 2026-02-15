import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { QuizSession } from '../../state/quiz.model';
import { EndQuizSession, LoadQuizMetadata } from '../../state/quiz.actions';
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
  @Output() questionID = new EventEmitter<number | undefined>();

  constructor(private store: Store) {
    store.dispatch(new LoadQuizMetadata());
    this.QuizSession.subscribe((quizSession) => {
      if (quizSession) {
        this.questionID.emit(
          quizSession.questions[quizSession.currentQuestion].id,
        );
      } else {
        this.questionID.emit(undefined);
      }
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(new EndQuizSession());
  }

  setStopQuiz(stopQuiz: boolean) {
    this.stopQuiz = stopQuiz;
  }
}
