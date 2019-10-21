import {Component} from '@angular/core';
import {Store} from "@ngxs/store";
import {QuizSession} from "../../state/quiz.model";
import {QuizSessionStart} from "../../state/quiz.actions";
import {QuizFeedback} from "./quiz-end-feedback";

@Component({
  selector: 'app-quiz-end',
  templateUrl: './quiz-end.component.html',
  styleUrls: ['./quiz-end.component.scss']
})
export class QuizEndComponent {
  QuizSession: QuizSession | null = null;
  QuestionCount = 10;
  FeedbackText = '';

  constructor(private _store: Store) {
    this._store.select(s => s.quiz.session).subscribe((session: QuizSession | null) => {
      if (session) {
        this.QuizSession = session;
        this.QuestionCount = session.questions.length;
        const correctQuestions = session.questions.map(q => q.answered).reduce((curr, val) => val === 1 ? curr + 1 : curr, 0 as number);
        const correctPercentage = correctQuestions / this.QuestionCount;
        let feedbacks: string[] = [];
        if (correctPercentage < 0.25) {
          feedbacks = QuizFeedback.lt25;
        } else if (correctPercentage < 0.5) {
          feedbacks = QuizFeedback.lt50;
        } else if (correctPercentage < 0.75) {
          feedbacks = QuizFeedback.lt75;
        } else if (correctPercentage === 1) {
          feedbacks = QuizFeedback.e100;
        } else {
          feedbacks = QuizFeedback.ge75;
        }
        this.FeedbackText = feedbacks[Math.floor(Math.random() * (feedbacks.length))];
        this.FeedbackText = this.FeedbackText.replace("{{Correct}}", correctQuestions.toString(10));
        this.FeedbackText = this.FeedbackText.replace("{{Count}}", this.QuestionCount.toString(10));
      }
    })
  }


  onStartClick() {
    this._store.dispatch(new QuizSessionStart(this.QuestionCount));
  }
}
