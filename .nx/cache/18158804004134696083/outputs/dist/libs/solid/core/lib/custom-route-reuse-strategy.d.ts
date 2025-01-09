import {
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  RouteReuseStrategy,
} from '@angular/router';
import * as i0 from '@angular/core';
export declare class CustomRouteReuseStrategy implements RouteReuseStrategy {
  shouldDetach(route: ActivatedRouteSnapshot): boolean;
  store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void;
  shouldAttach(route: ActivatedRouteSnapshot): boolean;
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null;
  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean;
  static ɵfac: i0.ɵɵFactoryDeclaration<CustomRouteReuseStrategy, never>;
  static ɵprov: i0.ɵɵInjectableDeclaration<CustomRouteReuseStrategy>;
}
