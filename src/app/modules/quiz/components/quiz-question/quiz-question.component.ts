import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {QuizAnswer, QuizQuestion, QuizQuestionType} from "../../state/quiz.model";
import {MatRadioChange} from "@angular/material/radio";
import {MatCheckboxChange} from "@angular/material/checkbox";

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
  @Output('onNext') private onNext = new EventEmitter<void>();

  public onRadioChange(e: MatRadioChange) {
    this.SelectedAnswers = [e.value];
  }

  public onShowAnswersClick() {
    this.ShowAnswers = true;
  }

  public trackByFn(index: number, item: QuizAnswer) {
    return item.id;
  }

  onNextQuestionClick() {
    this.onNext.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.Question.previousValue !== changes.Question.currentValue) {
      this.ShowAnswers = false;
      this.SelectedAnswers = [];
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
    return answer.correct && this.SelectedAnswers.includes(answer.id);
  }

  isAnswerIncorrect(answer: QuizAnswer) {
    if (!this.ShowAnswers) {
      return false;
    }
    return !answer.correct && this.SelectedAnswers.includes(answer.id);
  }
}
