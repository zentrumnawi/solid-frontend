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
import { AddSlideshow } from './slideshow.actions';
import { Inject, Injectable } from '@angular/core';
import { SOLID_CORE_CONFIG, ImageModel } from '@zentrumnawi/solid-core';
import { tap, map } from 'rxjs/operators';
import * as i0 from '@angular/core';
import * as i1 from '@angular/common/http';
export let SlideshowState = class SlideshowState {
  _config;
  _http;
  constructor(_config, _http) {
    this._config = _config;
    this._http = _http;
  }
  // @Selector()
  // public static getSlideshowByCategoriesAndId(state: SlideshowStateModel) {
  //   // This redundant variable is required
  //   // https://github.com/ng-packagr/ng-packagr/issues/696
  //   const fn = function (
  //     id: number,
  //     categories: string | undefined
  //   ): Slideshow | undefined {
  //     return state
  //       .filter((slideshow) => slideshow.categories === categories)
  //       .find((slideshow) => slideshow.id === id);
  //   };
  //   return fn;
  // }
  // @Selector()
  // public static getSlideshowByCategories(state: SlideshowStateModel) {
  //   const fn = function (
  //     categories: string | undefined
  //   ): Slideshow[] | undefined {
  //     return state.filter((s) => {
  //       if (!categories) {
  //         return;
  //       } else {
  //         return s.categories === categories;
  //       }
  //     });
  //   };
  //   return fn;
  // }
  // @Selector()
  // public static getSlideshowsByCategories(state: SlideshowStateModel) {
  //   const fn = function (
  //     categories: string | undefined
  //   ): Slideshow[] | undefined {
  //     return state.filter((s) => {
  //       if (!categories) {
  //         return;
  //       } else {
  //         return s.categories === categories;
  //       }
  //     });
  //   };
  //   return fn;
  // }
  // @Selector()
  // public static SlideshowByCategoryCounter(state: SlideshowStateModel) {
  //   const fn = function (categories: string | undefined): number {
  //     return state.filter((s) => s.categories === categories).length;
  //   };
  //   return fn;
  // }
  // @Selector()
  // public static getSlideshows(state: SlideshowStateModel) {
  //   // This redundant variable is required
  //   // https://github.com/ng-packagr/ng-packagr/issues/696
  //   const fn = () =>
  //     state.map((s) => ({
  //       id: s.id,
  //       title: s.title,
  //       title_image: s.title_image,
  //       position: s.position,
  //       categories: s.categories,
  //     }));
  //   return fn();
  // }
  // @Action(LoadSlideshow)
  // public load(ctx: StateContext<SlideshowStateModel>) {
  //   if (ctx.getState().length > 0) {
  //     console.log(ctx.getState());
  //     return;
  //   }
  //   return this._http
  //     .get<Slideshow[]>(`${this._config.apiUrl}/slideshows`)
  //     .pipe(
  //       map((response) => {
  //         const mapit = (input: SlideshowApi[]): Slideshow[] => {
  //           return input.map((slideshow) => {
  //             return {
  //               ...slideshow,
  //               categories: slideshow.categories[0],
  //               pages: slideshow.pages.map((page) => ({
  //                 ...page,
  //                 images: page.images?.map((slideshowImg) => ({
  //                   ...slideshowImg,
  //                   img: new ImageModel(slideshowImg.image),
  //                 })),
  //               })),
  //             };
  //           });
  //         };
  //         return mapit(response);
  //       }),
  //       tap((res) => {
  //         ctx.setState([
  //           ...res.map((slideshow) => {
  //             slideshow.pages = slideshow.pages.sort(
  //               (a, b) => a.position - b.position
  //             );
  //             return slideshow;
  //           }),
  //         ]);
  //       })
  //     );
  // }
  // @Selector()
  // public static getSlideshows(state: SlideshowStateModel) {
  //   return [...state];
  // }
  // @Selector()
  // public static getSlideshow(state: SlideshowStateModel) {
  //   const fn = (slideshowId: number): Slideshow =>
  //     state.filter((s) => s.id === slideshowId)[0];
  //   return fn;
  // }
  // @Action(LoadSlideshow)
  // public loadPage(
  //   ctx: StateContext<SlideshowStateModel>,
  // ) {
  //   if (ctx.getState().length > 0) {
  //     return;
  //   }
  //   return this._http
  //     .get<Slideshow>(`${this._config.apiUrl}/slideshows`)
  //     .pipe(
  //       map((response) => {
  //         const mapit = (slideshow: SlideshowApi): Slideshow => {
  //           // return input.map((slideshow) => {
  //           return {
  //             ...slideshow,
  //             categories: slideshow.categories,
  //             pages: slideshow.pages.map((page) => ({
  //               ...page,
  //               images: page.images?.map((slideshowImg) => ({
  //                 ...slideshowImg,
  //                 img: new ImageModel(slideshowImg.image),
  //               })),
  //             })),
  //           };
  //           // });
  //         };
  //         return mapit(response);
  //       }),
  //       tap((res) => {
  //         // ctx.setState([
  //         //   ...res.map((slideshow) => {
  //         //     slideshow.pages = slideshow.pages.sort(
  //         //       (a, b) => a.position - b.position
  //         //     );
  //         //     return slideshow;
  //         //   }),
  //         // ]);
  //       })
  //     );
  // }
  static getSlideshowById(state) {
    return (slideshowId) =>
      state.filter((s) => s.id === Number.parseInt(slideshowId))[0];
  }
  addSlideshow(ctx, { payload }) {
    const currentState = ctx.getState();
    if (currentState.some((sl) => sl.id === Number.parseInt(payload))) {
      // if slideshow is existed in the state
      // to see the data is taken from state
      console.log('slideshow not call api');
      return;
    }
    return this._http.get(`${this._config.apiUrl}/slideshows/${payload}`).pipe(
      map((response) => {
        // if slideshow is not existed in the state
        // to see the data is taken from API, call API
        console.log('slideshow call api');
        const mapit = (slideshow) => {
          return {
            id: slideshow.id,
            title: slideshow.title,
            position: slideshow.position,
            categories: slideshow.categories,
            pages: slideshow.pages.map((page) => ({
              ...page,
              images: page.images?.map((slideshowImg) => ({
                ...slideshowImg,
                img: new ImageModel(slideshowImg.image),
              })),
            })),
          };
        };
        return mapit(response);
      }),
      tap((res) => {
        res.pages.sort((a, b) => a.position - b.position);
        ctx.setState(
          [...currentState, res].sort((a, b) => a.position - b.position)
        );
      })
    );
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: SlideshowState,
    deps: [{ token: SOLID_CORE_CONFIG }, { token: i1.HttpClient }],
    target: i0.ɵɵFactoryTarget.Injectable,
  });
  static ɵprov = i0.ɵɵngDeclareInjectable({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: SlideshowState,
  });
};
__decorate(
  [
    Action(AddSlideshow),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object, AddSlideshow]),
    __metadata('design:returntype', void 0),
  ],
  SlideshowState.prototype,
  'addSlideshow',
  null
);
__decorate(
  [
    Selector(),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Array]),
    __metadata('design:returntype', void 0),
  ],
  SlideshowState,
  'getSlideshowById',
  null
);
SlideshowState = __decorate(
  [
    State({
      name: 'slideshow',
      defaults: [],
    }),
    __metadata('design:paramtypes', [Object, HttpClient]),
  ],
  SlideshowState
);
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: SlideshowState,
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
  propDecorators: { addSlideshow: [] },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVzaG93LnN0YXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zb2xpZC9zbGlkZXNob3cvc3JjL2xpYi9zdGF0ZS9zbGlkZXNob3cuc3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFnQixNQUFNLGFBQWEsQ0FBQztBQUVwRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFDTCxpQkFBaUIsRUFFakIsVUFBVSxHQUNYLE1BQU0seUJBQXlCLENBQUM7QUFDakMsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBU25DLFdBQU0sY0FBYyxHQUFwQixNQUFNLGNBQWM7SUFFWTtJQUMzQjtJQUZWLFlBQ3FDLE9BQXdCLEVBQ25ELEtBQWlCO1FBRFUsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7UUFDbkQsVUFBSyxHQUFMLEtBQUssQ0FBWTtJQUN4QixDQUFDO0lBRUosY0FBYztJQUNkLDRFQUE0RTtJQUM1RSwyQ0FBMkM7SUFDM0MsMkRBQTJEO0lBQzNELDBCQUEwQjtJQUMxQixrQkFBa0I7SUFDbEIscUNBQXFDO0lBQ3JDLCtCQUErQjtJQUMvQixtQkFBbUI7SUFDbkIsb0VBQW9FO0lBQ3BFLG1EQUFtRDtJQUNuRCxPQUFPO0lBQ1AsZUFBZTtJQUNmLElBQUk7SUFFSixjQUFjO0lBQ2QsdUVBQXVFO0lBQ3ZFLDBCQUEwQjtJQUMxQixxQ0FBcUM7SUFDckMsaUNBQWlDO0lBQ2pDLG1DQUFtQztJQUNuQywyQkFBMkI7SUFDM0Isa0JBQWtCO0lBQ2xCLGlC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QUFDO3lCQUN4QyxDQUFDLENBQUM7cUJBQ0osQ0FBQyxDQUFDO2lCQUNKLENBQUM7WUFDSixDQUFDLENBQUM7WUFDRixPQUFPLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6QixDQUFDLENBQUMsRUFDRixHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNWLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbEQsR0FBRyxDQUFDLFFBQVEsQ0FDVixDQUFDLEdBQUcsWUFBWSxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUMvRCxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNOLENBQUM7dUdBMU5VLGNBQWMsa0JBRWYsaUJBQWlCOzJHQUZoQixjQUFjOztBQWdMbEI7SUFETixNQUFNLENBQUMsWUFBWSxDQUFDOzs2Q0FHTixZQUFZOztrREF3QzFCO0FBaERhO0lBRGIsUUFBUSxFQUFFOzs7OzRDQUlWO0FBN0tVLGNBQWM7SUFMMUIsS0FBSyxDQUFzQjtRQUMxQixJQUFJLEVBQUUsV0FBVztRQUNqQixRQUFRLEVBQUUsRUFBRTtLQUNiLENBQUM7NkNBS2lCLFVBQVU7R0FIaEIsY0FBYyxDQTJOMUI7MkZBM05ZLGNBQWM7a0JBRDFCLFVBQVU7OzBCQUdOLE1BQU07MkJBQUMsaUJBQWlCO3FFQThLcEIsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvbiwgU2VsZWN0b3IsIFN0YXRlLCBTdGF0ZUNvbnRleHQgfSBmcm9tICdAbmd4cy9zdG9yZSc7XHJcbmltcG9ydCB7IFNsaWRlc2hvdywgU2xpZGVzaG93QXBpIH0gZnJvbSAnLi9zbGlkZXNob3cubW9kZWwnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBBZGRTbGlkZXNob3cgfSBmcm9tICcuL3NsaWRlc2hvdy5hY3Rpb25zJztcclxuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgU09MSURfQ09SRV9DT05GSUcsXHJcbiAgU29saWRDb3JlQ29uZmlnLFxyXG4gIEltYWdlTW9kZWwsXHJcbn0gZnJvbSAnQHplbnRydW1uYXdpL3NvbGlkLWNvcmUnO1xyXG5pbXBvcnQgeyB0YXAsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmV4cG9ydCB0eXBlIFNsaWRlc2hvd1N0YXRlTW9kZWwgPSBTbGlkZXNob3dbXTtcclxuXHJcbkBTdGF0ZTxTbGlkZXNob3dTdGF0ZU1vZGVsPih7XHJcbiAgbmFtZTogJ3NsaWRlc2hvdycsXHJcbiAgZGVmYXVsdHM6IFtdLFxyXG59KVxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBTbGlkZXNob3dTdGF0ZSB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBASW5qZWN0KFNPTElEX0NPUkVfQ09ORklHKSBwcml2YXRlIF9jb25maWc6IFNvbGlkQ29yZUNvbmZpZyxcclxuICAgIHByaXZhdGUgX2h0dHA6IEh0dHBDbGllbnRcclxuICApIHt9XHJcblxyXG4gIC8vIEBTZWxlY3RvcigpXHJcbiAgLy8gcHVibGljIHN0YXRpYyBnZXRTbGlkZXNob3dCeUNhdGVnb3JpZXNBbmRJZChzdGF0ZTogU2xpZGVzaG93U3RhdGVNb2RlbCkge1xyXG4gIC8vICAgLy8gVGhpcyByZWR1bmRhbnQgdmFyaWFibGUgaXMgcmVxdWlyZWRcclxuICAvLyAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9uZy1wYWNrYWdyL25nLXBhY2thZ3IvaXNzdWVzLzY5NlxyXG4gIC8vICAgY29uc3QgZm4gPSBmdW5jdGlvbiAoXHJcbiAgLy8gICAgIGlkOiBudW1iZXIsXHJcbiAgLy8gICAgIGNhdGVnb3JpZXM6IHN0cmluZyB8IHVuZGVmaW5lZFxyXG4gIC8vICAgKTogU2xpZGVzaG93IHwgdW5kZWZpbmVkIHtcclxuICAvLyAgICAgcmV0dXJuIHN0YXRlXHJcbiAgLy8gICAgICAgLmZpbHRlcigoc2xpZGVzaG93KSA9PiBzbGlkZXNob3cuY2F0ZWdvcmllcyA9PT0gY2F0ZWdvcmllcylcclxuICAvLyAgICAgICAuZmluZCgoc2xpZGVzaG93KSA9PiBzbGlkZXNob3cuaWQgPT09IGlkKTtcclxuICAvLyAgIH07XHJcbiAgLy8gICByZXR1cm4gZm47XHJcbiAgLy8gfVxyXG5cclxuICAvLyBAU2VsZWN0b3IoKVxyXG4gIC8vIHB1YmxpYyBzdGF0aWMgZ2V0U2xpZGVzaG93QnlDYXRlZ29yaWVzKHN0YXRlOiBTbGlkZXNob3dTdGF0ZU1vZGVsKSB7XHJcbiAgLy8gICBjb25zdCBmbiA9IGZ1bmN0aW9uIChcclxuICAvLyAgICAgY2F0ZWdvcmllczogc3RyaW5nIHwgdW5kZWZpbmVkXHJcbiAgLy8gICApOiBTbGlkZXNob3dbXSB8IHVuZGVmaW5lZCB7XHJcbiAgLy8gICAgIHJldHVybiBzdGF0ZS5maWx0ZXIoKHMpID0+IHtcclxuICAvLyAgICAgICBpZiAoIWNhdGVnb3JpZXMpIHtcclxuICAvLyAgICAgICAgIHJldHVybjtcclxuICAvLyAgICAgICB9IGVsc2Uge1xyXG4gIC8vICAgICAgICAgcmV0dXJuIHMuY2F0ZWdvcmllcyA9PT0gY2F0ZWdvcmllcztcclxuICAvLyAgICAgICB9XHJcbiAgLy8gICAgIH0pO1xyXG4gIC8vICAgfTtcclxuICAvLyAgIHJldHVybiBmbjtcclxuICAvLyB9XHJcbiAgLy8gQFNlbGVjdG9yKClcclxuICAvLyBwdWJsaWMgc3RhdGljIGdldFNsaWRlc2hvd3NCeUNhdGVnb3JpZXMoc3RhdGU6IFNsaWRlc2hvd1N0YXRlTW9kZWwpIHtcclxuICAvLyAgIGNvbnN0IGZuID0gZnVuY3Rpb24gKFxyXG4gIC8vICAgICBjYXRlZ29yaWVzOiBzdHJpbmcgfCB1bmRlZmluZWRcclxuICAvLyAgICk6IFNsaWRlc2hvd1tdIHwgdW5kZWZpbmVkIHtcclxuICAvLyAgICAgcmV0dXJuIHN0YXRlLmZpbHRlcigocykgPT4ge1xyXG4gIC8vICAgICAgIGlmICghY2F0ZWdvcmllcykge1xyXG4gIC8vICAgICAgICAgcmV0dXJuO1xyXG4gIC8vICAgICAgIH0gZWxzZSB7XHJcbiAgLy8gICAgICAgICByZXR1cm4gcy5jYXRlZ29yaWVzID09PSBjYXRlZ29yaWVzO1xyXG4gIC8vICAgICAgIH1cclxuICAvLyAgICAgfSk7XHJcbiAgLy8gICB9O1xyXG4gIC8vICAgcmV0dXJuIGZuO1xyXG4gIC8vIH1cclxuXHJcbiAgLy8gQFNlbGVjdG9yKClcclxuICAvLyBwdWJsaWMgc3RhdGljIFNsaWRlc2hvd0J5Q2F0ZWdvcnlDb3VudGVyKHN0YXRlOiBTbGlkZXNob3dTdGF0ZU1vZGVsKSB7XHJcbiAgLy8gICBjb25zdCBmbiA9IGZ1bmN0aW9uIChjYXRlZ29yaWVzOiBzdHJpbmcgfCB1bmRlZmluZWQpOiBudW1iZXIge1xyXG4gIC8vICAgICByZXR1cm4gc3RhdGUuZmlsdGVyKChzKSA9PiBzLmNhdGVnb3JpZXMgPT09IGNhdGVnb3JpZXMpLmxlbmd0aDtcclxuICAvLyAgIH07XHJcbiAgLy8gICByZXR1cm4gZm47XHJcbiAgLy8gfVxyXG5cclxuICAvLyBAU2VsZWN0b3IoKVxyXG4gIC8vIHB1YmxpYyBzdGF0aWMgZ2V0U2xpZGVzaG93cyhzdGF0ZTogU2xpZGVzaG93U3RhdGVNb2RlbCkge1xyXG4gIC8vICAgLy8gVGhpcyByZWR1bmRhbnQgdmFyaWFibGUgaXMgcmVxdWlyZWRcclxuICAvLyAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9uZy1wYWNrYWdyL25nLXBhY2thZ3IvaXNzdWVzLzY5NlxyXG4gIC8vICAgY29uc3QgZm4gPSAoKSA9PlxyXG4gIC8vICAgICBzdGF0ZS5tYXAoKHMpID0+ICh7XHJcbiAgLy8gICAgICAgaWQ6IHMuaWQsXHJcbiAgLy8gICAgICAgdGl0bGU6IHMudGl0bGUsXHJcbiAgLy8gICAgICAgdGl0bGVfaW1hZ2U6IHMudGl0bGVfaW1hZ2UsXHJcbiAgLy8gICAgICAgcG9zaXRpb246IHMucG9zaXRpb24sXHJcbiAgLy8gICAgICAgY2F0ZWdvcmllczogcy5jYXRlZ29yaWVzLFxyXG4gIC8vICAgICB9KSk7XHJcbiAgLy8gICByZXR1cm4gZm4oKTtcclxuICAvLyB9XHJcblxyXG4gIC8vIEBBY3Rpb24oTG9hZFNsaWRlc2hvdylcclxuICAvLyBwdWJsaWMgbG9hZChjdHg6IFN0YXRlQ29udGV4dDxTbGlkZXNob3dTdGF0ZU1vZGVsPikge1xyXG4gIC8vICAgaWYgKGN0eC5nZXRTdGF0ZSgpLmxlbmd0aCA+IDApIHtcclxuICAvLyAgICAgY29uc29sZS5sb2coY3R4LmdldFN0YXRlKCkpO1xyXG5cclxuICAvLyAgICAgcmV0dXJuO1xyXG4gIC8vICAgfVxyXG4gIC8vICAgcmV0dXJuIHRoaXMuX2h0dHBcclxuICAvLyAgICAgLmdldDxTbGlkZXNob3dbXT4oYCR7dGhpcy5fY29uZmlnLmFwaVVybH0vc2xpZGVzaG93c2ApXHJcbiAgLy8gICAgIC5waXBlKFxyXG4gIC8vICAgICAgIG1hcCgocmVzcG9uc2UpID0+IHtcclxuICAvLyAgICAgICAgIGNvbnN0IG1hcGl0ID0gKGlucHV0OiBTbGlkZXNob3dBcGlbXSk6IFNsaWRlc2hvd1tdID0+IHtcclxuICAvLyAgICAgICAgICAgcmV0dXJuIGlucHV0Lm1hcCgoc2xpZGVzaG93KSA9PiB7XHJcbiAgLy8gICAgICAgICAgICAgcmV0dXJuIHtcclxuICAvLyAgICAgICAgICAgICAgIC4uLnNsaWRlc2hvdyxcclxuICAvLyAgICAgICAgICAgICAgIGNhdGVnb3JpZXM6IHNsaWRlc2hvdy5jYXRlZ29yaWVzWzBdLFxyXG4gIC8vICAgICAgICAgICAgICAgcGFnZXM6IHNsaWRlc2hvdy5wYWdlcy5tYXAoKHBhZ2UpID0+ICh7XHJcbiAgLy8gICAgICAgICAgICAgICAgIC4uLnBhZ2UsXHJcbiAgLy8gICAgICAgICAgICAgICAgIGltYWdlczogcGFnZS5pbWFnZXM/Lm1hcCgoc2xpZGVzaG93SW1nKSA9PiAoe1xyXG4gIC8vICAgICAgICAgICAgICAgICAgIC4uLnNsaWRlc2hvd0ltZyxcclxuICAvLyAgICAgICAgICAgICAgICAgICBpbWc6IG5ldyBJbWFnZU1vZGVsKHNsaWRlc2hvd0ltZy5pbWFnZSksXHJcbiAgLy8gICAgICAgICAgICAgICAgIH0pKSxcclxuICAvLyAgICAgICAgICAgICAgIH0pKSxcclxuICAvLyAgICAgICAgICAgICB9O1xyXG4gIC8vICAgICAgICAgICB9KTtcclxuICAvLyAgICAgICAgIH07XHJcbiAgLy8gICAgICAgICByZXR1cm4gbWFwaXQocmVzcG9uc2UpO1xyXG4gIC8vICAgICAgIH0pLFxyXG4gIC8vICAgICAgIHRhcCgocmVzKSA9PiB7XHJcbiAgLy8gICAgICAgICBjdHguc2V0U3RhdGUoW1xyXG4gIC8vICAgICAgICAgICAuLi5yZXMubWFwKChzbGlkZXNob3cpID0+IHtcclxuICAvLyAgICAgICAgICAgICBzbGlkZXNob3cucGFnZXMgPSBzbGlkZXNob3cucGFnZXMuc29ydChcclxuICAvLyAgICAgICAgICAgICAgIChhLCBiKSA9PiBhLnBvc2l0aW9uIC0gYi5wb3NpdGlvblxyXG4gIC8vICAgICAgICAgICAgICk7XHJcbiAgLy8gICAgICAgICAgICAgcmV0dXJuIHNsaWRlc2hvdztcclxuICAvLyAgICAgICAgICAgfSksXHJcbiAgLy8gICAgICAgICBdKTtcclxuICAvLyAgICAgICB9KVxyXG4gIC8vICAgICApO1xyXG4gIC8vIH1cclxuXHJcbiAgLy8gQFNlbGVjdG9yKClcclxuICAvLyBwdWJsaWMgc3RhdGljIGdldFNsaWRlc2hvd3Moc3RhdGU6IFNsaWRlc2hvd1N0YXRlTW9kZWwpIHtcclxuICAvLyAgIHJldHVybiBbLi4uc3RhdGVdO1xyXG4gIC8vIH1cclxuXHJcbiAgLy8gQFNlbGVjdG9yKClcclxuICAvLyBwdWJsaWMgc3RhdGljIGdldFNsaWRlc2hvdyhzdGF0ZTogU2xpZGVzaG93U3RhdGVNb2RlbCkge1xyXG4gIC8vICAgY29uc3QgZm4gPSAoc2xpZGVzaG93SWQ6IG51bWJlcik6IFNsaWRlc2hvdyA9PlxyXG4gIC8vICAgICBzdGF0ZS5maWx0ZXIoKHMpID0+IHMuaWQgPT09IHNsaWRlc2hvd0lkKVswXTtcclxuICAvLyAgIHJldHVybiBmbjtcclxuICAvLyB9XHJcblxyXG4gIC8vIEBBY3Rpb24oTG9hZFNsaWRlc2hvdylcclxuICAvLyBwdWJsaWMgbG9hZFBhZ2UoXHJcbiAgLy8gICBjdHg6IFN0YXRlQ29udGV4dDxTbGlkZXNob3dTdGF0ZU1vZGVsPixcclxuICAvLyApIHtcclxuICAvLyAgIGlmIChjdHguZ2V0U3RhdGUoKS5sZW5ndGggPiAwKSB7XHJcbiAgLy8gICAgIHJldHVybjtcclxuICAvLyAgIH1cclxuICAvLyAgIHJldHVybiB0aGlzLl9odHRwXHJcbiAgLy8gICAgIC5nZXQ8U2xpZGVzaG93PihgJHt0aGlzLl9jb25maWcuYXBpVXJsfS9zbGlkZXNob3dzYClcclxuICAvLyAgICAgLnBpcGUoXHJcbiAgLy8gICAgICAgbWFwKChyZXNwb25zZSkgPT4ge1xyXG4gIC8vICAgICAgICAgY29uc3QgbWFwaXQgPSAoc2xpZGVzaG93OiBTbGlkZXNob3dBcGkpOiBTbGlkZXNob3cgPT4ge1xyXG4gIC8vICAgICAgICAgICAvLyByZXR1cm4gaW5wdXQubWFwKChzbGlkZXNob3cpID0+IHtcclxuICAvLyAgICAgICAgICAgcmV0dXJuIHtcclxuICAvLyAgICAgICAgICAgICAuLi5zbGlkZXNob3csXHJcbiAgLy8gICAgICAgICAgICAgY2F0ZWdvcmllczogc2xpZGVzaG93LmNhdGVnb3JpZXMsXHJcbiAgLy8gICAgICAgICAgICAgcGFnZXM6IHNsaWRlc2hvdy5wYWdlcy5tYXAoKHBhZ2UpID0+ICh7XHJcbiAgLy8gICAgICAgICAgICAgICAuLi5wYWdlLFxyXG4gIC8vICAgICAgICAgICAgICAgaW1hZ2VzOiBwYWdlLmltYWdlcz8ubWFwKChzbGlkZXNob3dJbWcpID0+ICh7XHJcbiAgLy8gICAgICAgICAgICAgICAgIC4uLnNsaWRlc2hvd0ltZyxcclxuICAvLyAgICAgICAgICAgICAgICAgaW1nOiBuZXcgSW1hZ2VNb2RlbChzbGlkZXNob3dJbWcuaW1hZ2UpLFxyXG4gIC8vICAgICAgICAgICAgICAgfSkpLFxyXG4gIC8vICAgICAgICAgICAgIH0pKSxcclxuICAvLyAgICAgICAgICAgfTtcclxuICAvLyAgICAgICAgICAgLy8gfSk7XHJcbiAgLy8gICAgICAgICB9O1xyXG4gIC8vICAgICAgICAgcmV0dXJuIG1hcGl0KHJlc3BvbnNlKTtcclxuICAvLyAgICAgICB9KSxcclxuICAvLyAgICAgICB0YXAoKHJlcykgPT4ge1xyXG4gIC8vICAgICAgICAgLy8gY3R4LnNldFN0YXRlKFtcclxuICAvLyAgICAgICAgIC8vICAgLi4ucmVzLm1hcCgoc2xpZGVzaG93KSA9PiB7XHJcbiAgLy8gICAgICAgICAvLyAgICAgc2xpZGVzaG93LnBhZ2VzID0gc2xpZGVzaG93LnBhZ2VzLnNvcnQoXHJcbiAgLy8gICAgICAgICAvLyAgICAgICAoYSwgYikgPT4gYS5wb3NpdGlvbiAtIGIucG9zaXRpb25cclxuICAvLyAgICAgICAgIC8vICAgICApO1xyXG4gIC8vICAgICAgICAgLy8gICAgIHJldHVybiBzbGlkZXNob3c7XHJcbiAgLy8gICAgICAgICAvLyAgIH0pLFxyXG4gIC8vICAgICAgICAgLy8gXSk7XHJcbiAgLy8gICAgICAgfSlcclxuICAvLyAgICAgKTtcclxuICAvLyB9XHJcblxyXG4gIEBTZWxlY3RvcigpXHJcbiAgcHVibGljIHN0YXRpYyBnZXRTbGlkZXNob3dCeUlkKHN0YXRlOiBTbGlkZXNob3dTdGF0ZU1vZGVsKSB7XHJcbiAgICByZXR1cm4gKHNsaWRlc2hvd0lkOiBzdHJpbmcpOiBTbGlkZXNob3cgPT5cclxuICAgICAgc3RhdGUuZmlsdGVyKChzKSA9PiBzLmlkID09PSBOdW1iZXIucGFyc2VJbnQoc2xpZGVzaG93SWQpKVswXTtcclxuICB9XHJcblxyXG4gIEBBY3Rpb24oQWRkU2xpZGVzaG93KVxyXG4gIHB1YmxpYyBhZGRTbGlkZXNob3coXHJcbiAgICBjdHg6IFN0YXRlQ29udGV4dDxTbGlkZXNob3dTdGF0ZU1vZGVsPixcclxuICAgIHsgcGF5bG9hZCB9OiBBZGRTbGlkZXNob3dcclxuICApIHtcclxuICAgIGNvbnN0IGN1cnJlbnRTdGF0ZSA9IGN0eC5nZXRTdGF0ZSgpO1xyXG4gICAgaWYgKGN1cnJlbnRTdGF0ZS5zb21lKChzbCkgPT4gc2wuaWQgPT09IE51bWJlci5wYXJzZUludChwYXlsb2FkKSkpIHtcclxuICAgICAgLy8gaWYgc2xpZGVzaG93IGlzIGV4aXN0ZWQgaW4gdGhlIHN0YXRlXHJcbiAgICAgIC8vIHRvIHNlZSB0aGUgZGF0YSBpcyB0YWtlbiBmcm9tIHN0YXRlXHJcbiAgICAgIGNvbnNvbGUubG9nKCdzbGlkZXNob3cgbm90IGNhbGwgYXBpJyk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLl9odHRwXHJcbiAgICAgIC5nZXQ8U2xpZGVzaG93PihgJHt0aGlzLl9jb25maWcuYXBpVXJsfS9zbGlkZXNob3dzLyR7cGF5bG9hZH1gKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBtYXAoKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAvLyBpZiBzbGlkZXNob3cgaXMgbm90IGV4aXN0ZWQgaW4gdGhlIHN0YXRlXHJcbiAgICAgICAgICAvLyB0byBzZWUgdGhlIGRhdGEgaXMgdGFrZW4gZnJvbSBBUEksIGNhbGwgQVBJXHJcbiAgICAgICAgICBjb25zb2xlLmxvZygnc2xpZGVzaG93IGNhbGwgYXBpJyk7XHJcbiAgICAgICAgICBjb25zdCBtYXBpdCA9IChzbGlkZXNob3c6IFNsaWRlc2hvd0FwaSk6IFNsaWRlc2hvdyA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgaWQ6IHNsaWRlc2hvdy5pZCxcclxuICAgICAgICAgICAgICB0aXRsZTogc2xpZGVzaG93LnRpdGxlLFxyXG4gICAgICAgICAgICAgIHBvc2l0aW9uOiBzbGlkZXNob3cucG9zaXRpb24sXHJcbiAgICAgICAgICAgICAgY2F0ZWdvcmllczogc2xpZGVzaG93LmNhdGVnb3JpZXMsXHJcbiAgICAgICAgICAgICAgcGFnZXM6IHNsaWRlc2hvdy5wYWdlcy5tYXAoKHBhZ2UpID0+ICh7XHJcbiAgICAgICAgICAgICAgICAuLi5wYWdlLFxyXG4gICAgICAgICAgICAgICAgaW1hZ2VzOiBwYWdlLmltYWdlcz8ubWFwKChzbGlkZXNob3dJbWcpID0+ICh7XHJcbiAgICAgICAgICAgICAgICAgIC4uLnNsaWRlc2hvd0ltZyxcclxuICAgICAgICAgICAgICAgICAgaW1nOiBuZXcgSW1hZ2VNb2RlbChzbGlkZXNob3dJbWcuaW1hZ2UpLFxyXG4gICAgICAgICAgICAgICAgfSkpLFxyXG4gICAgICAgICAgICAgIH0pKSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICByZXR1cm4gbWFwaXQocmVzcG9uc2UpO1xyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIHRhcCgocmVzKSA9PiB7XHJcbiAgICAgICAgICByZXMucGFnZXMuc29ydCgoYSwgYikgPT4gYS5wb3NpdGlvbiAtIGIucG9zaXRpb24pO1xyXG4gICAgICAgICAgY3R4LnNldFN0YXRlKFxyXG4gICAgICAgICAgICBbLi4uY3VycmVudFN0YXRlLCByZXNdLnNvcnQoKGEsIGIpID0+IGEucG9zaXRpb24gLSBiLnBvc2l0aW9uKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=
