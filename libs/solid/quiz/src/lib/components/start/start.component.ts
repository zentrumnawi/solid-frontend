import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { LoadQuizQuestions, StartQuizSession } from '../../state/quiz.actions';
import { Observable, Subject } from 'rxjs';
import { QuizState } from '../../state/quiz.state';
import { QuizMetadata } from '../../state/quiz.model';
import { FormControl } from '@angular/forms';
import { Navigate } from '@ngxs/router-plugin';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

@Component({
  selector: 'solid-quiz-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnDestroy, OnInit {
  @Select(QuizState.getMeta) metaData$!: Observable<QuizMetadata> | null;
  private $destroyed = new Subject();
  expertMode: boolean;
  maxDifficulty?: number;
  questionCount = 10;
  chosenTags = new FormControl();
  chosenDifficulty: number[] = [];
  isValid = true;
  difficulty = [1, 2, 3, 4, 5]; // for testing - Difficulty levels

  constructor(private _store: Store) {
    this.expertMode = false;
  }

  public ngOnInit(): void {
    this.metaData$?.subscribe((data) => {
      if (data) this.maxDifficulty = data.difficulties.length;
    });
  }

  public onStartClick() {
    const quizLoaded = this._store.dispatch(
      new LoadQuizQuestions(
        this.questionCount,
        this.chosenTags.value,
        this.chosenDifficulty
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
    const index = this.chosenTags.value.indexOf(tag);
    if (index >= 0) this.chosenTags.value.splice(index, 1);
    this.chosenTags.setValue(this.chosenTags.value);
  }

  @Dispatch()
  public async navigateTo(url: string) {
    return new Navigate([url]);
  }

  onBackBtnClick() {
    this.navigateTo('/');
  }

  onButtonToggleChange(change: MatButtonToggleChange) {
    this.chosenDifficulty = change.value;
  }
}
