import {Component} from '@angular/core';
import {Store} from "@ngxs/store";
import {QuizQuestion} from "../../state/quiz.model";
import {Observable} from "rxjs";
import {QuizService} from "../../services/quiz.service";

@Component({
  selector: 'app-quiz-main-component',
  templateUrl: './quiz-main.component.html',
  styleUrls: ['./quiz-main.component.scss']
})
export class QuizMainComponent {
  public CurrentQuestion = 0;
  public Count: number;
  public Questions: Observable<QuizQuestion[]>;
  public Progress: number;

  constructor(
    service: QuizService,
    store: Store
  ) {
    service.loadQuestions();
    this.Count = Number.parseInt(store.selectSnapshot(state => state.router.state.params.count), 10);
    this.Questions = store.select(state => state.quiz.questions);
    this.Progress = this.getProgress();
  }

  getProgress() {
    return 100.0 / this.Count * this.CurrentQuestion;
  }

  onNextQuestion() {
    this.CurrentQuestion++;
    this.Progress = this.getProgress();
  }
}
