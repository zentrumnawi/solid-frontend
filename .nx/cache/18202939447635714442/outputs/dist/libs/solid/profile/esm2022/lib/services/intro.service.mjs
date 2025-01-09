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
import { Inject, Injectable } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Navigate } from '@ngxs/router-plugin';
import { SOLID_CORE_CONFIG } from '@zentrumnawi/solid-core';
import introJs from 'intro.js';
import * as i0 from '@angular/core';
export class IntroService {
  config;
  introProfile;
  location;
  constructor(config) {
    this.config = config;
    this.location = config.profileTour.location.profileTree;
  }
  static async navigateTo(url) {
    return new Navigate([url]);
  }
  profileTour(callback) {
    this.introProfile = introJs();
    this.introProfile
      .setOptions({
        tooltipClass: 'customTooltip',
        steps: this.config.profileTour.steps,
        exitOnOverlayClick: false,
        hidePrev: true,
        hideNext: true,
      })
      .onbeforechange(callback)
      .start();
    localStorage.setItem('hide_profile_tour', 'true');
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: IntroService,
    deps: [{ token: SOLID_CORE_CONFIG }],
    target: i0.ɵɵFactoryTarget.Injectable,
  });
  static ɵprov = i0.ɵɵngDeclareInjectable({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: IntroService,
    providedIn: 'root',
  });
}
__decorate(
  [
    Dispatch(),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String]),
    __metadata('design:returntype', Promise),
  ],
  IntroService,
  'navigateTo',
  null
);
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: IntroService,
  decorators: [
    {
      type: Injectable,
      args: [{ providedIn: 'root' }],
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
    ];
  },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50cm8uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc29saWQvcHJvZmlsZS9zcmMvbGliL3NlcnZpY2VzL2ludHJvLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMvQyxPQUFPLEVBQW1CLGlCQUFpQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDN0UsT0FBTyxPQUFPLE1BQU0sVUFBVSxDQUFDOztBQUcvQixNQUFNLE9BQU8sWUFBWTtJQUl1QjtJQUg5QyxZQUFZLENBQU07SUFDbEIsUUFBUSxDQUFTO0lBRWpCLFlBQThDLE1BQXVCO1FBQXZCLFdBQU0sR0FBTixNQUFNLENBQWlCO1FBQ25FLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDO0lBQzFELENBQUM7SUFHWSxBQUFiLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEdBQVc7UUFDakMsT0FBTyxJQUFJLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELFdBQVcsQ0FBQyxRQUErQjtRQUN6QyxJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxZQUFZO2FBQ2QsVUFBVSxDQUFDO1lBQ1YsWUFBWSxFQUFFLGVBQWU7WUFDN0IsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUs7WUFDcEMsa0JBQWtCLEVBQUUsS0FBSztZQUN6QixRQUFRLEVBQUUsSUFBSTtZQUNkLFFBQVEsRUFBRSxJQUFJO1NBQ2YsQ0FBQzthQUNELGNBQWMsQ0FBQyxRQUFRLENBQUM7YUFDeEIsS0FBSyxFQUFFLENBQUM7UUFDWCxZQUFZLENBQUMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3BELENBQUM7dUdBMUJVLFlBQVksa0JBSUgsaUJBQWlCOzJHQUoxQixZQUFZLGNBREMsTUFBTTs7QUFVakI7SUFEWixRQUFRLEVBQUU7Ozs7b0NBR1Y7MkZBWFUsWUFBWTtrQkFEeEIsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUU7OzBCQUtuQixNQUFNOzJCQUFDLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBEaXNwYXRjaCB9IGZyb20gJ0BuZ3hzLWxhYnMvZGlzcGF0Y2gtZGVjb3JhdG9yJztcclxuaW1wb3J0IHsgTmF2aWdhdGUgfSBmcm9tICdAbmd4cy9yb3V0ZXItcGx1Z2luJztcclxuaW1wb3J0IHsgU29saWRDb3JlQ29uZmlnLCBTT0xJRF9DT1JFX0NPTkZJRyB9IGZyb20gJ0B6ZW50cnVtbmF3aS9zb2xpZC1jb3JlJztcclxuaW1wb3J0IGludHJvSnMgZnJvbSAnaW50cm8uanMnO1xyXG5cclxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcclxuZXhwb3J0IGNsYXNzIEludHJvU2VydmljZSB7XHJcbiAgaW50cm9Qcm9maWxlOiBhbnk7XHJcbiAgbG9jYXRpb246IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IoQEluamVjdChTT0xJRF9DT1JFX0NPTkZJRykgcHVibGljIGNvbmZpZzogU29saWRDb3JlQ29uZmlnKSB7XHJcbiAgICB0aGlzLmxvY2F0aW9uID0gY29uZmlnLnByb2ZpbGVUb3VyLmxvY2F0aW9uLnByb2ZpbGVUcmVlO1xyXG4gIH1cclxuXHJcbiAgQERpc3BhdGNoKClcclxuICBzdGF0aWMgYXN5bmMgbmF2aWdhdGVUbyh1cmw6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIG5ldyBOYXZpZ2F0ZShbdXJsXSk7XHJcbiAgfVxyXG5cclxuICBwcm9maWxlVG91cihjYWxsYmFjazogKHRhcmdldDogYW55KSA9PiB2b2lkKSB7XHJcbiAgICB0aGlzLmludHJvUHJvZmlsZSA9IGludHJvSnMoKTtcclxuICAgIHRoaXMuaW50cm9Qcm9maWxlXHJcbiAgICAgIC5zZXRPcHRpb25zKHtcclxuICAgICAgICB0b29sdGlwQ2xhc3M6ICdjdXN0b21Ub29sdGlwJyxcclxuICAgICAgICBzdGVwczogdGhpcy5jb25maWcucHJvZmlsZVRvdXIuc3RlcHMsXHJcbiAgICAgICAgZXhpdE9uT3ZlcmxheUNsaWNrOiBmYWxzZSxcclxuICAgICAgICBoaWRlUHJldjogdHJ1ZSxcclxuICAgICAgICBoaWRlTmV4dDogdHJ1ZSxcclxuICAgICAgfSlcclxuICAgICAgLm9uYmVmb3JlY2hhbmdlKGNhbGxiYWNrKVxyXG4gICAgICAuc3RhcnQoKTtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdoaWRlX3Byb2ZpbGVfdG91cicsICd0cnVlJyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
