import { Route, RouterModule } from '@angular/router';
import * as i0 from '@angular/core';
import * as i1 from './components/start/start.component';
import * as i2 from './components/main/main.component';
import * as i3 from './components/question/question.component';
import * as i4 from './components/end/end.component';
import * as i5 from './components/single-choice-question/single-choice-question.component';
import * as i6 from './components/multiple-choice-question/multiple-choice-question.component';
import * as i7 from './components/true-false-question/true-false-question.component';
import * as i8 from './components/ranking-question/ranking-question.component';
import * as i9 from './components/range-question/range-question.component';
import * as i10 from '@zentrumnawi/solid-core';
import * as i11 from '@angular/router';
import * as i12 from '@ngxs/store';
import * as i13 from '@angular/material/button';
import * as i14 from '@angular/material/card';
import * as i15 from '@angular/material/checkbox';
import * as i16 from '@angular/material/form-field';
import * as i17 from '@angular/material/input';
import * as i18 from '@angular/material/progress-bar';
import * as i19 from '@angular/material/radio';
import * as i20 from '@angular/material/progress-spinner';
import * as i21 from '@angular/material/icon';
import * as i22 from '@angular/material/expansion';
import * as i23 from '@angular/material/slider';
import * as i24 from '@angular/material/chips';
import * as i25 from '@angular/material/autocomplete';
import * as i26 from '@angular/material/list';
import * as i27 from '@angular/material/select';
import * as i28 from '@angular/material/dialog';
import * as i29 from '@angular/cdk/drag-drop';
import * as i30 from '@angular/material/button-toggle';
import * as i31 from '@angular/material/slide-toggle';
export declare const routes: Route[];
export declare const routerChildModule: import('@angular/core').ModuleWithProviders<RouterModule>;
export declare const ngxsFeatureModule: import('@angular/core').ModuleWithProviders<
  import('@ngxs/store').ɵNgxsFeatureModule
>;
export declare class SolidQuizModule {
  static ɵfac: i0.ɵɵFactoryDeclaration<SolidQuizModule, never>;
  static ɵmod: i0.ɵɵNgModuleDeclaration<
    SolidQuizModule,
    [
      typeof i1.StartComponent,
      typeof i2.MainComponent,
      typeof i3.QuestionComponent,
      typeof i4.EndComponent,
      typeof i5.SingleChoiceQuestionComponent,
      typeof i6.MultipleChoiceQuestionComponent,
      typeof i7.TrueFalseQuestionComponent,
      typeof i8.RankingQuestionComponent,
      typeof i9.RangeQuestionComponent
    ],
    [
      typeof i10.SolidCoreModule,
      typeof i11.RouterModule,
      typeof i12.ɵNgxsFeatureModule,
      typeof i13.MatButtonModule,
      typeof i14.MatCardModule,
      typeof i15.MatCheckboxModule,
      typeof i16.MatFormFieldModule,
      typeof i17.MatInputModule,
      typeof i18.MatProgressBarModule,
      typeof i19.MatRadioModule,
      typeof i20.MatProgressSpinnerModule,
      typeof i21.MatIconModule,
      typeof i22.MatExpansionModule,
      typeof i23.MatSliderModule,
      typeof i24.MatChipsModule,
      typeof i25.MatAutocompleteModule,
      typeof i26.MatListModule,
      typeof i27.MatSelectModule,
      typeof i28.MatDialogModule,
      typeof i29.DragDropModule,
      typeof i30.MatButtonToggleModule,
      typeof i31.MatSlideToggleModule
    ],
    never
  >;
  static ɵinj: i0.ɵɵInjectorDeclaration<SolidQuizModule>;
}
