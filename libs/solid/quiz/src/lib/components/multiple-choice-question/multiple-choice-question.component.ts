import { Component, Input } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { QuizAnswer, QuizQuestion } from '../../state/quiz.model';

@Component({
  selector: 'solid-quiz-multiple-choice-question',
  templateUrl: './multiple-choice-question.component.html',
  styleUrls: ['./multiple-choice-question.component.scss'],
})
export class MultipleChoiceQuestionComponent {
  @Input() public question!: QuizQuestion;
  @Input() public SelectedAnswers!: number[];
  @Input() public ShowAnswers!: boolean;

  onSelectChange(e: MatCheckboxChange, answer: QuizAnswer) {
    if (e.checked) {
      this.SelectedAnswers.push(answer.id);
    } else {
      this.SelectedAnswers = this.SelectedAnswers.filter(
        (id) => id !== answer.id
      );
    }
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

  public trackByFn(index: number, item: QuizAnswer) {
    return item.id;
  }
}
