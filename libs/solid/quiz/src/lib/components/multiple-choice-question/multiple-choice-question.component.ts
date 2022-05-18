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

  public SelectedAnswers: number[] = [];
  public ShowAnswers = false;
  public Correct = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.question.previousValue !== changes.question.currentValue) {
      this.ShowAnswers = false;
      this.SelectedAnswers = [];
      this.Correct = false;
    }
  }

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

  public onShowAnswersClick() {
    this.ShowAnswers = true;
    this.Correct = true;
    let correctAnswers = 0;
    this.question.answers.forEach((answer) => {
      if (answer.correct) {
        correctAnswers++;
        if (!this.SelectedAnswers.includes(answer.id)) {
          this.Correct = false;
        }
      }
    });
    if (this.SelectedAnswers.length !== correctAnswers) {
      this.Correct = false;
    }
  }

  public onNextQuestionClick() {
    this.nextQuestionClicked.emit(this.Correct);
  }
}
