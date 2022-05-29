import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuizQuestion } from '../../state/quiz.model';

@Component({
  selector: 'solid-quiz-true-false-question',
  templateUrl: './true-false-question.component.html',
  styleUrls: ['./true-false-question.component.scss'],
})
export class TrueFalseQuestionComponent {
  @Input() public question!: QuizQuestion;
  @Output() public nextQuestionClicked = new EventEmitter<boolean>();

  public selectedAnswer!: boolean;
  public showAnswers = false;
  public correct = false;

  public onTrueClick() {
    this.selectedAnswer = true;
  }

  public onFalseClick() {
    this.selectedAnswer = false;
  }

  public onShowAnswersClick() {
    this.showAnswers = true;
    if (this.selectedAnswer == this.question.answers[0].correct) {
      this.correct = true;
    } else {
      this.correct = false;
    }
  }

  public onNextQuestionClick() {
    this.nextQuestionClicked.emit(this.correct);
  }
}
