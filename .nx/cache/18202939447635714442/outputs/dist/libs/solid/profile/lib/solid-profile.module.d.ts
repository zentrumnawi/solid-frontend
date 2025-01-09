import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import * as i0 from '@angular/core';
import * as i1 from './components/tree/tree.component';
import * as i2 from './components/list/list.component';
import * as i3 from './components/detail/detail.component';
import * as i4 from './components/base/base.component';
import * as i5 from './components/grid/grid.component';
import * as i6 from './components/selected.directive';
import * as i7 from '@zentrumnawi/solid-core';
import * as i8 from '@angular/router';
import * as i9 from '@angular/material/tabs';
import * as i10 from '@ngxs/store';
import * as i11 from '@angular/material/button';
import * as i12 from '@angular/material/expansion';
import * as i13 from '@angular/material/form-field';
import * as i14 from '@angular/material/icon';
import * as i15 from '@angular/material/input';
import * as i16 from '@angular/material/list';
import * as i17 from '@angular/material/progress-spinner';
import * as i18 from '@angular/material/toolbar';
import * as i19 from '@angular/material/tree';
import * as i20 from '@angular/material/card';
export declare const ngxsFeatureModule: import('@angular/core').ModuleWithProviders<
  import('@ngxs/store').ɵNgxsFeatureModule
>;
export declare class SolidProfileModule {
  constructor(registry: MatIconRegistry, url: DomSanitizer);
  static ɵfac: i0.ɵɵFactoryDeclaration<SolidProfileModule, never>;
  static ɵmod: i0.ɵɵNgModuleDeclaration<
    SolidProfileModule,
    [
      typeof i1.TreeComponent,
      typeof i2.ListComponent,
      typeof i3.DetailComponent,
      typeof i4.BaseComponent,
      typeof i5.GridComponent,
      typeof i6.SelectedDirective
    ],
    [
      typeof i7.SolidCoreModule,
      typeof i7.SolidCoreModule,
      typeof i8.RouterModule,
      typeof i9.MatTabsModule,
      typeof i10.ɵNgxsFeatureModule,
      typeof i11.MatButtonModule,
      typeof i12.MatExpansionModule,
      typeof i13.MatFormFieldModule,
      typeof i14.MatIconModule,
      typeof i15.MatInputModule,
      typeof i16.MatListModule,
      typeof i17.MatProgressSpinnerModule,
      typeof i18.MatToolbarModule,
      typeof i19.MatTreeModule,
      typeof i20.MatCardModule
    ],
    never
  >;
  static ɵinj: i0.ɵɵInjectorDeclaration<SolidProfileModule>;
}
