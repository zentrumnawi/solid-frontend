import { ModuleWithProviders } from '@angular/core';
import {
  InternalSolidSkeletonConfig,
  SolidSkeletonConfig,
} from './solid-skeleton-config';
import * as i0 from '@angular/core';
import * as i1 from './components/base-layout/base-layout.component';
import * as i2 from './components/feedback/feedback.component';
import * as i3 from './components/main-menu/main-menu.component';
import * as i4 from './components/update-dialog/update-dialog.component';
import * as i5 from './components/landing/landing.component';
import * as i6 from './components/info/info.component';
import * as i7 from './components/message-list/message-list.component';
import * as i8 from './components/privacy-dialog/privacy-dialog.component';
import * as i9 from './components/landing-banner-dialog/landing-banner-dialog.component';
import * as i10 from './directives/grid-cols.directive';
import * as i11 from '@angular/common';
import * as i12 from '@zentrumnawi/solid-core';
import * as i13 from '@zentrumnawi/solid-glossary';
import * as i14 from '@angular/router';
import * as i15 from '@angular/material/button';
import * as i16 from '@angular/material/card';
import * as i17 from '@angular/material/dialog';
import * as i18 from '@angular/material/form-field';
import * as i19 from '@angular/material/grid-list';
import * as i20 from '@angular/material/icon';
import * as i21 from '@angular/material/input';
import * as i22 from '@angular/material/list';
import * as i23 from '@angular/material/select';
import * as i24 from '@angular/material/checkbox';
import * as i25 from '@angular/material/sidenav';
import * as i26 from '@angular/material/tabs';
import * as i27 from '@angular/material/toolbar';
import * as i28 from '@ngxs/store';
import * as i29 from '@angular/material/expansion';
import * as i30 from '@angular/material/slide-toggle';
import * as i31 from '@angular/material/badge';
export declare const ngxsFeatureModule: ModuleWithProviders<
  import('@ngxs/store').ɵNgxsFeatureModule
>;
export declare function configFactory(
  cfg: SolidSkeletonConfig
): () => () => InternalSolidSkeletonConfig;
export declare function routingFactory(
  cfg: InternalSolidSkeletonConfig
): import('@angular/router').Route[];
export declare class SolidSkeletonModule {
  static forRoot(
    cfg: SolidSkeletonConfig
  ): ModuleWithProviders<SolidSkeletonModule>;
  static ɵfac: i0.ɵɵFactoryDeclaration<SolidSkeletonModule, never>;
  static ɵmod: i0.ɵɵNgModuleDeclaration<
    SolidSkeletonModule,
    [
      typeof i1.BaseLayoutComponent,
      typeof i2.FeedbackComponent,
      typeof i3.MainMenuComponent,
      typeof i4.UpdateDialogComponent,
      typeof i5.LandingComponent,
      typeof i6.InfoComponent,
      typeof i7.MessageListComponent,
      typeof i8.PrivacyDialogComponent,
      typeof i9.LandingBannerDialogComponent,
      typeof i10.GridColsDirective
    ],
    [
      typeof i11.CommonModule,
      typeof i12.SolidCoreModule,
      typeof i13.SolidGlossaryModule,
      typeof i14.RouterModule,
      typeof i15.MatButtonModule,
      typeof i16.MatCardModule,
      typeof i17.MatDialogModule,
      typeof i18.MatFormFieldModule,
      typeof i19.MatGridListModule,
      typeof i20.MatIconModule,
      typeof i21.MatInputModule,
      typeof i22.MatListModule,
      typeof i23.MatSelectModule,
      typeof i24.MatCheckboxModule,
      typeof i25.MatSidenavModule,
      typeof i26.MatTabsModule,
      typeof i27.MatToolbarModule,
      typeof i28.ɵNgxsFeatureModule,
      typeof i29.MatExpansionModule,
      typeof i30.MatSlideToggleModule,
      typeof i31.MatBadgeModule
    ],
    [typeof i1.BaseLayoutComponent]
  >;
  static ɵinj: i0.ɵɵInjectorDeclaration<SolidSkeletonModule>;
}
