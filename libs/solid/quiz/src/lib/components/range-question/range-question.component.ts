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

    if (!this.correct) {
      const correctTick = document.getElementById('correctTick');
      const slider = document.getElementById('slider');

      if (correctTick && slider) {
        const steps =
          this.question.answers[0].range_max /
            this.question.answers[0].range_step -
          1;
        const stepLength =
          slider?.offsetWidth / this.question.answers[0].range_max;
        const correctPos = stepLength * this.question.answers[0].range_value;
        correctTick.style.left = correctPos + 'px';
      }
    }
  }

  public onNextQuestionClick() {
    this.nextQuestionClicked.emit(this.correct);
  }
}
