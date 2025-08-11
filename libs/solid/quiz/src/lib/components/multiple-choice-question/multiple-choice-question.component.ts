import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatLegacyCheckboxChange as MatCheckboxChange } from '@angular/material/legacy-checkbox';
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

    if (this.isFullyCorrect()) {
      this.correct = 1;
    } else if (this.isPartiallyCorrect()) {
      this.correct = -2;
    } else {
      this.correct = -1;
    }
  }

  public isFullyCorrect(): boolean {
    const correctIds = this.question.answers
      .filter((a) => a.correct)
      .map((a) => a.id)
      .sort();
    const selected = [...this.selectedAnswers].sort();
    return JSON.stringify(correctIds) === JSON.stringify(selected);
  }

  public isPartiallyCorrect(): boolean {
    const correctIds = this.question.answers
      .filter((a) => a.correct)
      .map((a) => a.id);
    const incorrectIds = this.question.answers
      .filter((a) => !a.correct)
      .map((a) => a.id);

    const selectedCorrect = this.selectedAnswers.filter((id) =>
      correctIds.includes(id),
    );
    const selectedIncorrect = this.selectedAnswers.filter((id) =>
      incorrectIds.includes(id),
    );

    return (
      selectedCorrect.length > 0 &&
      (selectedIncorrect.length > 0 ||
        selectedCorrect.length < correctIds.length)
    );
  }

  public isIncorrect(): boolean {
    return !this.isFullyCorrect() && !this.isPartiallyCorrect();
  }

  public getFeedbackResultLabel(): string {
    if (this.correct === 1) return 'Richtig,';
    if (this.correct === -2) return 'Teilweise richtig,';
    return 'Falsch,';
  }

  public onNextQuestionClick() {
    if (this.selectedAnswers.length == 0) this.correct = 0;
    this.nextQuestionClicked.emit(this.correct);
  }
}
