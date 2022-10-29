import { Component, Inject } from '@angular/core';
import { SOLID_SKELETON_HACKY_INJECTION } from '@zentrumnawi/solid-skeleton';

@Component({
  selector: 'wabe-landing-banner-content',
  templateUrl: './landing-banner-content.component.html',
  styleUrls: [],
})
export class LandingBannerContentComponent {
  constructor(
    @Inject(SOLID_SKELETON_HACKY_INJECTION) public onCloseClick: () => void
  ) {}
}
