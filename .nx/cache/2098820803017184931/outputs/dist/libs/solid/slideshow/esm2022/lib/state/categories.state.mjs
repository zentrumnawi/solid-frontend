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
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Action, Selector, State } from '@ngxs/store';
import { SOLID_CORE_CONFIG } from '@zentrumnawi/solid-core';
import { GetCategories } from './categories.actions';
import { map, tap } from 'rxjs/operators';
import * as i0 from '@angular/core';
import * as i1 from '@angular/common/http';
export let CategoriesState = class CategoriesState {
  _http;
  _config;
  constructor(_http, _config) {
    this._http = _http;
    this._config = _config;
  }
  static getSlideshowCategoriesItems(state) {
    const fn = () =>
      state.map((s) => ({
        id: s.id,
        name: s.name,
        slug: s.slug,
      }));
    return fn();
  }
  GetSlideshowCategories(ctx) {
    if (ctx.getState().length > 0) {
      return;
    }
    return this._http.get(`${this._config.apiUrl}/categories`).pipe(
      map((res) => {
        const mapit = (input) => {
          return input.map((categories) => {
            return {
              ...categories,
            };
          });
        };
        return mapit(res);
      }),
      tap((res) => {
        ctx.setState([...res.map((categories) => categories)]);
      })
    );
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: CategoriesState,
    deps: [{ token: i1.HttpClient }, { token: SOLID_CORE_CONFIG }],
    target: i0.ɵɵFactoryTarget.Injectable,
  });
  static ɵprov = i0.ɵɵngDeclareInjectable({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: CategoriesState,
  });
};
__decorate(
  [
    Action(GetCategories),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object]),
    __metadata('design:returntype', void 0),
  ],
  CategoriesState.prototype,
  'GetSlideshowCategories',
  null
);
__decorate(
  [
    Selector(),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Array]),
    __metadata('design:returntype', void 0),
  ],
  CategoriesState,
  'getSlideshowCategoriesItems',
  null
);
CategoriesState = __decorate(
  [
    State({
      name: 'categories',
      defaults: [],
    }),
    __metadata('design:paramtypes', [HttpClient, Object]),
  ],
  CategoriesState
);
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: CategoriesState,
  decorators: [
    {
      type: Injectable,
    },
  ],
  ctorParameters: function () {
    return [
      { type: i1.HttpClient },
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
  propDecorators: { GetSlideshowCategories: [] },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0ZWdvcmllcy5zdGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc29saWQvc2xpZGVzaG93L3NyYy9saWIvc3RhdGUvY2F0ZWdvcmllcy5zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFnQixNQUFNLGFBQWEsQ0FBQztBQUNwRSxPQUFPLEVBQW1CLGlCQUFpQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDN0UsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXJELE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQVNuQyxXQUFNLGVBQWUsR0FBckIsTUFBTSxlQUFlO0lBRWhCO0lBQzJCO0lBRnJDLFlBQ1UsS0FBaUIsRUFDVSxPQUF3QjtRQURuRCxVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQ1UsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7SUFDMUQsQ0FBQztJQUdVLEFBQVAsTUFBTSxDQUFDLDJCQUEyQixDQUFDLEtBQTJCO1FBQ25FLE1BQU0sRUFBRSxHQUFHLEdBQUcsRUFBRSxDQUNkLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDaEIsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFO1lBQ1IsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJO1lBQ1osSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJO1NBQ2IsQ0FBQyxDQUFDLENBQUM7UUFDTixPQUFPLEVBQUUsRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUdNLHNCQUFzQixDQUFDLEdBQXVDO1FBQ25FLElBQUksR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDN0IsT0FBTztTQUNSO1FBQ0QsT0FBTyxJQUFJLENBQUMsS0FBSzthQUNkLEdBQUcsQ0FBc0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sYUFBYSxDQUFDO2FBQzdELElBQUksQ0FDSCxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNWLE1BQU0sS0FBSyxHQUFHLENBQUMsS0FBMEIsRUFBdUIsRUFBRTtnQkFDaEUsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUU7b0JBQzlCLE9BQU87d0JBQ0wsR0FBRyxVQUFVO3FCQUNkLENBQUM7Z0JBQ0osQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUM7WUFDRixPQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQUMsRUFDRixHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNWLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6RCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ04sQ0FBQzt1R0F2Q1UsZUFBZSw0Q0FHaEIsaUJBQWlCOzJHQUhoQixlQUFlOztBQWtCbkI7SUFETixNQUFNLENBQUMsYUFBYSxDQUFDOzs7OzZEQXNCckI7QUFoQ2E7SUFEYixRQUFRLEVBQUU7Ozs7d0RBU1Y7QUFmVSxlQUFlO0lBTDNCLEtBQUssQ0FBdUI7UUFDM0IsSUFBSSxFQUFFLFlBQVk7UUFDbEIsUUFBUSxFQUFFLEVBQUU7S0FDYixDQUFDO3FDQUlpQixVQUFVO0dBRmhCLGVBQWUsQ0F3QzNCOzJGQXhDWSxlQUFlO2tCQUQzQixVQUFVOzswQkFJTixNQUFNOzJCQUFDLGlCQUFpQjs0Q0FlcEIsc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEFjdGlvbiwgU2VsZWN0b3IsIFN0YXRlLCBTdGF0ZUNvbnRleHQgfSBmcm9tICdAbmd4cy9zdG9yZSc7XHJcbmltcG9ydCB7IFNvbGlkQ29yZUNvbmZpZywgU09MSURfQ09SRV9DT05GSUcgfSBmcm9tICdAemVudHJ1bW5hd2kvc29saWQtY29yZSc7XHJcbmltcG9ydCB7IEdldENhdGVnb3JpZXMgfSBmcm9tICcuL2NhdGVnb3JpZXMuYWN0aW9ucyc7XHJcbmltcG9ydCB7IFNsaWRlc2hvd0NhdGVnb3J5IH0gZnJvbSAnLi9jYXRlZ29yaWVzLm1vZGVsJztcclxuaW1wb3J0IHsgbWFwLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5leHBvcnQgdHlwZSBDYXRlZ29yaWVzU3RhdGVNb2RlbCA9IFNsaWRlc2hvd0NhdGVnb3J5W107XHJcblxyXG5AU3RhdGU8Q2F0ZWdvcmllc1N0YXRlTW9kZWw+KHtcclxuICBuYW1lOiAnY2F0ZWdvcmllcycsXHJcbiAgZGVmYXVsdHM6IFtdLFxyXG59KVxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDYXRlZ29yaWVzU3RhdGUge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBfaHR0cDogSHR0cENsaWVudCxcclxuICAgIEBJbmplY3QoU09MSURfQ09SRV9DT05GSUcpIHByaXZhdGUgX2NvbmZpZzogU29saWRDb3JlQ29uZmlnXHJcbiAgKSB7fVxyXG5cclxuICBAU2VsZWN0b3IoKVxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0U2xpZGVzaG93Q2F0ZWdvcmllc0l0ZW1zKHN0YXRlOiBDYXRlZ29yaWVzU3RhdGVNb2RlbCkge1xyXG4gICAgY29uc3QgZm4gPSAoKSA9PlxyXG4gICAgICBzdGF0ZS5tYXAoKHMpID0+ICh7XHJcbiAgICAgICAgaWQ6IHMuaWQsXHJcbiAgICAgICAgbmFtZTogcy5uYW1lLFxyXG4gICAgICAgIHNsdWc6IHMuc2x1ZyxcclxuICAgICAgfSkpO1xyXG4gICAgcmV0dXJuIGZuKCk7XHJcbiAgfVxyXG5cclxuICBAQWN0aW9uKEdldENhdGVnb3JpZXMpXHJcbiAgcHVibGljIEdldFNsaWRlc2hvd0NhdGVnb3JpZXMoY3R4OiBTdGF0ZUNvbnRleHQ8Q2F0ZWdvcmllc1N0YXRlTW9kZWw+KSB7XHJcbiAgICBpZiAoY3R4LmdldFN0YXRlKCkubGVuZ3RoID4gMCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5faHR0cFxyXG4gICAgICAuZ2V0PFNsaWRlc2hvd0NhdGVnb3J5W10+KGAke3RoaXMuX2NvbmZpZy5hcGlVcmx9L2NhdGVnb3JpZXNgKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBtYXAoKHJlcykgPT4ge1xyXG4gICAgICAgICAgY29uc3QgbWFwaXQgPSAoaW5wdXQ6IFNsaWRlc2hvd0NhdGVnb3J5W10pOiBTbGlkZXNob3dDYXRlZ29yeVtdID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGlucHV0Lm1hcCgoY2F0ZWdvcmllcykgPT4ge1xyXG4gICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAuLi5jYXRlZ29yaWVzLFxyXG4gICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIHJldHVybiBtYXBpdChyZXMpO1xyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIHRhcCgocmVzKSA9PiB7XHJcbiAgICAgICAgICBjdHguc2V0U3RhdGUoWy4uLnJlcy5tYXAoKGNhdGVnb3JpZXMpID0+IGNhdGVnb3JpZXMpXSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuICB9XHJcbn1cclxuIl19
