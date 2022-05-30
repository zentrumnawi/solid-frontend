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
  @Output() public nextQuestionClicked = new EventEmitter<boolean>();

  public selectedAnswers: number[] = [];
  public showAnswers = false;
  public correct = false;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.question.previousValue !== changes.question.currentValue) {
      this.showAnswers = false;
      this.selectedAnswers = [];
      this.correct = false;
    }
  }

  public onSelectChange(e: MatCheckboxChange, answer: QuizAnswer) {
    if (e.checked) {
      this.selectedAnswers.push(answer.id);
    } else {
      this.selectedAnswers = this.selectedAnswers.filter(
        (id) => id !== answer.id
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
    this.correct = true;

    let correctAnswers = 0;
    this.question.answers.forEach((answer) => {
      if (answer.correct) {
        correctAnswers++;
        if (!this.selectedAnswers.includes(answer.id)) {
          this.correct = false;
        }
      }
    });

    if (this.selectedAnswers.length !== correctAnswers) {
      this.correct = false;
    }
  }

  public onNextQuestionClick() {
    this.nextQuestionClicked.emit(this.correct);
  }
}
