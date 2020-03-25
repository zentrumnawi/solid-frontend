import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { QuizStartComponent } from './components/quiz-start/quiz-start.component';
import { QuizMainComponent } from './components/quiz-main/quiz-main.component';
import { QuizQuestionComponent } from './components/quiz-question/quiz-question.component';
import { QuizEndComponent } from './components/quiz-end/quiz-end.component';
import { NgxsModule } from '@ngxs/store';
import { QuizState } from './state/quiz.state';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { QuizService } from './services/quiz.service';
import { SolidCoreModule } from '@zentrumnawi/solid/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

export const routes: Route[] = [
  { path: '', component: QuizMainComponent, data: { title: 'Selbsttest' } }
];

@NgModule({
  declarations: [
    QuizStartComponent,
    QuizMainComponent,
    QuizQuestionComponent,
    QuizEndComponent
  ],
  imports: [
    SolidCoreModule,
    RouterModule.forChild(routes),
    NgxsModule.forFeature([
      QuizState
    ]),
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatRadioModule,
    MatProgressSpinnerModule
  ],
  providers: [
    QuizService
  ]
})
export class SolidQuizModule {
}
