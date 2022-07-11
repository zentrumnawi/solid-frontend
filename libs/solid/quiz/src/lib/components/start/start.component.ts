import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import {
  LoadQuizQuestions,
  StartQuizSession,
  ToggleExpertMode,
} from '../../state/quiz.actions';
import { Observable, Subject } from 'rxjs';
import { QuizState } from '../../state/quiz.state';
import { QuizMetadata } from '../../state/quiz.model';
import { Navigate } from '@ngxs/router-plugin';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatChipListChange } from '@angular/material/chips';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'solid-quiz-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent implements OnDestroy, OnInit {
  @Select(QuizState.getMeta) metaData$!: Observable<QuizMetadata> | null;
  @Select(QuizState.getExpertMode) expertMode!: boolean | false;
  private $destroyed = new Subject();
  expertModeStatus: boolean;
  questionCount = 10;
  chosenTags = [];
  chosenDifficulty: number[] = [];
  isValid = true;
  tags: string[] = [];
  difficulties: number[] = [];

  constructor(private _store: Store) {
    this.expertModeStatus = false;
  }

  public onStartClick() {
    const quizLoaded = this._store.dispatch(
      new LoadQuizQuestions(
        this.questionCount,
        this.chosenTags,
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

  ngOnInit(): void {
    this._store.select(QuizState.getExpertMode).subscribe((data) => {
      this.expertModeStatus = data;
    });
    this.metaData$?.subscribe((data) => {
      if (data) {
        const tags = [...data.tags];
        const difficulties = [...data.difficulties];
        this.tags = tags.sort();
        this.difficulties = difficulties.sort();
      }
    });
  }

  ngOnDestroy(): void {
    this.$destroyed.next(true);
  }

  @Dispatch()
  public async navigateTo(url: string) {
    return new Navigate([url]);
  }

  expertModeToggle() {
    this._store.dispatch(new ToggleExpertMode());
  }

  onBackBtnClick() {
    this.navigateTo('/');
  }

  onSliderChange(change: MatSliderChange) {
    if (change.value) this.questionCount = change.value;
  }

  onButtonToggleChange(change: MatButtonToggleChange) {
    this.chosenDifficulty = change.value;
  }

  onTagSelectionChange(change: MatChipListChange) {
    this.chosenTags = change.value;
  }

  onDeselectAllTagClick() {
    this.chosenTags = [];
  }

  onDeselectAllDifficultyClick() {
    this.chosenDifficulty = [];
  }
}
