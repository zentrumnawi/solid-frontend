import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  QuizAnswer,
  QuizQuestions,
  QuizQuestionType,
} from '../../state/quiz.model';
import { Store } from '@ngxs/store';
import { QuizActions } from '../../state/quiz.actions';

export interface QuestionTypeComponent {
  question: QuizQuestions;
  showAnswers: boolean;
  validateAnswers: () => boolean;
}

@Component({
  selector: 'solid-quiz-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnChanges {
  @ViewChild('questionComponent', { static: false })
  questionComponent?: QuestionTypeComponent;
  @Input() public question?: QuizQuestions;
  public QuestionTypes = QuizQuestionType;
  public showAnswers = false;
  public correct?: boolean;

  constructor(private _store: Store) {}

  public onShowAnswersClick() {
    if (this.questionComponent) {
      this.showAnswers = true;
      this.correct = this.questionComponent.validateAnswers();
    }
  }

  onNextQuestionClick() {
    if (this.question && this.correct !== undefined) {
      this._store.dispatch(new QuizActions.QuestionAnswered(this.correct));
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.question.previousValue !== changes.question.currentValue) {
      this.showAnswers = false;
      this.correct = undefined;
    }
  }
}
