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
  introJS;
  constructor(config) {
    this.config = config;
  }
  static async navigateTo(url) {
    return new Navigate([url]);
  }
  guidedTour(callback) {
    this.introJS = introJs();
    if (
      localStorage.getItem('hide_landing_tour') == 'false' ||
      localStorage.getItem('hide_landing_tour') == null
    ) {
      this.introJS
        .setOptions({
          tooltipClass: 'customTooltip',
          steps: this.config.guidedTour.steps.filter(function (step) {
            if (step.element) {
              const id = step.element.slice(1, step.element.length);
              const element = document.getElementById(id);
              if (element != null || id == 'welcome' || id == 'end-tour') {
                return step.element;
              }
            }
          }),
          exitOnOverlayClick: false,
          hidePrev: true,
          hideNext: true,
        })
        .onbeforechange(callback)
        .start();
      localStorage.setItem('hide_landing_tour', 'true');
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50cm8uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc29saWQvc2tlbGV0b24vc3JjL2xpYi9zZXJ2aWNlcy9pbnRyby5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDL0MsT0FBTyxFQUFtQixpQkFBaUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzdFLE9BQU8sT0FBTyxNQUFNLFVBQVUsQ0FBQzs7QUFHL0IsTUFBTSxPQUFPLFlBQVk7SUFHdUI7SUFGOUMsT0FBTyxDQUFNO0lBRWIsWUFBOEMsTUFBdUI7UUFBdkIsV0FBTSxHQUFOLE1BQU0sQ0FBaUI7SUFBRyxDQUFDO0lBRzVELEFBQWIsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBVztRQUNqQyxPQUFPLElBQUksUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsVUFBVSxDQUFDLFFBQStCO1FBQ3hDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxFQUFFLENBQUM7UUFDekIsSUFDRSxZQUFZLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLElBQUksT0FBTztZQUNwRCxZQUFZLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLElBQUksSUFBSSxFQUNqRDtZQUNBLElBQUksQ0FBQyxPQUFPO2lCQUNULFVBQVUsQ0FBQztnQkFDVixZQUFZLEVBQUUsZUFBZTtnQkFDN0IsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBVSxJQUFTO29CQUM1RCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7d0JBQ2hCLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUN0RCxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUM1QyxJQUFJLE9BQU8sSUFBSSxJQUFJLElBQUksRUFBRSxJQUFJLFNBQVMsSUFBSSxFQUFFLElBQUksVUFBVSxFQUFFOzRCQUMxRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7eUJBQ3JCO3FCQUNGO2dCQUNILENBQUMsQ0FBQztnQkFDRixrQkFBa0IsRUFBRSxLQUFLO2dCQUN6QixRQUFRLEVBQUUsSUFBSTtnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNmLENBQUM7aUJBQ0QsY0FBYyxDQUFDLFFBQVEsQ0FBQztpQkFDeEIsS0FBSyxFQUFFLENBQUM7WUFDWCxZQUFZLENBQUMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ25EO0lBQ0gsQ0FBQzt1R0FwQ1UsWUFBWSxrQkFHSCxpQkFBaUI7MkdBSDFCLFlBQVksY0FEQyxNQUFNOztBQU9qQjtJQURaLFFBQVEsRUFBRTs7OztvQ0FHVjsyRkFSVSxZQUFZO2tCQUR4QixVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7MEJBSW5CLE1BQU07MkJBQUMsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERpc3BhdGNoIH0gZnJvbSAnQG5neHMtbGFicy9kaXNwYXRjaC1kZWNvcmF0b3InO1xyXG5pbXBvcnQgeyBOYXZpZ2F0ZSB9IGZyb20gJ0BuZ3hzL3JvdXRlci1wbHVnaW4nO1xyXG5pbXBvcnQgeyBTb2xpZENvcmVDb25maWcsIFNPTElEX0NPUkVfQ09ORklHIH0gZnJvbSAnQHplbnRydW1uYXdpL3NvbGlkLWNvcmUnO1xyXG5pbXBvcnQgaW50cm9KcyBmcm9tICdpbnRyby5qcyc7XHJcblxyXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxyXG5leHBvcnQgY2xhc3MgSW50cm9TZXJ2aWNlIHtcclxuICBpbnRyb0pTOiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoU09MSURfQ09SRV9DT05GSUcpIHB1YmxpYyBjb25maWc6IFNvbGlkQ29yZUNvbmZpZykge31cclxuXHJcbiAgQERpc3BhdGNoKClcclxuICBzdGF0aWMgYXN5bmMgbmF2aWdhdGVUbyh1cmw6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIG5ldyBOYXZpZ2F0ZShbdXJsXSk7XHJcbiAgfVxyXG5cclxuICBndWlkZWRUb3VyKGNhbGxiYWNrOiAodGFyZ2V0OiBhbnkpID0+IHZvaWQpIHtcclxuICAgIHRoaXMuaW50cm9KUyA9IGludHJvSnMoKTtcclxuICAgIGlmIChcclxuICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2hpZGVfbGFuZGluZ190b3VyJykgPT0gJ2ZhbHNlJyB8fFxyXG4gICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaGlkZV9sYW5kaW5nX3RvdXInKSA9PSBudWxsXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5pbnRyb0pTXHJcbiAgICAgICAgLnNldE9wdGlvbnMoe1xyXG4gICAgICAgICAgdG9vbHRpcENsYXNzOiAnY3VzdG9tVG9vbHRpcCcsXHJcbiAgICAgICAgICBzdGVwczogdGhpcy5jb25maWcuZ3VpZGVkVG91ci5zdGVwcy5maWx0ZXIoZnVuY3Rpb24gKHN0ZXA6IGFueSkge1xyXG4gICAgICAgICAgICBpZiAoc3RlcC5lbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgY29uc3QgaWQgPSBzdGVwLmVsZW1lbnQuc2xpY2UoMSwgc3RlcC5lbGVtZW50Lmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcclxuICAgICAgICAgICAgICBpZiAoZWxlbWVudCAhPSBudWxsIHx8IGlkID09ICd3ZWxjb21lJyB8fCBpZCA9PSAnZW5kLXRvdXInKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RlcC5lbGVtZW50O1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSksXHJcbiAgICAgICAgICBleGl0T25PdmVybGF5Q2xpY2s6IGZhbHNlLFxyXG4gICAgICAgICAgaGlkZVByZXY6IHRydWUsXHJcbiAgICAgICAgICBoaWRlTmV4dDogdHJ1ZSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5vbmJlZm9yZWNoYW5nZShjYWxsYmFjaylcclxuICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2hpZGVfbGFuZGluZ190b3VyJywgJ3RydWUnKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19
