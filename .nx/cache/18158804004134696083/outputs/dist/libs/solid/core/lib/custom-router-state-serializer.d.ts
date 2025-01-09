import { Params, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngxs/router-plugin';
import * as i0 from '@angular/core';
export interface RouterStateParams {
  url: string;
  params: Params;
  queryParams: Params;
  routeData: {
    title?: string;
  };
}
export declare class CustomRouterStateSerializer
  implements RouterStateSerializer<RouterStateParams>
{
  serialize(routerState: RouterStateSnapshot): RouterStateParams;
  static ɵfac: i0.ɵɵFactoryDeclaration<CustomRouterStateSerializer, never>;
  static ɵprov: i0.ɵɵInjectableDeclaration<CustomRouterStateSerializer>;
}
