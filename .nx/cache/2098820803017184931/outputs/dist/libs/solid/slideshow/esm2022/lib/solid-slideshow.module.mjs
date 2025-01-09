import { NgModule } from '@angular/core';
import { SolidCoreModule } from '@zentrumnawi/solid-core';
import { SlideshowComponent } from './components/slideshow/slideshow.component';
import { SolidSlideshowRoutingModule } from './solid-slideshow-routing.module';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgxsModule } from '@ngxs/store';
import { SlideshowState } from './state/slideshow.state';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { SlideshowSelectComponent } from './components/slideshow-select/slideshow-select.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { CategoriesState } from './state/categories.state';
import { SlideshowSelectState } from './state/slideshow-select.state';
import { SlideshowBaseComponent } from './components/slideshow-base/slideshow-base.component';
import * as i0 from '@angular/core';
import * as i1 from '@angular/router';
import * as i2 from '@ngxs/store';
// This workaround is required for the "old" angular compiler in production mode. Ivy library publishing is not supported until angular 10.
// https://github.com/ng-packagr/ng-packagr/issues/767
export const ngxsFeatureModule = NgxsModule.forFeature([
  SlideshowState,
  CategoriesState,
  SlideshowSelectState,
]);
export class SolidSlideshowModule {
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: SolidSlideshowModule,
    deps: [],
    target: i0.ɵɵFactoryTarget.NgModule,
  });
  static ɵmod = i0.ɵɵngDeclareNgModule({
    minVersion: '14.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: SolidSlideshowModule,
    declarations: [
      SlideshowComponent,
      SlideshowSelectComponent,
      SlideshowBaseComponent,
    ],
    imports: [
      SolidCoreModule,
      i1.RouterModule,
      i2.ɵNgxsFeatureModule,
      MatStepperModule,
      MatIconModule,
      MatCardModule,
      MatButtonModule,
      MatProgressBarModule,
      MatExpansionModule,
    ],
  });
  static ɵinj = i0.ɵɵngDeclareInjector({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: SolidSlideshowModule,
    providers: [
      {
        provide: STEPPER_GLOBAL_OPTIONS,
        useValue: { displayDefaultIndicatorType: false },
      },
    ],
    imports: [
      SolidCoreModule,
      SolidSlideshowRoutingModule,
      ngxsFeatureModule,
      MatStepperModule,
      MatIconModule,
      MatCardModule,
      MatButtonModule,
      MatProgressBarModule,
      MatExpansionModule,
    ],
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: SolidSlideshowModule,
  decorators: [
    {
      type: NgModule,
      args: [
        {
          declarations: [
            SlideshowComponent,
            SlideshowSelectComponent,
            SlideshowBaseComponent,
          ],
          imports: [
            SolidCoreModule,
            SolidSlideshowRoutingModule,
            ngxsFeatureModule,
            MatStepperModule,
            MatIconModule,
            MatCardModule,
            MatButtonModule,
            MatProgressBarModule,
            MatExpansionModule,
          ],
          providers: [
            {
              provide: STEPPER_GLOBAL_OPTIONS,
              useValue: { displayDefaultIndicatorType: false },
            },
          ],
        },
      ],
    },
  ],
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29saWQtc2xpZGVzaG93Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc29saWQvc2xpZGVzaG93L3NyYy9saWIvc29saWQtc2xpZGVzaG93Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNoRixPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUMvRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwwREFBMEQsQ0FBQztBQUNwRyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0QsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDdEUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sc0RBQXNELENBQUM7Ozs7QUFFOUYsMklBQTJJO0FBQzNJLHNEQUFzRDtBQUN0RCxNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDO0lBQ3JELGNBQWM7SUFDZCxlQUFlO0lBQ2Ysb0JBQW9CO0NBQ3JCLENBQUMsQ0FBQztBQTBCSCxNQUFNLE9BQU8sb0JBQW9CO3VHQUFwQixvQkFBb0I7d0dBQXBCLG9CQUFvQixpQkF0QjdCLGtCQUFrQjtZQUNsQix3QkFBd0I7WUFDeEIsc0JBQXNCLGFBR3RCLGVBQWUsMENBR2YsZ0JBQWdCO1lBQ2hCLGFBQWE7WUFDYixhQUFhO1lBQ2IsZUFBZTtZQUNmLG9CQUFvQjtZQUNwQixrQkFBa0I7d0dBU1Qsb0JBQW9CLGFBUHBCO1lBQ1Q7Z0JBQ0UsT0FBTyxFQUFFLHNCQUFzQjtnQkFDL0IsUUFBUSxFQUFFLEVBQUUsMkJBQTJCLEVBQUUsS0FBSyxFQUFFO2FBQ2pEO1NBQ0YsWUFmQyxlQUFlO1lBQ2YsMkJBQTJCO1lBQzNCLGlCQUFpQjtZQUNqQixnQkFBZ0I7WUFDaEIsYUFBYTtZQUNiLGFBQWE7WUFDYixlQUFlO1lBQ2Ysb0JBQW9CO1lBQ3BCLGtCQUFrQjs7MkZBU1Qsb0JBQW9CO2tCQXhCaEMsUUFBUTttQkFBQztvQkFDUixZQUFZLEVBQUU7d0JBQ1osa0JBQWtCO3dCQUNsQix3QkFBd0I7d0JBQ3hCLHNCQUFzQjtxQkFDdkI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLGVBQWU7d0JBQ2YsMkJBQTJCO3dCQUMzQixpQkFBaUI7d0JBQ2pCLGdCQUFnQjt3QkFDaEIsYUFBYTt3QkFDYixhQUFhO3dCQUNiLGVBQWU7d0JBQ2Ysb0JBQW9CO3dCQUNwQixrQkFBa0I7cUJBQ25CO29CQUNELFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsc0JBQXNCOzRCQUMvQixRQUFRLEVBQUUsRUFBRSwyQkFBMkIsRUFBRSxLQUFLLEVBQUU7eUJBQ2pEO3FCQUNGO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU29saWRDb3JlTW9kdWxlIH0gZnJvbSAnQHplbnRydW1uYXdpL3NvbGlkLWNvcmUnO1xyXG5pbXBvcnQgeyBTbGlkZXNob3dDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc2xpZGVzaG93L3NsaWRlc2hvdy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTb2xpZFNsaWRlc2hvd1JvdXRpbmdNb2R1bGUgfSBmcm9tICcuL3NvbGlkLXNsaWRlc2hvdy1yb3V0aW5nLm1vZHVsZSc7XHJcbmltcG9ydCB7IE1hdFN0ZXBwZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zdGVwcGVyJztcclxuaW1wb3J0IHsgTWF0SWNvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2ljb24nO1xyXG5pbXBvcnQgeyBNYXRDYXJkTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY2FyZCc7XHJcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbic7XHJcbmltcG9ydCB7IE5neHNNb2R1bGUgfSBmcm9tICdAbmd4cy9zdG9yZSc7XHJcbmltcG9ydCB7IFNsaWRlc2hvd1N0YXRlIH0gZnJvbSAnLi9zdGF0ZS9zbGlkZXNob3cuc3RhdGUnO1xyXG5pbXBvcnQgeyBTVEVQUEVSX0dMT0JBTF9PUFRJT05TIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3N0ZXBwZXInO1xyXG5pbXBvcnQgeyBTbGlkZXNob3dTZWxlY3RDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc2xpZGVzaG93LXNlbGVjdC9zbGlkZXNob3ctc2VsZWN0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE1hdFByb2dyZXNzQmFyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvcHJvZ3Jlc3MtYmFyJztcclxuaW1wb3J0IHsgTWF0RXhwYW5zaW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZXhwYW5zaW9uJztcclxuaW1wb3J0IHsgQ2F0ZWdvcmllc1N0YXRlIH0gZnJvbSAnLi9zdGF0ZS9jYXRlZ29yaWVzLnN0YXRlJztcclxuaW1wb3J0IHsgU2xpZGVzaG93U2VsZWN0U3RhdGUgfSBmcm9tICcuL3N0YXRlL3NsaWRlc2hvdy1zZWxlY3Quc3RhdGUnO1xyXG5pbXBvcnQgeyBTbGlkZXNob3dCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3NsaWRlc2hvdy1iYXNlL3NsaWRlc2hvdy1iYXNlLmNvbXBvbmVudCc7XHJcblxyXG4vLyBUaGlzIHdvcmthcm91bmQgaXMgcmVxdWlyZWQgZm9yIHRoZSBcIm9sZFwiIGFuZ3VsYXIgY29tcGlsZXIgaW4gcHJvZHVjdGlvbiBtb2RlLiBJdnkgbGlicmFyeSBwdWJsaXNoaW5nIGlzIG5vdCBzdXBwb3J0ZWQgdW50aWwgYW5ndWxhciAxMC5cclxuLy8gaHR0cHM6Ly9naXRodWIuY29tL25nLXBhY2thZ3IvbmctcGFja2Fnci9pc3N1ZXMvNzY3XHJcbmV4cG9ydCBjb25zdCBuZ3hzRmVhdHVyZU1vZHVsZSA9IE5neHNNb2R1bGUuZm9yRmVhdHVyZShbXHJcbiAgU2xpZGVzaG93U3RhdGUsXHJcbiAgQ2F0ZWdvcmllc1N0YXRlLFxyXG4gIFNsaWRlc2hvd1NlbGVjdFN0YXRlLFxyXG5dKTtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBTbGlkZXNob3dDb21wb25lbnQsXHJcbiAgICBTbGlkZXNob3dTZWxlY3RDb21wb25lbnQsXHJcbiAgICBTbGlkZXNob3dCYXNlQ29tcG9uZW50LFxyXG4gIF0sXHJcbiAgaW1wb3J0czogW1xyXG4gICAgU29saWRDb3JlTW9kdWxlLFxyXG4gICAgU29saWRTbGlkZXNob3dSb3V0aW5nTW9kdWxlLFxyXG4gICAgbmd4c0ZlYXR1cmVNb2R1bGUsXHJcbiAgICBNYXRTdGVwcGVyTW9kdWxlLFxyXG4gICAgTWF0SWNvbk1vZHVsZSxcclxuICAgIE1hdENhcmRNb2R1bGUsXHJcbiAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICBNYXRQcm9ncmVzc0Jhck1vZHVsZSxcclxuICAgIE1hdEV4cGFuc2lvbk1vZHVsZSxcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAge1xyXG4gICAgICBwcm92aWRlOiBTVEVQUEVSX0dMT0JBTF9PUFRJT05TLFxyXG4gICAgICB1c2VWYWx1ZTogeyBkaXNwbGF5RGVmYXVsdEluZGljYXRvclR5cGU6IGZhbHNlIH0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTb2xpZFNsaWRlc2hvd01vZHVsZSB7fVxyXG4iXX0=
