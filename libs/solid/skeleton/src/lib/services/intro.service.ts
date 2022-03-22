import { Inject, Injectable } from '@angular/core';
import { SolidCoreConfig, SOLID_CORE_CONFIG } from '@zentrumnawi/solid-core';
import introJs from 'intro.js';

@Injectable({ providedIn: 'root' })
export class IntroService {
  introJS: any;

  constructor(@Inject(SOLID_CORE_CONFIG) public config: SolidCoreConfig) {}

  guidedTour(callback: (target: any) => void) {
    this.introJS = introJs();
    if (localStorage.getItem('hide_tour') == 'false') {
      this.introJS
        .setOptions({
          disableInteraction: true,
          tooltipClass: 'customTooltip',
          hidePrev: true,
          steps: this.config.guidedTour,
        })
        .onbeforechange(callback)
        .start();
      localStorage.setItem('hide_tour', 'true');
    }
  }
}
