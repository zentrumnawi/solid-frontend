import {NgModule} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {QuizRoutingModule} from "./quiz-routing.module";
import {QuizStartComponent} from './components/quiz-start/quiz-start.component';
import {QuizMainComponent} from './components/quiz-main/quiz-main.component';
import {QuizQuestionComponent} from './components/quiz-question/quiz-question.component';
import {QuizService} from "./services/quiz.service";
import {NgxsModule} from "@ngxs/store";
import {QuizState} from "./state/quiz.state";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";

@NgModule({
  declarations: [
    QuizStartComponent,
    QuizMainComponent,
    QuizQuestionComponent
  ],
  imports: [
    SharedModule,
    QuizRoutingModule,
    NgxsModule.forFeature([
      QuizState,
    ]),
    MatCheckboxModule,
    MatProgressBarModule,
    MatRadioModule,
  ],
  providers: [
    QuizService,
  ]
})
export class QuizModule {
}

