import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  QuizQuestion,
  QuizQuestionType,
  QuizSession,
} from '../../state/quiz.model';
import { Select, Store } from '@ngxs/store';
import { EndQuizSession, QuizQuestionAnswered } from '../../state/quiz.actions';
import { QuizState } from '../../state/quiz.state';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'solid-quiz-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnChanges {
  @Input() public question!: QuizQuestion;
  public QuestionTypes = QuizQuestionType;
  public SelectedAnswers: number[] = [];
  public ShowAnswers = false;
  public Correct?: boolean;
  public ImageIndex = 0;
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

  @Select(QuizState.getSession)
  QuizSession!: Observable<QuizSession | null>;

  @ViewChild('backPopup', { read: TemplateRef }) backPopup!: TemplateRef<any>;

  @Output() stopQuiz = new EventEmitter<boolean>();

  constructor(private _store: Store, private dialog: MatDialog) {}

  onShowAnswersClick() {
    this.ShowAnswers = true;
    if (this.question.type == 'SC' || this.question.type == 'MC') {
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
    } else if (this.question.type == 'TF') {
      const answer = this.SelectedAnswers[0] == 1 ? true : false;
      if (answer && this.question.answers[0].correct) {
        this.Correct = true;
      } else {
        this.Correct = false;
      }
    }
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

  onBackBtnClick() {
    this.dialog.open(this.backPopup, { panelClass: 'custom-dialog-container' });
  }

  onBackToStart() {
    this._store.dispatch(new EndQuizSession());
  }
}
