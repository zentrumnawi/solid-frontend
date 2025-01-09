import * as i0 from '@angular/core';
import * as i1 from './components/slideshow/slideshow.component';
import * as i2 from './components/slideshow-select/slideshow-select.component';
import * as i3 from './components/slideshow-base/slideshow-base.component';
import * as i4 from '@zentrumnawi/solid-core';
import * as i5 from '@angular/router';
import * as i6 from '@ngxs/store';
import * as i7 from '@angular/material/stepper';
import * as i8 from '@angular/material/icon';
import * as i9 from '@angular/material/card';
import * as i10 from '@angular/material/button';
import * as i11 from '@angular/material/progress-bar';
import * as i12 from '@angular/material/expansion';
export declare const ngxsFeatureModule: import('@angular/core').ModuleWithProviders<
  import('@ngxs/store').ɵNgxsFeatureModule
>;
export declare class SolidSlideshowModule {
  static ɵfac: i0.ɵɵFactoryDeclaration<SolidSlideshowModule, never>;
  static ɵmod: i0.ɵɵNgModuleDeclaration<
    SolidSlideshowModule,
    [
      typeof i1.SlideshowComponent,
      typeof i2.SlideshowSelectComponent,
      typeof i3.SlideshowBaseComponent
    ],
    [
      typeof i4.SolidCoreModule,
      typeof i5.RouterModule,
      typeof i6.ɵNgxsFeatureModule,
      typeof i7.MatStepperModule,
      typeof i8.MatIconModule,
      typeof i9.MatCardModule,
      typeof i10.MatButtonModule,
      typeof i11.MatProgressBarModule,
      typeof i12.MatExpansionModule
    ],
    never
  >;
  static ɵinj: i0.ɵɵInjectorDeclaration<SolidSlideshowModule>;
}
