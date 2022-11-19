import { Component, Inject, Type } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  InternalSolidSkeletonConfig,
  SOLID_SKELETON_CONFIG,
} from '../../solid-skeleton-config';

@Component({
  selector: 'solid-skeleton-landing-banner-dialog',
  templateUrl: './landing-banner-dialog.component.html',
  styleUrls: ['./landing-banner-dialog.component.scss'],
})
export class LandingBannerDialogComponent {
  public LandingBannerContentComponent: Type<any>;

  constructor(
    private _ref: MatDialogRef<LandingBannerDialogComponent>,
    @Inject(SOLID_SKELETON_CONFIG) cfg: InternalSolidSkeletonConfig
  ) {
    this.LandingBannerContentComponent = cfg.landingBannerContent;
  }

  public onCloseClick() {
    this._ref.close();
  }

  public onNotShowAgainClick() {
    localStorage.setItem('hide_landing_banner', 'true');
    this._ref.close();
  }
}
