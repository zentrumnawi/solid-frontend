import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { QuizQuestion } from '../state/quiz.model';
import { QuizQuestionsAdd } from '../state/quiz.actions';
import { SOLID_CORE_CONFIG, SolidCoreConfig } from '@zentrumnawi/solid/core';

@Injectable()
export class QuizService {
  constructor(
    @Inject(SOLID_CORE_CONFIG) private _config: SolidCoreConfig,
    private _store: Store,
    private _http: HttpClient
  ) {
  }

  public loadQuestions() {
    this._http.get<QuizQuestion[]>(`${this._config.apiUrl}/api/quizquestion`).subscribe(data => {
      this._store.dispatch(new QuizQuestionsAdd(data));
    });
  }
}
