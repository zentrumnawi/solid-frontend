import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { StartComponent } from './components/start/start.component';
import { MainComponent } from './components/main/main.component';
import { QuestionComponent } from './components/question/question.component';
import { SingleChoiceQuestionComponent } from './components/single-choice-question/single-choice-question.component';
import { EndComponent } from './components/end/end.component';
import { NgxsModule } from '@ngxs/store';
import { QuizState } from './state/quiz.state';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { SolidCoreModule } from '@zentrumnawi/solid-core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSliderModule } from '@angular/material/slider';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

export const routes: Route[] = [
  { path: '', component: MainComponent, data: { title: 'Selbsttest' } },
];

// This workaround is required for the "old" angular compiler in production mode. Ivy library publishing is not supported until angular 10.
// https://github.com/ng-packagr/ng-packagr/issues/767
export const routerChildModule = RouterModule.forChild(routes);
export const ngxsFeatureModule = NgxsModule.forFeature([QuizState]);

@NgModule({
  declarations: [
    StartComponent,
    MainComponent,
    QuestionComponent,
    EndComponent,
    SingleChoiceQuestionComponent,
  ],
  imports: [
    SolidCoreModule,
    routerChildModule,
    ngxsFeatureModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatExpansionModule,
    MatSliderModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatListModule,
    MatSelectModule,
    MatDialogModule,
  ],
})
export class SolidQuizModule {}
