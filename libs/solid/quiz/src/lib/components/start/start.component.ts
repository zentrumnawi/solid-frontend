import { Component, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { LoadQuizQuestions, StartQuizSession } from '../../state/quiz.actions';
import { Observable, Subject } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { QuizState } from '../../state/quiz.state';
import { QuizMetadata } from '../../state/quiz.model';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'solid-quiz-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent implements OnDestroy {
  @Select(QuizState.getMeta) metaData$!: Observable<QuizMetadata> | null;
  private $destroyed = new Subject();
  isValid = true;
  difficulty = 1;
  chosenTags: string[] = [];
  questionCount = new FormControl(10, [Validators.min(1)]);

  constructor(private _store: Store) {}

  public onStartClick() {
    const quizLoaded = this._store.dispatch(
      new LoadQuizQuestions(
        this.questionCount.value,
        this.chosenTags,
        this.difficulty
      )
    );
    quizLoaded.subscribe((res) => {
      if (res.quiz.questions.length > 0) {
        this._store.dispatch(new StartQuizSession(this.questionCount.value));
        this.isValid = true;
      } else {
        this.isValid = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.$destroyed.next(true);
  }

  addTag(event: MatChipInputEvent) {
    const value = (event.value || '').trim();
    if (value) {
      this.chosenTags.push(value);
    }
  }

  removeTag(tag: string): void {
    const index = this.chosenTags.indexOf(tag);
    if (index >= 0) {
      this.chosenTags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const tag = event.option.viewValue;
    if (!this.chosenTags.includes(tag))
      this.chosenTags.push(event.option.viewValue);
  }
}
