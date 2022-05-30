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
  @Output() public nextQuestionClicked = new EventEmitter<boolean>();

  public selectedAnswer!: number;
  public showAnswers = false;
  public correct = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.question.previousValue !== changes.question.currentValue) {
      this.showAnswers = false;
      this.correct = false;
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
    this.question.answers.forEach((value) => {
      if (value.id == this.selectedAnswer && value.correct) this.correct = true;
    });
  }

  public onNextQuestionClick() {
    this.nextQuestionClicked.emit(this.correct);
  }
}
