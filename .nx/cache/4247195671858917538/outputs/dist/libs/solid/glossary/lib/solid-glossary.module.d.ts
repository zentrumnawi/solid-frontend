import * as i0 from '@angular/core';
import * as i1 from './components/glossary.component';
import * as i2 from './components/link.directive';
import * as i3 from '@zentrumnawi/solid-core';
import * as i4 from '@angular/material/list';
import * as i5 from '@ngxs/store';
import * as i6 from '@angular/material/input';
import * as i7 from '@angular/material/icon';
import * as i8 from '@angular/material/button';
export declare const ngxsFeatureModule: import('@angular/core').ModuleWithProviders<
  import('@ngxs/store').ɵNgxsFeatureModule
>;
export declare class SolidGlossaryModule {
  static ɵfac: i0.ɵɵFactoryDeclaration<SolidGlossaryModule, never>;
  static ɵmod: i0.ɵɵNgModuleDeclaration<
    SolidGlossaryModule,
    [typeof i1.GlossaryComponent, typeof i2.RefDirective],
    [
      typeof i3.SolidCoreModule,
      typeof i4.MatListModule,
      typeof i5.ɵNgxsFeatureModule,
      typeof i6.MatInputModule,
      typeof i7.MatIconModule,
      typeof i8.MatButtonModule
    ],
    [typeof i1.GlossaryComponent]
  >;
  static ɵinj: i0.ɵɵInjectorDeclaration<SolidGlossaryModule>;
}
