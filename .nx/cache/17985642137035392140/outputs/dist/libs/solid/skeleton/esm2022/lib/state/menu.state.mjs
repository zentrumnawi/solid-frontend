var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
import { Action, Selector, State, Store } from '@ngxs/store';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SetMenuEntries } from './menu.actions';
import { RouterDataResolved } from '@ngxs/router-plugin';
import { HttpClient } from '@angular/common/http';
import { SOLID_CORE_CONFIG } from '@zentrumnawi/solid-core';
import * as i0 from '@angular/core';
import * as i1 from '@angular/router';
import * as i2 from '@ngxs/store';
import * as i3 from '@angular/common/http';
const isActive = (routerUrl, routeUrl) =>
  routeUrl === ''
    ? routerUrl === '/'
    : routerUrl.substring(1).startsWith(routeUrl);
export let MenuState = class MenuState {
  store;
  _http;
  _config;
  items;
  static getLandingItems(state) {
    const filter = function (item) {
      return item.showOnLanding;
    };
    return state.items.filter(filter);
  }
  static getMenuItems(state) {
    const filter = function (item) {
      return item.showInMenu;
    };
    return state.items.filter(filter);
  }
  constructor(router, store, _http, _config) {
    this.store = store;
    this._http = _http;
    this._config = _config;
    const items = [];
    for (const route of router.config.sort(
      (a, b) => a.data?.order - b.data?.order
    )) {
      items.push({
        route: route.path || '',
        active: isActive(router.url, route.path || ''),
        title: route.data?.title,
        icon: route.data?.icon,
        svgIcon: route.data?.svgIcon,
        showInMenu: route.data?.showInMenu,
        showOnLanding: route.data?.showOnLandingPage,
        name: route.data?.name,
      });
    }
    this.items = items;
    setTimeout(() => this.store.dispatch(new SetMenuEntries(items)));
  }
  getItemsCount() {
    const filter = function (item) {
      return item.showOnLanding;
    };
    return this.items.filter(filter).length;
  }
  setEntries({ setState }, { items }) {
    return setState({
      items: [...items],
    });
  }
  test(ctx, { event }) {
    const newUrl = event.urlAfterRedirects;
    const newItems = ctx.getState().items.map((item) => {
      return { ...item, active: isActive(newUrl, item.route) };
    });
    return ctx.patchState({
      items: newItems,
    });
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: MenuState,
    deps: [
      { token: i1.Router },
      { token: i2.Store },
      { token: i3.HttpClient },
      { token: SOLID_CORE_CONFIG },
    ],
    target: i0.ɵɵFactoryTarget.Injectable,
  });
  static ɵprov = i0.ɵɵngDeclareInjectable({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: MenuState,
  });
};
__decorate(
  [
    Action(SetMenuEntries),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object, SetMenuEntries]),
    __metadata('design:returntype', void 0),
  ],
  MenuState.prototype,
  'setEntries',
  null
);
__decorate(
  [
    Action(RouterDataResolved),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object, RouterDataResolved]),
    __metadata('design:returntype', void 0),
  ],
  MenuState.prototype,
  'test',
  null
);
__decorate(
  [
    Selector(),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object]),
    __metadata('design:returntype', Array),
  ],
  MenuState,
  'getLandingItems',
  null
);
__decorate(
  [
    Selector(),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object]),
    __metadata('design:returntype', Array),
  ],
  MenuState,
  'getMenuItems',
  null
);
MenuState = __decorate(
  [
    State({
      name: 'menu',
      defaults: {
        items: [],
      },
    }),
    __metadata('design:paramtypes', [Router, Store, HttpClient, Object]),
  ],
  MenuState
);
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: MenuState,
  decorators: [
    {
      type: Injectable,
    },
  ],
  ctorParameters: function () {
    return [
      { type: i1.Router },
      { type: i2.Store },
      { type: i3.HttpClient },
      {
        type: undefined,
        decorators: [
          {
            type: Inject,
            args: [SOLID_CORE_CONFIG],
          },
        ],
      },
    ];
  },
  propDecorators: { setEntries: [], test: [] },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5zdGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc29saWQvc2tlbGV0b24vc3JjL2xpYi9zdGF0ZS9tZW51LnN0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBZ0IsS0FBSyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzNFLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDekQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBbUIsaUJBQWlCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7QUFNN0UsTUFBTSxRQUFRLEdBQUcsQ0FBQyxTQUFpQixFQUFFLFFBQWdCLEVBQUUsRUFBRSxDQUN2RCxRQUFRLEtBQUssRUFBRTtJQUNiLENBQUMsQ0FBQyxTQUFTLEtBQUssR0FBRztJQUNuQixDQUFDLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7QUFTM0MsV0FBTSxTQUFTLEdBQWYsTUFBTSxTQUFTO0lBb0JWO0lBQ0E7SUFDMkI7SUFyQjdCLEtBQUssQ0FBYTtJQUdaLEFBQVAsTUFBTSxDQUFDLGVBQWUsQ0FBQyxLQUFxQjtRQUNqRCxNQUFNLE1BQU0sR0FBRyxVQUFVLElBQWM7WUFDckMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzVCLENBQUMsQ0FBQztRQUNGLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FB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YjtJQUROLE1BQU0sQ0FBQyxjQUFjLENBQUM7OzZDQUdWLGNBQWM7OzJDQUsxQjtBQUdNO0lBRE4sTUFBTSxDQUFDLGtCQUFrQixDQUFDOzs2Q0FHZCxrQkFBa0I7O3FDQVM5QjtBQXBFYTtJQURiLFFBQVEsRUFBRTs7OztzQ0FNVjtBQUdhO0lBRGIsUUFBUSxFQUFFOzs7O21DQU1WO0FBakJVLFNBQVM7SUFQckIsS0FBSyxDQUFpQjtRQUNyQixJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRTtZQUNSLEtBQUssRUFBRSxFQUFFO1NBQ1Y7S0FDRixDQUFDO3FDQXFCVSxNQUFNO1FBQ0MsS0FBSztRQUNMLFVBQVU7R0FyQmhCLFNBQVMsQ0F5RXJCOzJGQXpFWSxTQUFTO2tCQURyQixVQUFVOzswQkF1Qk4sTUFBTTsyQkFBQyxpQkFBaUI7NENBNkJwQixVQUFVLE1BVVYsSUFBSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvbiwgU2VsZWN0b3IsIFN0YXRlLCBTdGF0ZUNvbnRleHQsIFN0b3JlIH0gZnJvbSAnQG5neHMvc3RvcmUnO1xyXG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgTWVudUl0ZW0gfSBmcm9tICcuL21lbnUubW9kZWwnO1xyXG5pbXBvcnQgeyBTZXRNZW51RW50cmllcyB9IGZyb20gJy4vbWVudS5hY3Rpb25zJztcclxuaW1wb3J0IHsgUm91dGVyRGF0YVJlc29sdmVkIH0gZnJvbSAnQG5neHMvcm91dGVyLXBsdWdpbic7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IFNvbGlkQ29yZUNvbmZpZywgU09MSURfQ09SRV9DT05GSUcgfSBmcm9tICdAemVudHJ1bW5hd2kvc29saWQtY29yZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE1lbnVTdGF0ZU1vZGVsIHtcclxuICBpdGVtczogTWVudUl0ZW1bXTtcclxufVxyXG5cclxuY29uc3QgaXNBY3RpdmUgPSAocm91dGVyVXJsOiBzdHJpbmcsIHJvdXRlVXJsOiBzdHJpbmcpID0+XHJcbiAgcm91dGVVcmwgPT09ICcnXHJcbiAgICA/IHJvdXRlclVybCA9PT0gJy8nXHJcbiAgICA6IHJvdXRlclVybC5zdWJzdHJpbmcoMSkuc3RhcnRzV2l0aChyb3V0ZVVybCk7XHJcblxyXG5AU3RhdGU8TWVudVN0YXRlTW9kZWw+KHtcclxuICBuYW1lOiAnbWVudScsXHJcbiAgZGVmYXVsdHM6IHtcclxuICAgIGl0ZW1zOiBbXSxcclxuICB9LFxyXG59KVxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBNZW51U3RhdGUge1xyXG4gIHByaXZhdGUgaXRlbXM6IE1lbnVJdGVtW107XHJcblxyXG4gIEBTZWxlY3RvcigpXHJcbiAgcHVibGljIHN0YXRpYyBnZXRMYW5kaW5nSXRlbXMoc3RhdGU6IE1lbnVTdGF0ZU1vZGVsKTogTWVudUl0ZW1bXSB7XHJcbiAgICBjb25zdCBmaWx0ZXIgPSBmdW5jdGlvbiAoaXRlbTogTWVudUl0ZW0pIHtcclxuICAgICAgcmV0dXJuIGl0ZW0uc2hvd09uTGFuZGluZztcclxuICAgIH07XHJcbiAgICByZXR1cm4gc3RhdGUuaXRlbXMuZmlsdGVyKGZpbHRlcik7XHJcbiAgfVxyXG5cclxuICBAU2VsZWN0b3IoKVxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TWVudUl0ZW1zKHN0YXRlOiBNZW51U3RhdGVNb2RlbCk6IE1lbnVJdGVtW10ge1xyXG4gICAgY29uc3QgZmlsdGVyID0gZnVuY3Rpb24gKGl0ZW06IE1lbnVJdGVtKSB7XHJcbiAgICAgIHJldHVybiBpdGVtLnNob3dJbk1lbnU7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHN0YXRlLml0ZW1zLmZpbHRlcihmaWx0ZXIpO1xyXG4gIH1cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHJvdXRlcjogUm91dGVyLFxyXG4gICAgcHJpdmF0ZSBzdG9yZTogU3RvcmUsXHJcbiAgICBwcml2YXRlIF9odHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgQEluamVjdChTT0xJRF9DT1JFX0NPTkZJRykgcHJpdmF0ZSBfY29uZmlnOiBTb2xpZENvcmVDb25maWdcclxuICApIHtcclxuICAgIGNvbnN0IGl0ZW1zOiBNZW51SXRlbVtdID0gW107XHJcbiAgICBmb3IgKGNvbnN0IHJvdXRlIG9mIHJvdXRlci5jb25maWcuc29ydChcclxuICAgICAgKGEsIGIpID0+IGEuZGF0YT8ub3JkZXIgLSBiLmRhdGE/Lm9yZGVyXHJcbiAgICApKSB7XHJcbiAgICAgIGl0ZW1zLnB1c2goe1xyXG4gICAgICAgIHJvdXRlOiByb3V0ZS5wYXRoIHx8ICcnLFxyXG4gICAgICAgIGFjdGl2ZTogaXNBY3RpdmUocm91dGVyLnVybCwgcm91dGUucGF0aCB8fCAnJyksXHJcbiAgICAgICAgdGl0bGU6IHJvdXRlLmRhdGE/LnRpdGxlLFxyXG4gICAgICAgIGljb246IHJvdXRlLmRhdGE/Lmljb24sXHJcbiAgICAgICAgc3ZnSWNvbjogcm91dGUuZGF0YT8uc3ZnSWNvbixcclxuICAgICAgICBzaG93SW5NZW51OiByb3V0ZS5kYXRhPy5zaG93SW5NZW51LFxyXG4gICAgICAgIHNob3dPbkxhbmRpbmc6IHJvdXRlLmRhdGE/LnNob3dPbkxhbmRpbmdQYWdlLFxyXG4gICAgICAgIG5hbWU6IHJvdXRlLmRhdGE/Lm5hbWUsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5pdGVtcyA9IGl0ZW1zO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBTZXRNZW51RW50cmllcyhpdGVtcykpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRJdGVtc0NvdW50KCk6IG51bWJlciB7XHJcbiAgICBjb25zdCBmaWx0ZXIgPSBmdW5jdGlvbiAoaXRlbTogTWVudUl0ZW0pIHtcclxuICAgICAgcmV0dXJuIGl0ZW0uc2hvd09uTGFuZGluZztcclxuICAgIH07XHJcbiAgICByZXR1cm4gdGhpcy5pdGVtcy5maWx0ZXIoZmlsdGVyKS5sZW5ndGg7XHJcbiAgfVxyXG5cclxuICBAQWN0aW9uKFNldE1lbnVFbnRyaWVzKVxyXG4gIHB1YmxpYyBzZXRFbnRyaWVzKFxyXG4gICAgeyBzZXRTdGF0ZSB9OiBTdGF0ZUNvbnRleHQ8TWVudVN0YXRlTW9kZWw+LFxyXG4gICAgeyBpdGVtcyB9OiBTZXRNZW51RW50cmllc1xyXG4gICkge1xyXG4gICAgcmV0dXJuIHNldFN0YXRlKHtcclxuICAgICAgaXRlbXM6IFsuLi5pdGVtc10sXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIEBBY3Rpb24oUm91dGVyRGF0YVJlc29sdmVkKVxyXG4gIHB1YmxpYyB0ZXN0KFxyXG4gICAgY3R4OiBTdGF0ZUNvbnRleHQ8TWVudVN0YXRlTW9kZWw+LFxyXG4gICAgeyBldmVudCB9OiBSb3V0ZXJEYXRhUmVzb2x2ZWRcclxuICApIHtcclxuICAgIGNvbnN0IG5ld1VybCA9IGV2ZW50LnVybEFmdGVyUmVkaXJlY3RzO1xyXG4gICAgY29uc3QgbmV3SXRlbXMgPSBjdHguZ2V0U3RhdGUoKS5pdGVtcy5tYXAoKGl0ZW0pID0+IHtcclxuICAgICAgcmV0dXJuIHsgLi4uaXRlbSwgYWN0aXZlOiBpc0FjdGl2ZShuZXdVcmwsIGl0ZW0ucm91dGUpIH07XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBjdHgucGF0Y2hTdGF0ZSh7XHJcbiAgICAgIGl0ZW1zOiBuZXdJdGVtcyxcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=
