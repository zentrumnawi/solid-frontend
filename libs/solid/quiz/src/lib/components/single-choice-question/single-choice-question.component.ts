import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { QuizAnswer, QuizQuestion } from '../../state/quiz.model';

@Component({
  selector: 'solid-quiz-single-choice-question',
  templateUrl: './single-choice-question.component.html',
  styleUrls: ['./single-choice-question.component.scss'],
})
export class SingleChoiceQuestionComponent implements OnChanges {
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

  public onRadioChange(e: MatRadioChange) {
    this.SelectedAnswers.push(e.value);
  }

  public trackByFn(index: number, item: QuizAnswer) {
    return item.id;
  }

  public isAnswerCorrect(answer: QuizAnswer) {
    if (!this.ShowAnswers) {
      return false;
    }
    return answer.correct;
  }

  public isAnswerIncorrect(answer: QuizAnswer) {
    if (!this.ShowAnswers) {
      return false;
    }
    return !answer.correct;
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
