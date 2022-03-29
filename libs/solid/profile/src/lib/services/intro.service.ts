import { Inject, Injectable } from '@angular/core';
import { SolidCoreConfig, SOLID_CORE_CONFIG } from '@zentrumnawi/solid-core';
import introJs from 'intro.js';

@Injectable({ providedIn: 'root' })
export class IntroService {
  introProfile: any;

  constructor(@Inject(SOLID_CORE_CONFIG) public config: SolidCoreConfig) {}

  profileTour(callback: (target: any) => void) {
    this.introProfile = introJs();
    this.introProfile
      .setOptions({
        tooltipClass: 'customTooltip',
        steps: this.config.profileTour,
      })
      .onbeforechange(callback)
      .start();
    localStorage.setItem('hide_profile_tour', 'true');
  }
}
