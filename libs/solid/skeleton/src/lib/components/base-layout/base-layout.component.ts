import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'solid-skeleton-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss']
})
export class BaseLayoutComponent implements OnInit {
  public FixedLayout = false;
  @ViewChild('mainmenu', { static: true }) MainMenu?: MatDrawer;
  @ViewChild('glossary', { static: true }) Glossary?: MatDrawer;

  // noinspection JSUnusedLocalSymbols
  constructor(private _breakpointObserver: BreakpointObserver) {}

  public ngOnInit() {
    this._breakpointObserver
      .observe(['(min-width: 1000px)'])
      .subscribe(isFixed => {
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
