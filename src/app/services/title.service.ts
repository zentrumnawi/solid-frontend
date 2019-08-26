import {Injectable} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, map, mergeMap} from 'rxjs/operators';
import {MatDialogRef} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  constructor(
    private _title: Title,
    activatedRoute: ActivatedRoute,
    router: Router,
  ) {
    // Piece of code to filter the router NavigationEnd events and map the required data properties from the route
    router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => activatedRoute),
      map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data))
      .subscribe((event) => {
        this._title.setTitle(event.title ? `${event.title} | GeoMat` : 'GeoMat');
      });
  }

  /**
   * Sets the title of the app for the lifetime of a dialog.
   */
  setDialogTitle(dialogRef: MatDialogRef<any>, title: string) {
    const oldTitle = this._title.getTitle();
    this._title.setTitle(title);
    const sub = dialogRef.afterClosed().subscribe(() => {
      this._title.setTitle(oldTitle);
      sub.unsubscribe();
    })
  }
}
