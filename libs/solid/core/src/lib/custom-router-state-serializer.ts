import { Params, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngxs/router-plugin';
import { Injectable } from '@angular/core';

export interface RouterStateParams {
  url: string;
  params: Params;
  queryParams: Params;
  routeData: { title?: string };
}

// Map the router snapshot to { url, params, queryParams }
@Injectable()
export class CustomRouterStateSerializer
  implements RouterStateSerializer<RouterStateParams> {
  serialize(routerState: RouterStateSnapshot): RouterStateParams {
    const {
      url,
      root: { queryParams },
    } = routerState;

    let { root: route } = routerState;
    while (route.firstChild) {
      route = route.firstChild;
    }

    const { params, data } = route;

    return { url, params, queryParams, routeData: data };
  }
}
