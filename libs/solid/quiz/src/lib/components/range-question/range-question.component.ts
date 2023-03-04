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
  public sliderPosition = this.question?.answers[0].range_min;

  public onShowAnswersClick() {
    this.showAnswers = true;

    const tolerance = this.question.answers[0].tolerance;
    const correctValue = this.question.answers[0].range_value;
    const max = this.question.answers[0].range_max;
    const min = this.question.answers[0].range_min;

    if (this.correct != -2) {
      if (Math.abs(this.sliderPosition - correctValue) <= tolerance)
        this.correct = 1;
    } else this.correct = 0;

    setTimeout(() => {
      const correctThumb = document.getElementById('correctThumb');
      const selectedThumb = document.getElementById('selectedThumb');
      const toleranceBar = document.getElementById('toleranceBar');
      const slider = document.getElementById('slider');

      if (slider && correctThumb && toleranceBar && selectedThumb) {
        const scalingFactor = (slider.offsetWidth - 14) / (max - min);
        const correctPos = (correctValue - min) * scalingFactor;
        const toleranceWidth = 2 * tolerance * scalingFactor;
        const selectedPos = (this.sliderPosition - min) * scalingFactor;

        correctThumb.style.left = correctPos - 10 + 'px';

        console.log(this.correct, this.sliderPosition - correctValue);

        if (this.correct === 1 && this.sliderPosition - correctValue !== 0) {
          toleranceBar.style.width = toleranceWidth + 'px';
          toleranceBar.style.left = correctPos - toleranceWidth / 2 + 'px';
        } else {
          toleranceBar.style.visibility = 'hidden';
        }

        if (this.correct === 0 || this.sliderPosition - correctValue === 0) {
          selectedThumb.style.visibility = 'hidden';
        } else {
          selectedThumb.style.left = selectedPos - 10 + 'px';
        }
      }
    }, 5);
  }

  onSliderChange(change: MatSliderChange) {
    this.correct = -1;
  }

  public onNextQuestionClick() {
    this.nextQuestionClicked.emit(this.correct);
  }
}
