import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StartComponent } from './components/start/start.component';
import { MainComponent } from './components/main/main.component';
import { QuestionComponent } from './components/question/question.component';
import { SingleChoiceQuestionComponent } from './components/single-choice-question/single-choice-question.component';
import { MultipleChoiceQuestionComponent } from './components/multiple-choice-question/multiple-choice-question.component';
import { TrueFalseQuestionComponent } from './components/true-false-question/true-false-question.component';
import { RankingQuestionComponent } from './components/ranking-question/ranking-question.component';
import { RangeQuestionComponent } from './components/range-question/range-question.component';
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
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import * as i0 from '@angular/core';
import * as i1 from '@angular/router';
import * as i2 from '@ngxs/store';
export const routes = [
  { path: '', component: MainComponent, data: { title: 'Selbsttest' } },
];
// This workaround is required for the "old" angular compiler in production mode. Ivy library publishing is not supported until angular 10.
// https://github.com/ng-packagr/ng-packagr/issues/767
export const routerChildModule = RouterModule.forChild(routes);
export const ngxsFeatureModule = NgxsModule.forFeature([QuizState]);
export class SolidQuizModule {
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: SolidQuizModule,
    deps: [],
    target: i0.ɵɵFactoryTarget.NgModule,
  });
  static ɵmod = i0.ɵɵngDeclareNgModule({
    minVersion: '14.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: SolidQuizModule,
    declarations: [
      StartComponent,
      MainComponent,
      QuestionComponent,
      EndComponent,
      SingleChoiceQuestionComponent,
      MultipleChoiceQuestionComponent,
      TrueFalseQuestionComponent,
      RankingQuestionComponent,
      RangeQuestionComponent,
    ],
    imports: [
      SolidCoreModule,
      i1.RouterModule,
      i2.ɵNgxsFeatureModule,
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
      DragDropModule,
      MatButtonToggleModule,
      MatSlideToggleModule,
    ],
  });
  static ɵinj = i0.ɵɵngDeclareInjector({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: SolidQuizModule,
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
      DragDropModule,
      MatButtonToggleModule,
      MatSlideToggleModule,
    ],
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: SolidQuizModule,
  decorators: [
    {
      type: NgModule,
      args: [
        {
          declarations: [
            StartComponent,
            MainComponent,
            QuestionComponent,
            EndComponent,
            SingleChoiceQuestionComponent,
            MultipleChoiceQuestionComponent,
            TrueFalseQuestionComponent,
            RankingQuestionComponent,
            RangeQuestionComponent,
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
            DragDropModule,
            MatButtonToggleModule,
            MatSlideToggleModule,
          ],
        },
      ],
    },
  ],
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29saWQtcXVpei5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NvbGlkL3F1aXovc3JjL2xpYi9zb2xpZC1xdWl6Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBUyxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDcEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLHNFQUFzRSxDQUFDO0FBQ3JILE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLDBFQUEwRSxDQUFDO0FBQzNILE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGdFQUFnRSxDQUFDO0FBQzVHLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDBEQUEwRCxDQUFDO0FBQ3BHLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBQzlGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM5RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDekQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHlCQUF5QixDQUFD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QUN4QixzQkFBc0I7cUJBQ3ZCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxlQUFlO3dCQUNmLGlCQUFpQjt3QkFDakIsaUJBQWlCO3dCQUNqQixlQUFlO3dCQUNmLGFBQWE7d0JBQ2IsaUJBQWlCO3dCQUNqQixrQkFBa0I7d0JBQ2xCLGNBQWM7d0JBQ2Qsb0JBQW9CO3dCQUNwQixjQUFjO3dCQUNkLHdCQUF3Qjt3QkFDeEIsYUFBYTt3QkFDYixrQkFBa0I7d0JBQ2xCLGVBQWU7d0JBQ2YsY0FBYzt3QkFDZCxxQkFBcUI7d0JBQ3JCLGFBQWE7d0JBQ2IsZUFBZTt3QkFDZixlQUFlO3dCQUNmLGNBQWM7d0JBQ2QscUJBQXFCO3dCQUNyQixvQkFBb0I7cUJBQ3JCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGUsIFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFN0YXJ0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3N0YXJ0L3N0YXJ0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE1haW5Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbWFpbi9tYWluLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFF1ZXN0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3F1ZXN0aW9uL3F1ZXN0aW9uLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFNpbmdsZUNob2ljZVF1ZXN0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3NpbmdsZS1jaG9pY2UtcXVlc3Rpb24vc2luZ2xlLWNob2ljZS1xdWVzdGlvbi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNdWx0aXBsZUNob2ljZVF1ZXN0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL211bHRpcGxlLWNob2ljZS1xdWVzdGlvbi9tdWx0aXBsZS1jaG9pY2UtcXVlc3Rpb24uY29tcG9uZW50JztcclxuaW1wb3J0IHsgVHJ1ZUZhbHNlUXVlc3Rpb25Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdHJ1ZS1mYWxzZS1xdWVzdGlvbi90cnVlLWZhbHNlLXF1ZXN0aW9uLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFJhbmtpbmdRdWVzdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9yYW5raW5nLXF1ZXN0aW9uL3JhbmtpbmctcXVlc3Rpb24uY29tcG9uZW50JztcclxuaW1wb3J0IHsgUmFuZ2VRdWVzdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9yYW5nZS1xdWVzdGlvbi9yYW5nZS1xdWVzdGlvbi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBFbmRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZW5kL2VuZC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBOZ3hzTW9kdWxlIH0gZnJvbSAnQG5neHMvc3RvcmUnO1xyXG5pbXBvcnQgeyBRdWl6U3RhdGUgfSBmcm9tICcuL3N0YXRlL3F1aXouc3RhdGUnO1xyXG5pbXBvcnQgeyBNYXRDaGVja2JveE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NoZWNrYm94JztcclxuaW1wb3J0IHsgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9wcm9ncmVzcy1iYXInO1xyXG5pbXBvcnQgeyBNYXRSYWRpb01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3JhZGlvJztcclxuaW1wb3J0IHsgU29saWRDb3JlTW9kdWxlIH0gZnJvbSAnQHplbnRydW1uYXdpL3NvbGlkLWNvcmUnO1xyXG5pbXBvcnQgeyBNYXRDYXJkTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY2FyZCc7XHJcbmltcG9ydCB7IE1hdEZvcm1GaWVsZE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2Zvcm0tZmllbGQnO1xyXG5pbXBvcnQgeyBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9wcm9ncmVzcy1zcGlubmVyJztcclxuaW1wb3J0IHsgTWF0SW5wdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pbnB1dCc7XHJcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbic7XHJcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pY29uJztcclxuaW1wb3J0IHsgTWF0RXhwYW5zaW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZXhwYW5zaW9uJztcclxuaW1wb3J0IHsgTWF0U2xpZGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2xpZGVyJztcclxuaW1wb3J0IHsgTWF0Q2hpcHNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jaGlwcyc7XHJcbmltcG9ydCB7IE1hdEF1dG9jb21wbGV0ZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2F1dG9jb21wbGV0ZSc7XHJcbmltcG9ydCB7IE1hdExpc3RNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9saXN0JztcclxuaW1wb3J0IHsgTWF0U2VsZWN0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2VsZWN0JztcclxuaW1wb3J0IHsgTWF0RGlhbG9nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcclxuaW1wb3J0IHsgRHJhZ0Ryb3BNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcclxuaW1wb3J0IHsgTWF0QnV0dG9uVG9nZ2xlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uLXRvZ2dsZSc7XHJcbmltcG9ydCB7IE1hdFNsaWRlVG9nZ2xlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2xpZGUtdG9nZ2xlJztcclxuXHJcbmV4cG9ydCBjb25zdCByb3V0ZXM6IFJvdXRlW10gPSBbXHJcbiAgeyBwYXRoOiAnJywgY29tcG9uZW50OiBNYWluQ29tcG9uZW50LCBkYXRhOiB7IHRpdGxlOiAnU2VsYnN0dGVzdCcgfSB9LFxyXG5dO1xyXG5cclxuLy8gVGhpcyB3b3JrYXJvdW5kIGlzIHJlcXVpcmVkIGZvciB0aGUgXCJvbGRcIiBhbmd1bGFyIGNvbXBpbGVyIGluIHByb2R1Y3Rpb24gbW9kZS4gSXZ5IGxpYnJhcnkgcHVibGlzaGluZyBpcyBub3Qgc3VwcG9ydGVkIHVudGlsIGFuZ3VsYXIgMTAuXHJcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9uZy1wYWNrYWdyL25nLXBhY2thZ3IvaXNzdWVzLzc2N1xyXG5leHBvcnQgY29uc3Qgcm91dGVyQ2hpbGRNb2R1bGUgPSBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVzKTtcclxuZXhwb3J0IGNvbnN0IG5neHNGZWF0dXJlTW9kdWxlID0gTmd4c01vZHVsZS5mb3JGZWF0dXJlKFtRdWl6U3RhdGVdKTtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBTdGFydENvbXBvbmVudCxcclxuICAgIE1haW5Db21wb25lbnQsXHJcbiAgICBRdWVzdGlvbkNvbXBvbmVudCxcclxuICAgIEVuZENvbXBvbmVudCxcclxuICAgIFNpbmdsZUNob2ljZVF1ZXN0aW9uQ29tcG9uZW50LFxyXG4gICAgTXVsdGlwbGVDaG9pY2VRdWVzdGlvbkNvbXBvbmVudCxcclxuICAgIFRydWVGYWxzZVF1ZXN0aW9uQ29tcG9uZW50LFxyXG4gICAgUmFua2luZ1F1ZXN0aW9uQ29tcG9uZW50LFxyXG4gICAgUmFuZ2VRdWVzdGlvbkNvbXBvbmVudCxcclxuICBdLFxyXG4gIGltcG9ydHM6IFtcclxuICAgIFNvbGlkQ29yZU1vZHVsZSxcclxuICAgIHJvdXRlckNoaWxkTW9kdWxlLFxyXG4gICAgbmd4c0ZlYXR1cmVNb2R1bGUsXHJcbiAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICBNYXRDYXJkTW9kdWxlLFxyXG4gICAgTWF0Q2hlY2tib3hNb2R1bGUsXHJcbiAgICBNYXRGb3JtRmllbGRNb2R1bGUsXHJcbiAgICBNYXRJbnB1dE1vZHVsZSxcclxuICAgIE1hdFByb2dyZXNzQmFyTW9kdWxlLFxyXG4gICAgTWF0UmFkaW9Nb2R1bGUsXHJcbiAgICBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUsXHJcbiAgICBNYXRJY29uTW9kdWxlLFxyXG4gICAgTWF0RXhwYW5zaW9uTW9kdWxlLFxyXG4gICAgTWF0U2xpZGVyTW9kdWxlLFxyXG4gICAgTWF0Q2hpcHNNb2R1bGUsXHJcbiAgICBNYXRBdXRvY29tcGxldGVNb2R1bGUsXHJcbiAgICBNYXRMaXN0TW9kdWxlLFxyXG4gICAgTWF0U2VsZWN0TW9kdWxlLFxyXG4gICAgTWF0RGlhbG9nTW9kdWxlLFxyXG4gICAgRHJhZ0Ryb3BNb2R1bGUsXHJcbiAgICBNYXRCdXR0b25Ub2dnbGVNb2R1bGUsXHJcbiAgICBNYXRTbGlkZVRvZ2dsZU1vZHVsZSxcclxuICBdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgU29saWRRdWl6TW9kdWxlIHt9XHJcbiJdfQ==
