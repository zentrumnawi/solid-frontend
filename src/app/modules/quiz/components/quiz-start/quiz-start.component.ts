import {Component} from '@angular/core';
import {Store} from "@ngxs/store";
import {Navigate} from "@ngxs/router-plugin";

@Component({
  selector: 'app-quiz-start',
  templateUrl: './quiz-start.component.html',
  styleUrls: ['./quiz-start.component.scss']
})
export class QuizStartComponent {
  constructor(
    private _store: Store
  ) {
  }

  public onStartClick() {
    this._store.dispatch(new Navigate(['/quiz/', 20],));
  }
}
