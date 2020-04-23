import { Inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';
import { Actions, ofActionSuccessful } from '@ngxs/store';
import { RouterNavigation } from '@ngxs/router-plugin';
import { RouterStateParams } from '../custom-router-state-serializer';
import { SOLID_CORE_CONFIG, SolidCoreConfig } from '../solid-core-config';

@Injectable()
export class TitleService {
  constructor(
    @Inject(SOLID_CORE_CONFIG) private cfg: SolidCoreConfig,
    private _title: Title,
    actions: Actions
  ) {
    actions
      .pipe(
        ofActionSuccessful(RouterNavigation),
        map(
          (value: RouterNavigation<RouterStateParams>) =>
            value.routerState.routeData.title
        )
      )
      .subscribe(title => {
        this._title.setTitle(title ? `${title} | ${cfg.appName}` : cfg.appName);
      });
  }

  /**
   * Sets the title of the app for the lifetime of a dialog.
   */
  setDialogTitle(dialogRef: MatDialogRef<any>, title: string) {
    const oldTitle = this._title.getTitle();
    this._title.setTitle(`${title} | ${this.cfg.appName}`);
    const sub = dialogRef.afterClosed().subscribe(() => {
      this._title.setTitle(oldTitle);
      sub.unsubscribe();
    });
  }
}
