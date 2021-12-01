import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  QuizAnswer,
  QuizQuestion,
  QuizQuestionType,
} from '../../state/quiz.model';
import { MatRadioChange } from '@angular/material/radio';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Store } from '@ngxs/store';
import { QuizQuestionAnswered } from '../../state/quiz.actions';

@Component({
  selector: 'solid-quiz-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnChanges {
  @Input() public question?: QuizQuestion;
  public QuestionTypes = QuizQuestionType;
  public SelectedAnswers: number[] = [];
  public ShowAnswers = false;
  public Correct?: boolean;
  public ImageIndex = 0;
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

  @Output() stopQuiz = new EventEmitter<boolean>();

  constructor(private _store: Store) {}

  public onRadioChange(e: MatRadioChange) {
    this.SelectedAnswers = [e.value];
  }

  public onShowAnswersClick() {
    this.ShowAnswers = true;
    if (this.question) {
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
  }

  public trackByFn(index: number, item: QuizAnswer) {
    return item.id;
  }

  onNextQuestionClick() {
    if (this.question && this.Correct !== undefined) {
      this._store.dispatch(new QuizQuestionAnswered(this.Correct));
    }
    this.ImageIndex = 0;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.question.previousValue !== changes.question.currentValue) {
      this.ShowAnswers = false;
      this.SelectedAnswers = [];
      this.Correct = undefined;
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
    return answer.correct; // && this.SelectedAnswers.includes(answer.id);
  }

  isAnswerIncorrect(answer: QuizAnswer) {
    if (!this.ShowAnswers) {
      return false;
    }
    return !answer.correct; // && this.SelectedAnswers.includes(answer.id);
  }

  swipe(
    currentIndex: number,
    imageLength: number,
    action: string = this.SWIPE_ACTION.RIGHT
  ) {
    if (currentIndex > imageLength || currentIndex < 0) {
      return;
    }
    if (action === this.SWIPE_ACTION.LEFT) {
      const isLast = currentIndex === imageLength - 1;
      this.ImageIndex = isLast ? 0 : currentIndex + 1;
    }
    if (action === this.SWIPE_ACTION.RIGHT) {
      const isFirst = currentIndex === 0;
      this.ImageIndex = isFirst ? imageLength - 1 : currentIndex - 1;
    }
  }

  onCloseClick() {
    this.stopQuiz.emit(true);
  }
}
