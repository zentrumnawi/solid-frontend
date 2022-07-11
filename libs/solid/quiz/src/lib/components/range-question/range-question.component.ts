import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { QuizQuestion } from '../../state/quiz.model';

@Component({
  selector: 'solid-quiz-range-question',
  templateUrl: './range-question.component.html',
  styleUrls: ['./range-question.component.scss'],
})
export class RangeQuestionComponent {
  @Input() public question!: QuizQuestion;
  @Output() public nextQuestionClicked = new EventEmitter<number>();

  public correct = -2;
  public showAnswers!: boolean;
  public sliderPosition = 1;

  public onShowAnswersClick() {
    this.showAnswers = true;

    const tolerance = this.question.answers[0].tolerance;
    const value = this.question.answers[0].range_value;

    if (this.correct != -2) {
      if (Math.abs(this.sliderPosition - value) <= tolerance) this.correct = 1;
    }
    this.correct = 0;

    setTimeout(() => {
      const correctThumb = document.getElementById('correctThumb');
      const slider = document.getElementById('slider');

      if (slider && correctThumb) {
        const steps =
          this.question.answers[0].range_max /
            this.question.answers[0].range_step -
          1;
        const stepLength = slider.offsetWidth / steps;
        const correctPos =
          stepLength *
            (this.question.answers[0].range_value /
              this.question.answers[0].range_step -
              2) +
          20;
        correctThumb.style.left = correctPos + 'px';
      }
    }, 1);
  }

  onSliderChange(change: MatSliderChange) {
    this.correct = -1;
  }

  public onNextQuestionClick() {
    this.nextQuestionClicked.emit(this.correct);
  }
}
