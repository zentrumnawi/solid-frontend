import { Inject, Injectable } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Navigate } from '@ngxs/router-plugin';
import { SolidCoreConfig, SOLID_CORE_CONFIG } from '@zentrumnawi/solid-core';
import introJs from 'intro.js';

@Injectable({ providedIn: 'root' })
export class IntroService {
  introJS: any;

  constructor(@Inject(SOLID_CORE_CONFIG) public config: SolidCoreConfig) {}

  @Dispatch()
  static async navigateTo(url: string) {
    return new Navigate([url]);
  }

  guidedTour(callback: (target: any) => void) {
    this.introJS = introJs();
    if (
      localStorage.getItem('hide_tour') == 'false' ||
      localStorage.getItem('hide_tour') == null
    ) {
      this.introJS
        .setOptions({
          tooltipClass: 'customTooltip',
          steps: this.config.guidedTour.steps,
        })
        .onbeforechange(callback)
        .onexit(function () {
          IntroService.navigateTo('/');
        })
        .start();
      localStorage.setItem('hide_tour', 'true');
    }
  }
}
