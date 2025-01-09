import { Type } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { InternalSolidSkeletonConfig } from '../../solid-skeleton-config';
import * as i0 from '@angular/core';
export declare class PrivacyDialogComponent {
  private _ref;
  PrivacyContentComponent: Type<any>;
  constructor(
    _ref: MatDialogRef<PrivacyDialogComponent>,
    cfg: InternalSolidSkeletonConfig
  );
  onCancelClick(): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<PrivacyDialogComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    PrivacyDialogComponent,
    'solid-skeleton-privacy-dialog',
    never,
    {},
    {},
    never,
    never,
    false,
    never
  >;
}
