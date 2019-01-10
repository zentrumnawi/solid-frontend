import {Injectable} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, map, mergeMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  constructor(
    title: Title,
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
        title.setTitle(event.title ? `${event.title} | GeoMat` : 'GeoMat');
      });
  }
}
