import { MatDialogRef } from '@angular/material/dialog';
import * as i0 from '@angular/core';
export declare class UpdateDialogComponent {
  private _ref;
  private readonly cb;
  constructor(
    _ref: MatDialogRef<UpdateDialogComponent>,
    /** Inject the required service function to prevent a circular dependency between the Component and the service */
    data: any
  );
  onCancelClick(): void;
  onOkClick(): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<UpdateDialogComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    UpdateDialogComponent,
    'solid-skeleton-update-dialog',
    never,
    {},
    {},
    never,
    never,
    false,
    never
  >;
}
