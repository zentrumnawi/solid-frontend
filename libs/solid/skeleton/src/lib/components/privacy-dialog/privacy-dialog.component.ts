import { Component, Inject, Type } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import {
  InternalSolidSkeletonConfig,
  SOLID_SKELETON_CONFIG,
} from '../../solid-skeleton-config';

@Component({
  selector: 'solid-skeleton-privacy-dialog',
  templateUrl: './privacy-dialog.component.html',
  styleUrls: ['./privacy-dialog.component.scss'],
})
export class PrivacyDialogComponent {
  public PrivacyContentComponent: Type<any>;

  constructor(
    private _ref: MatDialogRef<PrivacyDialogComponent>,
    @Inject(SOLID_SKELETON_CONFIG) cfg: InternalSolidSkeletonConfig,
  ) {
    this.PrivacyContentComponent = cfg.privacyContent;
  }

  public onCancelClick() {
    this._ref.close();
  }
}
