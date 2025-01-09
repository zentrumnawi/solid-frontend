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
import { Action, Selector, State } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { SOLID_CORE_CONFIG } from '@zentrumnawi/solid-core';
import { tap, map } from 'rxjs/operators';
import { GetSlideshowSelect } from './slideshow-select.actions';
import * as i0 from '@angular/core';
import * as i1 from '@angular/common/http';
export let SlideshowSelectState = class SlideshowSelectState {
  _config;
  _http;
  constructor(_config, _http) {
    this._config = _config;
    this._http = _http;
  }
  static getSlideshowSelect(state) {
    const fn = () =>
      state.map((s) => ({
        id: s.id,
        pages: s.pages,
        title_image: s.title_image,
        categories: s.categories,
        position: s.position,
        title: s.title,
      }));
    return fn();
  }
  load(ctx) {
    if (ctx.getState().length > 0) {
      return;
    }
    return this._http.get(`${this._config.apiUrl}/slideshows`).pipe(
      map((response) => {
        const mapit = (input) => {
          return input.map((slideshow) => {
            return {
              ...slideshow,
              categories: slideshow.categories,
            };
          });
        };
        return mapit(response);
      }),
      tap((res) => {
        ctx.setState([...res].sort((a, b) => a.position - b.position));
      })
    );
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: SlideshowSelectState,
    deps: [{ token: SOLID_CORE_CONFIG }, { token: i1.HttpClient }],
    target: i0.ɵɵFactoryTarget.Injectable,
  });
  static ɵprov = i0.ɵɵngDeclareInjectable({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: SlideshowSelectState,
  });
};
__decorate(
  [
    Action(GetSlideshowSelect),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object]),
    __metadata('design:returntype', void 0),
  ],
  SlideshowSelectState.prototype,
  'load',
  null
);
__decorate(
  [
    Selector(),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Array]),
    __metadata('design:returntype', void 0),
  ],
  SlideshowSelectState,
  'getSlideshowSelect',
  null
);
SlideshowSelectState = __decorate(
  [
    State({
      name: 'slideshowSelect',
      defaults: [],
    }),
    __metadata('design:paramtypes', [Object, HttpClient]),
  ],
  SlideshowSelectState
);
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: SlideshowSelectState,
  decorators: [
    {
      type: Injectable,
    },
  ],
  ctorParameters: function () {
    return [
      {
        type: undefined,
        decorators: [
          {
            type: Inject,
            args: [SOLID_CORE_CONFIG],
          },
        ],
      },
      { type: i1.HttpClient },
    ];
  },
  propDecorators: { load: [] },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVzaG93LXNlbGVjdC5zdGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc29saWQvc2xpZGVzaG93L3NyYy9saWIvc3RhdGUvc2xpZGVzaG93LXNlbGVjdC5zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQWdCLE1BQU0sYUFBYSxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsaUJBQWlCLEVBQW1CLE1BQU0seUJBQXlCLENBQUM7QUFDN0UsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMxQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7O0FBVXpELFdBQU0sb0JBQW9CLEdBQTFCLE1BQU0sb0JBQW9CO0lBRU07SUFDM0I7SUFGVixZQUNxQyxPQUF3QixFQUNuRCxLQUFpQjtRQURVLFlBQU8sR0FBUCxPQUFPLENBQWlCO1FBQ25ELFVBQUssR0FBTCxLQUFLLENBQVk7SUFDeEIsQ0FBQztJQUdVLEFBQVAsTUFBTSxDQUFDLGtCQUFrQixDQUFDLEtBQWdDO1FBQy9ELE1BQU0sRUFBRSxHQUFHLEdBQUcsRUFBRSxDQUNkLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDaEIsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFO1lBQ1IsS0FBSyxFQUFFLENBQUMsQ0FBQyxLQUFLO1lBQ2QsV0FBVyxFQUFFLENBQUMsQ0FBQyxXQUFXO1lBQzFCLFVBQVUsRUFBRSxDQUFDLENBQUMsVUFBVTtZQUN4QixRQUFRLEVBQUUsQ0FBQyxDQUFDLFFBQVE7WUFDcEIsS0FBSyxFQUFFLENBQUMsQ0FBQyxLQUFLO1NBQ2YsQ0FBQyxDQUFDLENBQUM7UUFDTixPQUFPLEVBQUUsRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUdNLElBQUksQ0FBQyxHQUE0QztRQUN0RCxJQUFJLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzdCLE9BQU87U0FDUjtRQUNELE9BQU8sSUFBSSxDQUFDLEtBQUs7YUFDZCxHQUFHLENBQXVCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLGFBQWEsQ0FBQzthQUM5RCxJQUFJLENBQ0gsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDZixNQUFNLEtBQUssR0FBRyxDQUFDLEtBQTJCLEVBQXdCLEVBQUU7Z0JBQ2xFLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO29CQUM3QixPQUFPO3dCQUNMLEdBQUcsU0FBUzt3QkFDWixVQUFVLEVBQUUsU0FBUyxDQUFDLFVBQVU7cUJBQ2pDLENBQUM7Z0JBQ0osQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUM7WUFDRixPQUFPLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6QixDQUFDLENBQUMsRUFDRixHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNWLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDakUsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNOLENBQUM7dUdBM0NVLG9CQUFvQixrQkFFckIsaUJBQWlCOzJHQUZoQixvQkFBb0I7O0FBcUJ4QjtJQUROLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQzs7OztnREF1QjFCO0FBcENhO0lBRGIsUUFBUSxFQUFFOzs7O29EQVlWO0FBbEJVLG9CQUFvQjtJQUxoQyxLQUFLLENBQTRCO1FBQ2hDLElBQUksRUFBRSxpQkFBaUI7UUFDdkIsUUFBUSxFQUFFLEVBQUU7S0FDYixDQUFDOzZDQUtpQixVQUFVO0dBSGhCLG9CQUFvQixDQTRDaEM7MkZBNUNZLG9CQUFvQjtrQkFEaEMsVUFBVTs7MEJBR04sTUFBTTsyQkFBQyxpQkFBaUI7cUVBbUJwQixJQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uLCBTZWxlY3RvciwgU3RhdGUsIFN0YXRlQ29udGV4dCB9IGZyb20gJ0BuZ3hzL3N0b3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNPTElEX0NPUkVfQ09ORklHLCBTb2xpZENvcmVDb25maWcgfSBmcm9tICdAemVudHJ1bW5hd2kvc29saWQtY29yZSc7XHJcbmltcG9ydCB7IHRhcCwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBHZXRTbGlkZXNob3dTZWxlY3QgfSBmcm9tICcuL3NsaWRlc2hvdy1zZWxlY3QuYWN0aW9ucyc7XHJcbmltcG9ydCB7IFNsaWRlc2hvd1NlbGVjdEFwaSB9IGZyb20gJy4vc2xpZGVzaG93LXNlbGVjdC5tb2RlbCc7XHJcblxyXG5leHBvcnQgdHlwZSBTbGlkZXNob3dTZWxlY3RTdGF0ZU1vZGVsID0gU2xpZGVzaG93U2VsZWN0QXBpW107XHJcblxyXG5AU3RhdGU8U2xpZGVzaG93U2VsZWN0U3RhdGVNb2RlbD4oe1xyXG4gIG5hbWU6ICdzbGlkZXNob3dTZWxlY3QnLFxyXG4gIGRlZmF1bHRzOiBbXSxcclxufSlcclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgU2xpZGVzaG93U2VsZWN0U3RhdGUge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQEluamVjdChTT0xJRF9DT1JFX0NPTkZJRykgcHJpdmF0ZSBfY29uZmlnOiBTb2xpZENvcmVDb25maWcsXHJcbiAgICBwcml2YXRlIF9odHRwOiBIdHRwQ2xpZW50XHJcbiAgKSB7fVxyXG5cclxuICBAU2VsZWN0b3IoKVxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0U2xpZGVzaG93U2VsZWN0KHN0YXRlOiBTbGlkZXNob3dTZWxlY3RTdGF0ZU1vZGVsKSB7XHJcbiAgICBjb25zdCBmbiA9ICgpID0+XHJcbiAgICAgIHN0YXRlLm1hcCgocykgPT4gKHtcclxuICAgICAgICBpZDogcy5pZCxcclxuICAgICAgICBwYWdlczogcy5wYWdlcyxcclxuICAgICAgICB0aXRsZV9pbWFnZTogcy50aXRsZV9pbWFnZSxcclxuICAgICAgICBjYXRlZ29yaWVzOiBzLmNhdGVnb3JpZXMsXHJcbiAgICAgICAgcG9zaXRpb246IHMucG9zaXRpb24sXHJcbiAgICAgICAgdGl0bGU6IHMudGl0bGUsXHJcbiAgICAgIH0pKTtcclxuICAgIHJldHVybiBmbigpO1xyXG4gIH1cclxuXHJcbiAgQEFjdGlvbihHZXRTbGlkZXNob3dTZWxlY3QpXHJcbiAgcHVibGljIGxvYWQoY3R4OiBTdGF0ZUNvbnRleHQ8U2xpZGVzaG93U2VsZWN0U3RhdGVNb2RlbD4pIHtcclxuICAgIGlmIChjdHguZ2V0U3RhdGUoKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLl9odHRwXHJcbiAgICAgIC5nZXQ8U2xpZGVzaG93U2VsZWN0QXBpW10+KGAke3RoaXMuX2NvbmZpZy5hcGlVcmx9L3NsaWRlc2hvd3NgKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBtYXAoKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBtYXBpdCA9IChpbnB1dDogU2xpZGVzaG93U2VsZWN0QXBpW10pOiBTbGlkZXNob3dTZWxlY3RBcGlbXSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBpbnB1dC5tYXAoKHNsaWRlc2hvdykgPT4ge1xyXG4gICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAuLi5zbGlkZXNob3csXHJcbiAgICAgICAgICAgICAgICBjYXRlZ29yaWVzOiBzbGlkZXNob3cuY2F0ZWdvcmllcyxcclxuICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICByZXR1cm4gbWFwaXQocmVzcG9uc2UpO1xyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIHRhcCgocmVzKSA9PiB7XHJcbiAgICAgICAgICBjdHguc2V0U3RhdGUoWy4uLnJlc10uc29ydCgoYSwgYikgPT4gYS5wb3NpdGlvbiAtIGIucG9zaXRpb24pKTtcclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=
