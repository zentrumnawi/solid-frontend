import { Injectable } from '@angular/core';
import * as i0 from '@angular/core';
// Map the router snapshot to { url, params, queryParams }
export class CustomRouterStateSerializer {
  serialize(routerState) {
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
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: CustomRouterStateSerializer,
    deps: [],
    target: i0.ɵɵFactoryTarget.Injectable,
  });
  static ɵprov = i0.ɵɵngDeclareInjectable({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: CustomRouterStateSerializer,
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: CustomRouterStateSerializer,
  decorators: [
    {
      type: Injectable,
    },
  ],
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLXJvdXRlci1zdGF0ZS1zZXJpYWxpemVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zb2xpZC9jb3JlL3NyYy9saWIvY3VzdG9tLXJvdXRlci1zdGF0ZS1zZXJpYWxpemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBUzNDLDBEQUEwRDtBQUUxRCxNQUFNLE9BQU8sMkJBQTJCO0lBR3RDLFNBQVMsQ0FBQyxXQUFnQztRQUN4QyxNQUFNLEVBQ0osR0FBRyxFQUNILElBQUksRUFBRSxFQUFFLFdBQVcsRUFBRSxHQUN0QixHQUFHLFdBQVcsQ0FBQztRQUVoQixJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLFdBQVcsQ0FBQztRQUNsQyxPQUFPLEtBQUssQ0FBQyxVQUFVLEVBQUU7WUFDdkIsS0FBSyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUM7U0FDMUI7UUFFRCxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQztRQUUvQixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ3ZELENBQUM7dUdBakJVLDJCQUEyQjsyR0FBM0IsMkJBQTJCOzsyRkFBM0IsMkJBQTJCO2tCQUR2QyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGFyYW1zLCBSb3V0ZXJTdGF0ZVNuYXBzaG90IH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgUm91dGVyU3RhdGVTZXJpYWxpemVyIH0gZnJvbSAnQG5neHMvcm91dGVyLXBsdWdpbic7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUm91dGVyU3RhdGVQYXJhbXMge1xyXG4gIHVybDogc3RyaW5nO1xyXG4gIHBhcmFtczogUGFyYW1zO1xyXG4gIHF1ZXJ5UGFyYW1zOiBQYXJhbXM7XHJcbiAgcm91dGVEYXRhOiB7IHRpdGxlPzogc3RyaW5nIH07XHJcbn1cclxuXHJcbi8vIE1hcCB0aGUgcm91dGVyIHNuYXBzaG90IHRvIHsgdXJsLCBwYXJhbXMsIHF1ZXJ5UGFyYW1zIH1cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQ3VzdG9tUm91dGVyU3RhdGVTZXJpYWxpemVyXHJcbiAgaW1wbGVtZW50cyBSb3V0ZXJTdGF0ZVNlcmlhbGl6ZXI8Um91dGVyU3RhdGVQYXJhbXM+XHJcbntcclxuICBzZXJpYWxpemUocm91dGVyU3RhdGU6IFJvdXRlclN0YXRlU25hcHNob3QpOiBSb3V0ZXJTdGF0ZVBhcmFtcyB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHVybCxcclxuICAgICAgcm9vdDogeyBxdWVyeVBhcmFtcyB9LFxyXG4gICAgfSA9IHJvdXRlclN0YXRlO1xyXG5cclxuICAgIGxldCB7IHJvb3Q6IHJvdXRlIH0gPSByb3V0ZXJTdGF0ZTtcclxuICAgIHdoaWxlIChyb3V0ZS5maXJzdENoaWxkKSB7XHJcbiAgICAgIHJvdXRlID0gcm91dGUuZmlyc3RDaGlsZDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB7IHBhcmFtcywgZGF0YSB9ID0gcm91dGU7XHJcblxyXG4gICAgcmV0dXJuIHsgdXJsLCBwYXJhbXMsIHF1ZXJ5UGFyYW1zLCByb3V0ZURhdGE6IGRhdGEgfTtcclxuICB9XHJcbn1cclxuIl19
