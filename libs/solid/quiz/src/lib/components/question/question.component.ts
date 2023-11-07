import {
  Component,
  EventEmitter,
  Input,
  Output,
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
export class QuestionComponent {
  @Input() public question!: QuizQuestion;
  @Output() stopQuiz = new EventEmitter<boolean>();

  public QuestionTypes = QuizQuestionType;
  public ImageIndex = 0;
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

  @Select(QuizState.getSession)
  QuizSession!: Observable<QuizSession | null>;

  @ViewChild('backPopup', { read: TemplateRef }) backPopup!: TemplateRef<any>;
  @ViewChild('skipPopup', { read: TemplateRef }) skipPopup!: TemplateRef<any>;

  constructor(
    private _store: Store,
    private dialog: MatDialog,
  ) {}

  onNextQuestionClicked(correct: number) {
    if (this.question) {
      this._store.dispatch(new QuizQuestionAnswered(correct));
    }
    this.ImageIndex = 0;
  }

  swipe(
    currentIndex: number,
    imageLength: number,
    action: string = this.SWIPE_ACTION.RIGHT,
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

  onChartBtnClick() {
    this.dialog.open(this.skipPopup, { panelClass: 'custom-dialog-container' });
  }

  onSkipToEnd() {
    this.stopQuiz.emit(true);
  }

  onBackBtnClick() {
    this.dialog.open(this.backPopup, { panelClass: 'custom-dialog-container' });
  }

  onBackToStart() {
    this._store.dispatch(new EndQuizSession());
  }

  getQuestionInfo(question: QuizQuestion): string {
    const tagsLength = question?.tags?.length;

    if (tagsLength > 0) {
      return `Tags: ${question?.tags.join(
        ' ',
      )} | Schwierigkeit: ${question?.difficulty}`;
    }

    return `Schwierigkeit: ${question?.difficulty}`;
  }
}
