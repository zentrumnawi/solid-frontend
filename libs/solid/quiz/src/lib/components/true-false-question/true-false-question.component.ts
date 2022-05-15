import { Component, Input } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { QuizAnswer, QuizQuestion } from '../../state/quiz.model';

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
    this.SelectedAnswers = [e.value];
  }

  public trackByFn(index: number, item: QuizAnswer) {
    return item.id;
  }

  isAnswerCorrect(answer: QuizAnswer) {
    if (!this.ShowAnswers) {
      return false;
    }
    return answer.correct;
  }

  isAnswerIncorrect(answer: QuizAnswer) {
    if (!this.ShowAnswers) {
      return false;
    }
    return !answer.correct;
  }
}
