import { Inject, Injectable } from '@angular/core';
import { SolidCoreConfig, SOLID_CORE_CONFIG } from '@zentrumnawi/solid-core';
import introJs from 'intro.js';

@Injectable({ providedIn: 'root' })
export class IntroService {
  introJS: any;

  constructor(@Inject(SOLID_CORE_CONFIG) public config: SolidCoreConfig) {}

  guidedTour(callback: (target: any) => void) {
    this.introJS = introJs();
    localStorage.setItem('hide_tour', 'false'); // for testing
    if (
      localStorage.getItem('hide_tour') == 'false' ||
      localStorage.getItem('hide_tour') == null
    ) {
      this.introJS
        .setOptions({
          tooltipClass: 'customTooltip',
          steps: this.config.guidedTour,
        })
        .onbeforechange(callback)
        .start();
      localStorage.setItem('hide_tour', 'true');
    }
  }

  profileTour(callback: (target: any) => void) {
    this.introJS = introJs();
    localStorage.setItem('hide_tour', 'false'); // for testing
    if (
      localStorage.getItem('hide_tour') == 'false' ||
      localStorage.getItem('hide_tour') == null
    ) {
      this.introJS
        .setOptions({
          tooltipClass: 'customTooltip',
          steps: this.config.profileTour,
        })
        .onbeforechange(callback)
        .start();
      localStorage.setItem('hide_tour', 'true');
    }
  }
}
