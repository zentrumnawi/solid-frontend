import { Component, Inject, Type } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { EventEmitter } from 'stream';
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
    _ref.disableClose = true;
    this.LandingBannerContentComponent = cfg.landingBannerContent;
    localStorage.setItem('hide_landing_tour', 'false');
  }

  public onCloseClick() {
    this._ref.close();
  }

  public onNotShowAgainToggle(change: MatSlideToggleChange) {
    if (change.checked) localStorage.setItem('hide_landing_banner', 'true');
    else localStorage.setItem('hide_landing_banner', 'false');
  }

  public onStartTourToggle(change: MatSlideToggleChange) {
    if (change.checked) localStorage.setItem('hide_landing_tour', 'false');
    else localStorage.setItem('hide_landing_tour', 'true');
  }
}
