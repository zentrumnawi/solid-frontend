import { Title } from '@angular/platform-browser';
import { MatDialogRef } from '@angular/material/dialog';
import { Actions } from '@ngxs/store';
import { SolidCoreConfig } from '../solid-core-config';
import * as i0 from '@angular/core';
export declare class TitleService {
  private cfg;
  private _title;
  constructor(cfg: SolidCoreConfig, _title: Title, actions: Actions);
  /**
   * Sets the title of the app for the lifetime of a dialog.
   */
  setDialogTitle(dialogRef: MatDialogRef<any>, title: string): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<TitleService, never>;
  static ɵprov: i0.ɵɵInjectableDeclaration<TitleService>;
}
