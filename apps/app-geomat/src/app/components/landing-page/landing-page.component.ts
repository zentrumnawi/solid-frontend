import {Component} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Message, messages} from './message';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  public ShowLanding = false;
  public Messages: Message[];

  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([
      Breakpoints.XLarge,
      Breakpoints.Large,
      Breakpoints.Medium,
    ]).subscribe(result => {
      if (result.matches && sessionStorage.getItem('hide_landing') !== 'true') {
        this.ShowLanding = true;
      }
    });
    const now = new Date(Date.now());
    this.Messages = messages.filter(m => (!m.validFrom || m.validFrom <= now) && (!m.validTo || m.validTo > now));
  }

  public onCloseClick() {
    this.ShowLanding = false;
    sessionStorage.setItem('hide_landing', 'true');
  }
}
