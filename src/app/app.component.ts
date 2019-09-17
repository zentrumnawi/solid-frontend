import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {MatDrawer} from '@angular/material/sidenav';
import {TitleService} from './services/title.service';
import {BaseComponent} from './shared/abstract/base.component';
import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent implements OnInit {
  public FixedLayout = false;
  @ViewChild('mainmenu', { static: true }) MainMenu?: MatDrawer;
  @ViewChild('glossary', { static: true }) Glossary?: MatDrawer;

  // noinspection JSUnusedLocalSymbols
  constructor(
    private _breakpointObserver: BreakpointObserver,
    title: TitleService, // Injected for initial initialisation
  ) {
    super();
  }

  public ngOnInit() {
    this._breakpointObserver.observe([
      Breakpoints.Large
    ]).subscribe(isFixed => {
        const newFixedLayout = isFixed.matches;
      if (newFixedLayout) {
        if (this.MainMenu) {
          this.MainMenu.open();
        }
        if (this.Glossary) {
          this.Glossary.open();
        }
      } else {
        if (this.MainMenu) {
          this.MainMenu.close();
        }
        if (this.Glossary) {
          this.Glossary.close();
        }
      }
        this.FixedLayout = newFixedLayout;
      });
  }

  public async onMenuSelectionChanged() {
    if (!this.FixedLayout && this.MainMenu) {
      await this.MainMenu.close();
    }
    if (!this.FixedLayout && this.Glossary) {
      await this.Glossary.close();
    }
  }
}
