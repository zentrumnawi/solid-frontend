import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SOLID_SKELETON_CONFIG } from '../../solid-skeleton-config';
import * as i0 from '@angular/core';
import * as i1 from '@angular/material/dialog';
import * as i2 from '@angular/common';
import * as i3 from '@angular/material/button';
import * as i4 from '@angular/material/icon';
export class PrivacyDialogComponent {
  _ref;
  PrivacyContentComponent;
  constructor(_ref, cfg) {
    this._ref = _ref;
    this.PrivacyContentComponent = cfg.privacyContent;
  }
  onCancelClick() {
    this._ref.close();
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: PrivacyDialogComponent,
    deps: [{ token: i1.MatDialogRef }, { token: SOLID_SKELETON_CONFIG }],
    target: i0.ɵɵFactoryTarget.Component,
  });
  static ɵcmp = i0.ɵɵngDeclareComponent({
    minVersion: '14.0.0',
    version: '16.2.9',
    type: PrivacyDialogComponent,
    selector: 'solid-skeleton-privacy-dialog',
    ngImport: i0,
    template:
      '<div class="header-container">\r\n  <p class="title">Datenschutzerkl\u00E4rung</p>\r\n  <button class="closeBtn" mat-icon-button mat-dialog-close>\r\n    <mat-icon>close</mat-icon>\r\n  </button>\r\n</div>\r\n<div class="content-container" mat-dialog-content>\r\n  <ng-container *ngComponentOutlet="PrivacyContentComponent"></ng-container>\r\n</div>\r\n',
    styles: [
      '::ng-deep .privacy-dialog h1.title{display:none}::ng-deep .privacy-dialog .mat-dialog-content{font-size:13px;padding:0 0 0 3px}@media (max-width: 420px){.header-container{width:100%!important}}.header-container{display:flex;justify-content:space-between;position:fixed;width:800px;height:40px;margin-top:-24px;margin-left:-24px;border-top-left-radius:4px;border-top-right-radius:4px;color:#fff}.header-container p.title{margin-left:19px;margin-top:8px;font-weight:500;font-size:18px}.header-container .closeBtn{width:23px;margin-top:8px;margin-right:8px}.header-container .closeBtn mat-icon{vertical-align:top;font-size:25px;font-weight:600}.header-container .closeBtn ::ng-deep .mat-button-focus-overlay{background-color:transparent}\n',
    ],
    dependencies: [
      {
        kind: 'directive',
        type: i2.NgComponentOutlet,
        selector: '[ngComponentOutlet]',
        inputs: [
          'ngComponentOutlet',
          'ngComponentOutletInputs',
          'ngComponentOutletInjector',
          'ngComponentOutletContent',
          'ngComponentOutletNgModule',
          'ngComponentOutletNgModuleFactory',
        ],
      },
      {
        kind: 'component',
        type: i3.MatIconButton,
        selector: 'button[mat-icon-button]',
        inputs: ['disabled', 'disableRipple', 'color'],
        exportAs: ['matButton'],
      },
      {
        kind: 'directive',
        type: i1.MatDialogClose,
        selector: '[mat-dialog-close], [matDialogClose]',
        inputs: ['aria-label', 'type', 'mat-dialog-close', 'matDialogClose'],
        exportAs: ['matDialogClose'],
      },
      {
        kind: 'directive',
        type: i1.MatDialogContent,
        selector:
          '[mat-dialog-content], mat-dialog-content, [matDialogContent]',
      },
      {
        kind: 'component',
        type: i4.MatIcon,
        selector: 'mat-icon',
        inputs: ['color', 'inline', 'svgIcon', 'fontSet', 'fontIcon'],
        exportAs: ['matIcon'],
      },
    ],
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: PrivacyDialogComponent,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'solid-skeleton-privacy-dialog',
          template:
            '<div class="header-container">\r\n  <p class="title">Datenschutzerkl\u00E4rung</p>\r\n  <button class="closeBtn" mat-icon-button mat-dialog-close>\r\n    <mat-icon>close</mat-icon>\r\n  </button>\r\n</div>\r\n<div class="content-container" mat-dialog-content>\r\n  <ng-container *ngComponentOutlet="PrivacyContentComponent"></ng-container>\r\n</div>\r\n',
          styles: [
            '::ng-deep .privacy-dialog h1.title{display:none}::ng-deep .privacy-dialog .mat-dialog-content{font-size:13px;padding:0 0 0 3px}@media (max-width: 420px){.header-container{width:100%!important}}.header-container{display:flex;justify-content:space-between;position:fixed;width:800px;height:40px;margin-top:-24px;margin-left:-24px;border-top-left-radius:4px;border-top-right-radius:4px;color:#fff}.header-container p.title{margin-left:19px;margin-top:8px;font-weight:500;font-size:18px}.header-container .closeBtn{width:23px;margin-top:8px;margin-right:8px}.header-container .closeBtn mat-icon{vertical-align:top;font-size:25px;font-weight:600}.header-container .closeBtn ::ng-deep .mat-button-focus-overlay{background-color:transparent}\n',
          ],
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [
      { type: i1.MatDialogRef },
      {
        type: undefined,
        decorators: [
          {
            type: Inject,
            args: [SOLID_SKELETON_CONFIG],
          },
        ],
      },
    ];
  },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpdmFjeS1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zb2xpZC9za2VsZXRvbi9zcmMvbGliL2NvbXBvbmVudHMvcHJpdmFjeS1kaWFsb2cvcHJpdmFjeS1kaWFsb2cuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zb2xpZC9za2VsZXRvbi9zcmMvbGliL2NvbXBvbmVudHMvcHJpdmFjeS1kaWFsb2cvcHJpdmFjeS1kaWFsb2cuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQVEsTUFBTSxlQUFlLENBQUM7QUFDeEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3hELE9BQU8sRUFFTCxxQkFBcUIsR0FDdEIsTUFBTSw2QkFBNkIsQ0FBQzs7Ozs7O0FBT3JDLE1BQU0sT0FBTyxzQkFBc0I7SUFJdkI7SUFISCx1QkFBdUIsQ0FBWTtJQUUxQyxZQUNVLElBQTBDLEVBQ25CLEdBQWdDO1FBRHZELFNBQUksR0FBSixJQUFJLENBQXNDO1FBR2xELElBQUksQ0FBQyx1QkFBdUIsR0FBRyxHQUFHLENBQUMsY0FBYyxDQUFDO0lBQ3BELENBQUM7SUFFTSxhQUFhO1FBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDcEIsQ0FBQzt1R0FaVSxzQkFBc0IsOENBS3ZCLHFCQUFxQjsyRkFMcEIsc0JBQXNCLHFFQ1puQyw2V0FTQTs7MkZER2Esc0JBQXNCO2tCQUxsQyxTQUFTOytCQUNFLCtCQUErQjs7MEJBU3RDLE1BQU07MkJBQUMscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3QsIFR5cGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTWF0RGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcclxuaW1wb3J0IHtcclxuICBJbnRlcm5hbFNvbGlkU2tlbGV0b25Db25maWcsXHJcbiAgU09MSURfU0tFTEVUT05fQ09ORklHLFxyXG59IGZyb20gJy4uLy4uL3NvbGlkLXNrZWxldG9uLWNvbmZpZyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3NvbGlkLXNrZWxldG9uLXByaXZhY3ktZGlhbG9nJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vcHJpdmFjeS1kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3ByaXZhY3ktZGlhbG9nLmNvbXBvbmVudC5zY3NzJ10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQcml2YWN5RGlhbG9nQ29tcG9uZW50IHtcclxuICBwdWJsaWMgUHJpdmFjeUNvbnRlbnRDb21wb25lbnQ6IFR5cGU8YW55PjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIF9yZWY6IE1hdERpYWxvZ1JlZjxQcml2YWN5RGlhbG9nQ29tcG9uZW50PixcclxuICAgIEBJbmplY3QoU09MSURfU0tFTEVUT05fQ09ORklHKSBjZmc6IEludGVybmFsU29saWRTa2VsZXRvbkNvbmZpZ1xyXG4gICkge1xyXG4gICAgdGhpcy5Qcml2YWN5Q29udGVudENvbXBvbmVudCA9IGNmZy5wcml2YWN5Q29udGVudDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvbkNhbmNlbENsaWNrKCkge1xyXG4gICAgdGhpcy5fcmVmLmNsb3NlKCk7XHJcbiAgfVxyXG59XHJcbiIsIjxkaXYgY2xhc3M9XCJoZWFkZXItY29udGFpbmVyXCI+XHJcbiAgPHAgY2xhc3M9XCJ0aXRsZVwiPkRhdGVuc2NodXR6ZXJrbMOkcnVuZzwvcD5cclxuICA8YnV0dG9uIGNsYXNzPVwiY2xvc2VCdG5cIiBtYXQtaWNvbi1idXR0b24gbWF0LWRpYWxvZy1jbG9zZT5cclxuICAgIDxtYXQtaWNvbj5jbG9zZTwvbWF0LWljb24+XHJcbiAgPC9idXR0b24+XHJcbjwvZGl2PlxyXG48ZGl2IGNsYXNzPVwiY29udGVudC1jb250YWluZXJcIiBtYXQtZGlhbG9nLWNvbnRlbnQ+XHJcbiAgPG5nLWNvbnRhaW5lciAqbmdDb21wb25lbnRPdXRsZXQ9XCJQcml2YWN5Q29udGVudENvbXBvbmVudFwiPjwvbmctY29udGFpbmVyPlxyXG48L2Rpdj5cclxuIl19
