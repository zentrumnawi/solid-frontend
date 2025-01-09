import { MatDialogRef } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { SolidCoreConfig } from '@zentrumnawi/solid-core';
import * as i0 from '@angular/core';
export declare class LandingBannerDialogComponent {
  private _ref;
  private coreConfig;
  landingInfo: any;
  constructor(
    _ref: MatDialogRef<LandingBannerDialogComponent>,
    coreConfig: SolidCoreConfig
  );
  onCloseClick(): void;
  onNotShowAgainToggle(change: MatSlideToggleChange): void;
  onStartTourToggle(change: MatSlideToggleChange): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<LandingBannerDialogComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    LandingBannerDialogComponent,
    'solid-skeleton-landing-banner-dialog',
    never,
    {},
    {},
    never,
    never,
    false,
    never
  >;
}
