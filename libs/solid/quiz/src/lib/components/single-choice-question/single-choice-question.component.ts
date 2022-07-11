import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { QuizAnswer, QuizQuestion } from '../../state/quiz.model';

@Component({
  selector: 'solid-quiz-single-choice-question',
  templateUrl: './single-choice-question.component.html',
  styleUrls: ['./single-choice-question.component.scss'],
})
export class SingleChoiceQuestionComponent implements OnChanges {
  @Input() public question!: QuizQuestion;
  @Output() public nextQuestionClicked = new EventEmitter<number>();

  public selectedAnswer?: number;
  public showAnswers = false;
  public correct = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.question.previousValue !== changes.question.currentValue) {
      this.selectedAnswer = undefined;
      this.showAnswers = false;
      this.correct = 0;
    }
  }

  public onRadioChange(e: MatRadioChange) {
    this.selectedAnswer = e.value;
  }

  public trackByFn(index: number, item: QuizAnswer) {
    return item.id;
  }

  public isAnswerCorrect(answer: QuizAnswer) {
    if (!this.showAnswers) {
      return false;
    }
    return answer.correct;
  }

  public isAnswerIncorrect(answer: QuizAnswer) {
    if (!this.showAnswers) {
      return false;
    }
    return !answer.correct;
  }

  public onShowAnswersClick() {
    this.showAnswers = true;
    if (this.selectedAnswer == undefined) this.correct = 0;
    else this.correct = -1;
    this.question.answers.forEach((value) => {
      if (value.id == this.selectedAnswer && value.correct) this.correct = 1;
    });
  }

  public onNextQuestionClick() {
    if (this.selectedAnswer == undefined) this.correct = 0;
    this.nextQuestionClicked.emit(this.correct);
  }
}
