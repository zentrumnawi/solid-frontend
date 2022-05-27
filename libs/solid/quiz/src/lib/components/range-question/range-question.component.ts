import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuizQuestion } from '../../state/quiz.model';

@Component({
  selector: 'solid-quiz-range-question',
  templateUrl: './range-question.component.html',
  styleUrls: ['./range-question.component.scss'],
})
export class RangeQuestionComponent {
  @Input() public question!: QuizQuestion;
  @Output() public nextQuestionClicked = new EventEmitter<boolean>();

  public correct = false;
  public showAnswers!: boolean;
  public sliderPosition = 1;

  public onShowAnswersClick() {
    this.showAnswers = true;

    const tolerance = this.question.answers[0].tolerance;
    const value = this.question.answers[0].range_value;
    if (Math.abs(this.sliderPosition - value) <= tolerance) this.correct = true;
  }

  public onNextQuestionClick() {
    this.nextQuestionClicked.emit(this.correct);
  }
}
