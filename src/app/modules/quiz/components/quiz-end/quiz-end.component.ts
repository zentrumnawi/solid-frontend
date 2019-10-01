import {Component} from '@angular/core';
import {Store} from "@ngxs/store";
import {QuizSession} from "../../state/quiz.model";
import {QuizSessionStart} from "../../state/quiz.actions";

@Component({
  selector: 'app-quiz-end',
  templateUrl: './quiz-end.component.html',
  styleUrls: ['./quiz-end.component.scss']
})
export class QuizEndComponent {
  QuizSession: QuizSession | null = null;
  QuestionCount = 10;
  CorrectQuestions = 0;

  constructor(private _store: Store) {
    this._store.select(s => s.quiz.session).subscribe((session: QuizSession | null) => {
      if (session) {
        this.QuizSession = session;
        this.QuestionCount = session.questions.length;
        this.CorrectQuestions = session.questions.map(q => q.answered).reduce((curr, val) => val === 1 ? curr + 1 : curr, 0 as number)
      }
    })
  }


  onStartClick() {
    this._store.dispatch(new QuizSessionStart(this.QuestionCount));
  }
}
