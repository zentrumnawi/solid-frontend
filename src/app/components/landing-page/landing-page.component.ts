import {Component} from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  public ShowLanding = false;

  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([
      Breakpoints.XLarge,
      Breakpoints.Large,
      Breakpoints.Medium,
    ]).subscribe(result => {
      if (result.matches && sessionStorage.getItem('hide_landing') !== 'true') {
        this.ShowLanding = true;
      }
    })
  }

  public onCloseClick() {
    this.ShowLanding = false;
    sessionStorage.setItem('hide_landing', 'true');
  }
}
