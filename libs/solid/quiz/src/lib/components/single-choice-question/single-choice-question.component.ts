import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { QuizAnswer, SingleChoiceQuestion } from '../../state/quiz.model';
import { QuestionTypeComponent } from '../question/question.component';

@Component({
  selector: 'solid-quiz-single-choice-question',
  templateUrl: './single-choice-question.component.html',
  styleUrls: ['./single-choice-question.component.scss'],
})
export class SingleChoiceQuestionComponent implements QuestionTypeComponent {
  @Input() question!: SingleChoiceQuestion;
  @Input() showAnswers = false;
  public selectedAnswers: number[] = [];

  public onRadioChange(e: MatRadioChange) {
    this.selectedAnswers = [e.value];
  }

  public trackByFn(index: number, item: QuizAnswer) {
    return item.id;
  }

  public isAnswerCorrect(answer: QuizAnswer) {
    if (!this.showAnswers) {
      return false;
    }
    return answer.correct;
  }

  public isAnswerIncorrect(answer: QuizAnswer) {
    if (!this.showAnswers) {
      return false;
    }
    return !answer.correct;
  }

  public validateAnswers(): boolean {
    let correct = true;
    this.question.answers.forEach((answer) => {
      if (answer.correct) {
        if (!this.selectedAnswers.includes(answer.id)) {
          correct = false;
        }
      }
    });
    return correct;
  }
}
