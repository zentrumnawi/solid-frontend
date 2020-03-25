import {Injectable} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {map} from 'rxjs/operators';
import {MatDialogRef} from "@angular/material/dialog";
import {Actions, ofActionSuccessful} from "@ngxs/store";
import {RouterNavigation} from "@ngxs/router-plugin";
import {RouterStateParams} from "../custom-router-state-serializer";

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  constructor(
    private _title: Title,
    actions: Actions,
  ) {
    actions.pipe(
      ofActionSuccessful(RouterNavigation),
      map((value: RouterNavigation<RouterStateParams>) => value.routerState.routeData.title)
    ).subscribe(title => {
      this._title.setTitle(title ? `${title} | GeoMat` : 'GeoMat');
    });
  }

  /**
   * Sets the title of the app for the lifetime of a dialog.
   */
  setDialogTitle(dialogRef: MatDialogRef<any>, title: string) {
    const oldTitle = this._title.getTitle();
    this._title.setTitle(`${title} | GeoMat`);
    const sub = dialogRef.afterClosed().subscribe(() => {
      this._title.setTitle(oldTitle);
      sub.unsubscribe();
    })
  }
}
