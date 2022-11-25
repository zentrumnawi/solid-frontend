import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { SolidCoreConfig, SOLID_CORE_CONFIG } from '@zentrumnawi/solid-core';

@Component({
  selector: 'solid-skeleton-landing-banner-dialog',
  templateUrl: './landing-banner-dialog.component.html',
  styleUrls: ['./landing-banner-dialog.component.scss'],
})
export class LandingBannerDialogComponent {
  public landingInfo;

  constructor(
    private _ref: MatDialogRef<LandingBannerDialogComponent>,
    @Inject(SOLID_CORE_CONFIG) private coreConfig: SolidCoreConfig
  ) {
    _ref.disableClose = true;
    this.landingInfo = coreConfig.landingContent;
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
