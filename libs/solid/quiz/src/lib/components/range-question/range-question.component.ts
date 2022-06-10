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

  public onNextQuestionClick() {
    this.nextQuestionClicked.emit(this.correct);
  }
}
