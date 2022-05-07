import { Component, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { LoadQuizQuestions, StartQuizSession } from '../../state/quiz.actions';
import { Observable, Subject } from 'rxjs';
import { QuizState } from '../../state/quiz.state';
import { QuizMetadata } from '../../state/quiz.model';

@Component({
  selector: 'solid-quiz-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent implements OnDestroy {
  @Select(QuizState.getMeta) metaData$!: Observable<QuizMetadata> | null;
  private $destroyed = new Subject();
  questionCount = 5;
  isValid = true;
  difficulty = 1;
  chosenTags: string[] = [];

  constructor(private _store: Store) {}

  public onStartClick() {
    const quizLoaded = this._store.dispatch(
      new LoadQuizQuestions(
        this.questionCount,
        this.chosenTags,
        this.difficulty
      )
    );
    quizLoaded.subscribe((res) => {
      if (res.quiz.questions.length > 0) {
        this._store.dispatch(new StartQuizSession(this.questionCount));
        this.isValid = true;
      } else {
        this.isValid = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.$destroyed.next(true);
  }

  remove(tag: string) {
    const index = this.chosenTags.indexOf(tag);
    if (index >= 0) this.chosenTags.splice(index, 1);
  }
}
