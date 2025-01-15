import { NgModule } from '@angular/core';
import { SolidCoreModule } from '@zentrumnawi/solid-core';
import { SlideshowComponent } from './components/slideshow/slideshow.component';
import { SolidSlideshowRoutingModule } from './solid-slideshow-routing.module';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { NgxsModule } from '@ngxs/store';
import { SlideshowState } from './state/slideshow.state';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { SlideshowSelectComponent } from './components/slideshow-select/slideshow-select.component';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { CategoriesState } from './state/categories.state';
import { SlideshowSelectState } from './state/slideshow-select.state';
import { SlideshowBaseComponent } from './components/slideshow-base/slideshow-base.component';

// This workaround is required for the "old" angular compiler in production mode. Ivy library publishing is not supported until angular 10.
// https://github.com/ng-packagr/ng-packagr/issues/767
export const ngxsFeatureModule = NgxsModule.forFeature([
  SlideshowState,
  CategoriesState,
  SlideshowSelectState,
]);

@NgModule({
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
})
export class SolidSlideshowModule {}
