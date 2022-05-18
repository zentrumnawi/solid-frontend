import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { QuizQuestion } from '../../state/quiz.model';

@Component({
  selector: 'solid-quiz-true-false-question',
  templateUrl: './true-false-question.component.html',
  styleUrls: ['./true-false-question.component.scss'],
})
export class TrueFalseQuestionComponent {
  @Input() public question!: QuizQuestion;
  @Output() public nextQuestionClicked = new EventEmitter<boolean>();

  public SelectedAnswer: boolean[] = [];
  public ShowAnswers = false;
  public Correct = false;

  public onRadioChange(e: MatRadioChange) {
    this.SelectedAnswer[0] = e.value == 'True' ? true : false;
  }

  public onShowAnswersClick() {
    this.ShowAnswers = true;
    if (this.SelectedAnswer[0] == this.question.answers[0].correct) {
      this.Correct = true;
    } else {
      this.Correct = false;
    }
  }

  public onNextQuestionClick() {
    this.nextQuestionClicked.emit(this.Correct);
  }
}
