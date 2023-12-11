import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { QuizAnswer, QuizQuestion } from '../../state/quiz.model';

@Component({
  selector: 'solid-quiz-multiple-choice-question',
  templateUrl: './multiple-choice-question.component.html',
  styleUrls: ['./multiple-choice-question.component.scss'],
})
export class MultipleChoiceQuestionComponent implements OnChanges {
  @Input() public question!: QuizQuestion;
  @Output() public nextQuestionClicked = new EventEmitter<number>();

  public selectedAnswers: number[] = [];
  public showAnswers = false;
  public correct = 0;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.question.previousValue !== changes.question.currentValue) {
      this.showAnswers = false;
      this.selectedAnswers = [];
      this.correct = 0;
    }
  }

  public onSelectChange(e: MatCheckboxChange, answer: QuizAnswer) {
    if (e.checked) {
      this.selectedAnswers.push(answer.id);
    } else {
      this.selectedAnswers = this.selectedAnswers.filter(
        (id) => id !== answer.id,
      );
    }
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

  public trackByFn(index: number, item: QuizAnswer) {
    return item.id;
  }

  public onShowAnswersClick() {
    this.showAnswers = true;
    this.correct = 1;

    let correctAnswers = 0;
    this.question.answers.forEach((answer) => {
      if (answer.correct) {
        correctAnswers++;
        if (!this.selectedAnswers.includes(answer.id)) {
          this.correct = -1;
        }
      }
    });

    if (this.selectedAnswers.length !== correctAnswers) {
      this.correct = -1;
    }
  }

  public onNextQuestionClick() {
    if (this.selectedAnswers.length == 0) this.correct = 0;
    this.nextQuestionClicked.emit(this.correct);
  }
}
