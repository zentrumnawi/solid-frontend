import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  QuizAnswer,
  QuizQuestion,
  QuizQuestionType,
} from '../../state/quiz.model';
import { MatRadioChange } from '@angular/material/radio';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Store } from '@ngxs/store';
import { QuizActions } from '../../state/quiz.actions';

@Component({
  selector: 'solid-quiz-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnChanges {
  @Input() public question?: QuizQuestion;
  public QuestionTypes = QuizQuestionType;
  public SelectedAnswers: number[] = [];
  public ShowAnswers = false;
  public Correct?: boolean;

  constructor(private _store: Store) {}

  public onRadioChange(e: MatRadioChange) {
    this.SelectedAnswers = [e.value];
  }

  public onShowAnswersClick() {
    this.ShowAnswers = true;
    if (this.question) {
      this.Correct = true;
      let correctAnswers = 0;
      this.question.answers.forEach((answer) => {
        if (answer.correct) {
          correctAnswers++;
          if (!this.SelectedAnswers.includes(answer.id)) {
            this.Correct = false;
          }
        }
      });
      if (this.SelectedAnswers.length !== correctAnswers) {
        this.Correct = false;
      }
    }
  }

  public trackByFn(index: number, item: QuizAnswer) {
    return item.id;
  }

  onNextQuestionClick() {
    if (this.question && this.Correct !== undefined) {
      this._store.dispatch(new QuizActions.QuestionAnswered(this.Correct));
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.question.previousValue !== changes.question.currentValue) {
      this.ShowAnswers = false;
      this.SelectedAnswers = [];
      this.Correct = undefined;
    }
  }

  onSelectChange(e: MatCheckboxChange, answer: QuizAnswer) {
    if (e.checked) {
      this.SelectedAnswers.push(answer.id);
    } else {
      this.SelectedAnswers = this.SelectedAnswers.filter(
        (id) => id !== answer.id
      );
    }
  }

  isAnswerCorrect(answer: QuizAnswer) {
    if (!this.ShowAnswers) {
      return false;
    }
    return answer.correct; // && this.SelectedAnswers.includes(answer.id);
  }

  isAnswerIncorrect(answer: QuizAnswer) {
    if (!this.ShowAnswers) {
      return false;
    }
    return !answer.correct; // && this.SelectedAnswers.includes(answer.id);
  }
}
