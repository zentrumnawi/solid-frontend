import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ApiHttpClient} from '../../../shared/abstract/api-http-client';
import {Store} from "@ngxs/store";
import {QuizQuestion, QuizQuestionType} from "../state/quiz.model";
import {QuizQuestionsAdd} from "../state/quiz.actions";

@Injectable()
export class QuizService extends ApiHttpClient {
  constructor(
    private _store: Store,
    httpClient: HttpClient,
  ) {
    super(httpClient, ['api']);
  }

  public loadQuestions() {
    this.get<QuizQuestion[]>('quizquestion').subscribe(data => {
      data.forEach(d => d.qtype = QuizQuestionType.MultipleChoice);
      this._store.dispatch(new QuizQuestionsAdd(data));
    });
  }
}
