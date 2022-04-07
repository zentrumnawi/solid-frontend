import { Inject, Injectable } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Navigate } from '@ngxs/router-plugin';
import { SolidCoreConfig, SOLID_CORE_CONFIG } from '@zentrumnawi/solid-core';
import introJs from 'intro.js';

@Injectable({ providedIn: 'root' })
export class IntroService {
  introProfile: any;
  location: string;

  constructor(@Inject(SOLID_CORE_CONFIG) public config: SolidCoreConfig) {
    this.location = config.profileTour.location.profileTree;
  }

  @Dispatch()
  static async navigateTo(url: string) {
    return new Navigate([url]);
  }

  profileTour(callback: (target: any) => void) {
    this.introProfile = introJs();
    this.introProfile
      .setOptions({
        tooltipClass: 'customTooltip',
        steps: this.config.profileTour.steps,
        exitOnOverlayClick: false,
        hidePrev: true,
        hideNext: true,
      })
      .onbeforechange(callback)
      .start();
    localStorage.setItem('hide_profile_tour', 'true');
  }
}
