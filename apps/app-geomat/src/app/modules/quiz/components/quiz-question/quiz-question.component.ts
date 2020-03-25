import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {QuizAnswer, QuizQuestion, QuizQuestionType} from "../../state/quiz.model";
import {MatRadioChange} from "@angular/material/radio";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {Store} from "@ngxs/store";
import {QuizQuestionAnswered} from "../../state/quiz.actions";

@Component({
  selector: 'app-quiz-question',
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.scss']
})
export class QuizQuestionComponent implements OnChanges {
  @Input('question') public Question?: QuizQuestion;
  public QuestionTypes = QuizQuestionType;
  public SelectedAnswers: number[] = [];
  public ShowAnswers = false;
  public Correct?: boolean;

  constructor(private _store: Store) {
  }

  public onRadioChange(e: MatRadioChange) {
    this.SelectedAnswers = [e.value];
  }

  public onShowAnswersClick() {
    this.ShowAnswers = true;
    if (this.Question) {
      this.Correct = true;
      let correctAnswers = 0;
      this.Question.answers.forEach(answer => {
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
      console.log(this.ShowAnswers, this.Correct)
    }
  }

  public trackByFn(index: number, item: QuizAnswer) {
    return item.id;
  }

  onNextQuestionClick() {
    if (this.Question && this.Correct !== undefined) {
      this._store.dispatch(new QuizQuestionAnswered(this.Correct));
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.Question.previousValue !== changes.Question.currentValue) {
      this.ShowAnswers = false;
      this.SelectedAnswers = [];
      this.Correct = undefined;
    }
  }

  onSelectChange(e: MatCheckboxChange, answer: QuizAnswer) {
    if (e.checked) {
      this.SelectedAnswers.push(answer.id);
    } else {
      this.SelectedAnswers = this.SelectedAnswers.filter(id => id !== answer.id);
    }
  }

  isAnswerCorrect(answer: QuizAnswer) {
    if (!this.ShowAnswers) {
      return false;
    }
    return answer.correct;// && this.SelectedAnswers.includes(answer.id);
  }

  isAnswerIncorrect(answer: QuizAnswer) {
    if (!this.ShowAnswers) {
      return false;
    }
    return !answer.correct;// && this.SelectedAnswers.includes(answer.id);
  }
}
