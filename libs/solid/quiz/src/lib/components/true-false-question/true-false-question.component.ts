import { Component, Input } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { QuizQuestion } from '../../state/quiz.model';

@Component({
  selector: 'solid-quiz-true-false-question',
  templateUrl: './true-false-question.component.html',
  styleUrls: ['./true-false-question.component.scss'],
})
export class TrueFalseQuestionComponent {
  @Input() public question!: QuizQuestion;
  @Input() public SelectedAnswers!: number[];
  @Input() public ShowAnswers!: boolean;

  public onRadioChange(e: MatRadioChange) {
    this.SelectedAnswers.push(e.value);
  }
}
