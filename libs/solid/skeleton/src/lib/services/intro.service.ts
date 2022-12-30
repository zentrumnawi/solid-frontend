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
      localStorage.getItem('hide_landing_tour') == 'false' ||
      localStorage.getItem('hide_landing_tour') == null
    ) {
      this.introJS
        .setOptions({
          tooltipClass: 'customTooltip',
          steps: this.config.guidedTour.steps.filter(function (step: any) {
            if (step.element) {
              const id = step.element.slice(1, step.element.length);
              const element = document.getElementById(id);
              if (element != null || id == 'welcome' || id == 'end-tour') {
                return step.element;
              }
            }
          }),
          exitOnOverlayClick: false,
          hidePrev: true,
          hideNext: true,
        })
        .onbeforechange(callback)
        .start();
      localStorage.setItem('hide_landing_tour', 'true');
    }
  }
}
