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
import { MatGridListModule } from '@angular/material/grid-list';

// This workaround is required for the "old" angular compiler in production mode. Ivy library publishing is not supported until angular 10.
// https://github.com/ng-packagr/ng-packagr/issues/767
export const ngxsFeatureModule = NgxsModule.forFeature([SlideshowState]);

@NgModule({
  declarations: [SlideshowComponent, SlideshowSelectComponent],
  imports: [
    SolidCoreModule,
    SolidSlideshowRoutingModule,
    ngxsFeatureModule,
    MatStepperModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class SolidSlideshowModule {}
