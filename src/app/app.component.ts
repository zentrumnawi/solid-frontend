import {BreakpointObserver} from '@angular/cdk/layout';
import {Component, ViewChild} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';
import {TitleService} from './services/title.service';
import {BaseComponent} from './shared/abstract/base.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent {
  public FixedLayout = true;
  @ViewChild('mainmenu', {static: true}) MainMenu?: MatDrawer;
  @ViewChild('glossary', {static: true}) Glossary?: MatDrawer;

  constructor(
    breakpointObserver: BreakpointObserver,
    title: TitleService, // Injected for initial initialisation
  ) {
    super();
    this.addSub(breakpointObserver.observe(['(min-width: 1000px)']).subscribe(isFixed => {
      const newFixedLayout = isFixed.matches;
      if (this.FixedLayout !== newFixedLayout) {
        if (newFixedLayout) {
          this.MainMenu!.open();
          this.Glossary!.open();
        } else {
          this.MainMenu!.close();
          this.Glossary!.close();
        }
      }
      this.FixedLayout = newFixedLayout;
    }));
  }
}
