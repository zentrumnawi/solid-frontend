import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { QuizQuestion } from '../../state/quiz.model';

@Component({
  selector: 'solid-quiz-true-false-question',
  templateUrl: './true-false-question.component.html',
  styleUrls: ['./true-false-question.component.scss']
})
export class TrueFalseQuestionComponent implements OnChanges {
  @Input() public question!: QuizQuestion;
  @Output() public nextQuestionClicked = new EventEmitter<number>();

  public selectedAnswer!: boolean;
  public showAnswers = false;
  public correct = -1;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.question.previousValue !== changes.question.currentValue) {
      this.showAnswers = false;
      this.correct = -1;
    }
  }

  public onTrueClick() {
    this.selectedAnswer = true;
  }

  public onFalseClick() {
    this.selectedAnswer = false;
  }

  public onShowAnswersClick() {
    this.showAnswers = true;
    if (this.selectedAnswer == this.question.answers[0].correct) {
      this.correct = 1;
    } else {
      this.correct = -1;
    }
  }

  public onNextQuestionClick() {
    this.nextQuestionClicked.emit(this.correct);
  }
}
