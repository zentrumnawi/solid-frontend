import { Injectable } from '@angular/core';
import * as i0 from '@angular/core';
export class CustomRouteReuseStrategy {
  shouldDetach(route) {
    return false;
  }
  store(
    route,
    detachedTree
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ) {}
  shouldAttach(route) {
    return false;
  }
  retrieve(route) {
    return null;
  }
  shouldReuseRoute(future, curr) {
    const reuse = future.routeConfig === curr.routeConfig;
    if (reuse && future.data.noReuse) {
      return false;
    }
    return reuse;
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: CustomRouteReuseStrategy,
    deps: [],
    target: i0.ɵɵFactoryTarget.Injectable,
  });
  static ɵprov = i0.ɵɵngDeclareInjectable({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: CustomRouteReuseStrategy,
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: CustomRouteReuseStrategy,
  decorators: [
    {
      type: Injectable,
    },
  ],
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLXJvdXRlLXJldXNlLXN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zb2xpZC9jb3JlL3NyYy9saWIvY3VzdG9tLXJvdXRlLXJldXNlLXN0cmF0ZWd5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBRzNDLE1BQU0sT0FBTyx3QkFBd0I7SUFDbkMsWUFBWSxDQUFDLEtBQTZCO1FBQ3hDLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELEtBQUssQ0FDSCxLQUE2QixFQUM3QixZQUFpQztJQUNqQyxnRUFBZ0U7UUFDekQsQ0FBQztJQUVWLFlBQVksQ0FBQyxLQUE2QjtRQUN4QyxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxRQUFRLENBQUMsS0FBNkI7UUFDcEMsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsZ0JBQWdCLENBQ2QsTUFBOEIsRUFDOUIsSUFBNEI7UUFFNUIsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLFdBQVcsS0FBSyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3RELElBQUksS0FBSyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hDLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7dUdBNUJVLHdCQUF3QjsyR0FBeEIsd0JBQXdCOzsyRkFBeEIsd0JBQXdCO2tCQURwQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LFxyXG4gIERldGFjaGVkUm91dGVIYW5kbGUsXHJcbiAgUm91dGVSZXVzZVN0cmF0ZWd5LFxyXG59IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEN1c3RvbVJvdXRlUmV1c2VTdHJhdGVneSBpbXBsZW1lbnRzIFJvdXRlUmV1c2VTdHJhdGVneSB7XHJcbiAgc2hvdWxkRGV0YWNoKHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90KTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBzdG9yZShcclxuICAgIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LFxyXG4gICAgZGV0YWNoZWRUcmVlOiBEZXRhY2hlZFJvdXRlSGFuZGxlXHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWVtcHR5LWZ1bmN0aW9uXHJcbiAgKTogdm9pZCB7fVxyXG5cclxuICBzaG91bGRBdHRhY2gocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QpOiBib29sZWFuIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHJldHJpZXZlKHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90KTogRGV0YWNoZWRSb3V0ZUhhbmRsZSB8IG51bGwge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBzaG91bGRSZXVzZVJvdXRlKFxyXG4gICAgZnV0dXJlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LFxyXG4gICAgY3VycjogQWN0aXZhdGVkUm91dGVTbmFwc2hvdFxyXG4gICk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgcmV1c2UgPSBmdXR1cmUucm91dGVDb25maWcgPT09IGN1cnIucm91dGVDb25maWc7XHJcbiAgICBpZiAocmV1c2UgJiYgZnV0dXJlLmRhdGEubm9SZXVzZSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmV1c2U7XHJcbiAgfVxyXG59XHJcbiJdfQ==
