import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SOLID_CORE_CONFIG } from '@zentrumnawi/solid-core';
import * as i0 from '@angular/core';
import * as i1 from '@angular/material/dialog';
import * as i2 from '@angular/common';
import * as i3 from '@zentrumnawi/solid-core';
import * as i4 from '@angular/material/button';
import * as i5 from '@angular/material/card';
import * as i6 from '@angular/material/slide-toggle';
export class LandingBannerDialogComponent {
  _ref;
  coreConfig;
  landingInfo;
  constructor(_ref, coreConfig) {
    this._ref = _ref;
    this.coreConfig = coreConfig;
    _ref.disableClose = true;
    this.landingInfo = coreConfig.landingBannerContent;
    localStorage.setItem('hide_landing_tour', 'false');
  }
  onCloseClick() {
    this._ref.close();
  }
  onNotShowAgainToggle(change) {
    if (change.checked) localStorage.setItem('hide_landing_banner', 'true');
    else localStorage.setItem('hide_landing_banner', 'false');
  }
  onStartTourToggle(change) {
    if (change.checked) localStorage.setItem('hide_landing_tour', 'false');
    else localStorage.setItem('hide_landing_tour', 'true');
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: LandingBannerDialogComponent,
    deps: [{ token: i1.MatDialogRef }, { token: SOLID_CORE_CONFIG }],
    target: i0.ɵɵFactoryTarget.Component,
  });
  static ɵcmp = i0.ɵɵngDeclareComponent({
    minVersion: '14.0.0',
    version: '16.2.9',
    type: LandingBannerDialogComponent,
    selector: 'solid-skeleton-landing-banner-dialog',
    ngImport: i0,
    template:
      '<div class="content-container" mat-dialog-content>\r\n  <mat-card-header class="header">\r\n    <img class="image" mat-card-avatar [src]="landingInfo.header.image" />\r\n    <mat-card-title class="title">{{\r\n      landingInfo.header.title\r\n    }}</mat-card-title>\r\n    <mat-card-subtitle class="subtitle">\r\n      {{ landingInfo.header.subtitle }}</mat-card-subtitle\r\n    >\r\n  </mat-card-header>\r\n  <mat-card-content class="content" *ngFor="let content of landingInfo.content">\r\n    <p [data]="content.p" markdown></p>\r\n  </mat-card-content>\r\n  <div class="toggle-container">\r\n    <mat-slide-toggle\r\n      class="notShowAgainToggle"\r\n      (change)="onNotShowAgainToggle($event)"\r\n      >Nicht mehr zeigen</mat-slide-toggle\r\n    >\r\n    <mat-slide-toggle\r\n      class="startTourToggle"\r\n      checked="true"\r\n      (change)="onStartTourToggle($event)"\r\n    >\r\n      Tour starten\r\n    </mat-slide-toggle>\r\n  </div>\r\n  <div class="button-container">\r\n    <button\r\n      class="closeBtn"\r\n      mat-stroked-button\r\n      color="primary"\r\n      (click)="onCloseClick()"\r\n    >\r\n      Schlie\u00DFen\r\n    </button>\r\n  </div>\r\n</div>\r\n',
    styles: [
      '::ng-deep .landing-banner-dialog{max-width:90vw!important;border-radius:15px}::ng-deep .landing-banner-dialog mat-dialog-container{padding:18px;border-radius:10px;overflow:hidden}@media (min-width: 570px) and (max-width: 699px){::ng-deep .landing-banner-dialog .content-container{max-width:500px!important}::ng-deep .landing-banner-dialog .content-container .header{margin-bottom:14px}::ng-deep .landing-banner-dialog .content-container .header .image{height:55px;width:55px;margin-right:15px}::ng-deep .landing-banner-dialog .content-container .header .title{font-size:16px!important;margin-right:8px;margin-bottom:0}::ng-deep .landing-banner-dialog .content-container .header .subtitle{font-size:12px;margin-top:0;margin-bottom:0}::ng-deep .landing-banner-dialog .content-container .toggle-container{font-size:12px}::ng-deep .landing-banner-dialog .content-container .toggle-container .notShowAgainToggle{margin-right:13px}}@media (max-width: 569px){::ng-deep .landing-banner-dialog .content-container{max-width:340px!important;padding:5px 26px}::ng-deep .landing-banner-dialog .content-container .header .image{height:50px;width:50px;margin-right:10px}::ng-deep .landing-banner-dialog .content-container .header .title{font-size:14px!important;margin-right:5px}::ng-deep .landing-banner-dialog .content-container .header .subtitle{font-size:11px}::ng-deep .landing-banner-dialog .content-container .toggle-container{font-size:11px;margin-bottom:5px}::ng-deep .landing-banner-dialog .content-container .toggle-container .mat-slide-toggle-bar{transform:scale(.9)}::ng-deep .landing-banner-dialog .content-container .toggle-container .notShowAgainToggle{margin-right:11px}}::ng-deep .landing-banner-dialog .content-container .mat-card-header-text{display:grid;margin:0}::ng-deep .landing-banner-dialog .content-container .header{width:100%;display:flex;align-items:center;margin-bottom:10px}::ng-deep .landing-banner-dialog .content-container .header .image{border-radius:50%}::ng-deep .landing-banner-dialog .content-container .header .title{font-weight:700;margin-bottom:0}::ng-deep .landing-banner-dialog .content-container .header .subtitle{margin-top:0;margin-bottom:0}::ng-deep .landing-banner-dialog .content-container .content{font-size:14px}::ng-deep .landing-banner-dialog .toggle-container{display:flex}::ng-deep .landing-banner-dialog .button-container{display:flex;justify-content:center;margin-top:19px}::ng-deep .landing-banner-dialog .button-container .closeBtn{width:100%;border-radius:5px;font-size:12px}\n',
    ],
    dependencies: [
      {
        kind: 'directive',
        type: i2.NgForOf,
        selector: '[ngFor][ngForOf]',
        inputs: ['ngForOf', 'ngForTrackBy', 'ngForTemplate'],
      },
      {
        kind: 'component',
        type: i3.MarkdownComponent,
        selector: '[markdown]',
        inputs: ['inline', 'data', 'appendData'],
      },
      {
        kind: 'component',
        type: i4.MatButton,
        selector:
          '    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ',
        inputs: ['disabled', 'disableRipple', 'color'],
        exportAs: ['matButton'],
      },
      {
        kind: 'directive',
        type: i5.MatCardAvatar,
        selector: '[mat-card-avatar], [matCardAvatar]',
      },
      {
        kind: 'directive',
        type: i5.MatCardContent,
        selector: 'mat-card-content',
      },
      {
        kind: 'component',
        type: i5.MatCardHeader,
        selector: 'mat-card-header',
      },
      {
        kind: 'directive',
        type: i5.MatCardSubtitle,
        selector: 'mat-card-subtitle, [mat-card-subtitle], [matCardSubtitle]',
      },
      {
        kind: 'directive',
        type: i5.MatCardTitle,
        selector: 'mat-card-title, [mat-card-title], [matCardTitle]',
      },
      {
        kind: 'directive',
        type: i1.MatDialogContent,
        selector:
          '[mat-dialog-content], mat-dialog-content, [matDialogContent]',
      },
      {
        kind: 'component',
        type: i6.MatSlideToggle,
        selector: 'mat-slide-toggle',
        inputs: ['disabled', 'disableRipple', 'color', 'tabIndex'],
        exportAs: ['matSlideToggle'],
      },
    ],
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: LandingBannerDialogComponent,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'solid-skeleton-landing-banner-dialog',
          template:
            '<div class="content-container" mat-dialog-content>\r\n  <mat-card-header class="header">\r\n    <img class="image" mat-card-avatar [src]="landingInfo.header.image" />\r\n    <mat-card-title class="title">{{\r\n      landingInfo.header.title\r\n    }}</mat-card-title>\r\n    <mat-card-subtitle class="subtitle">\r\n      {{ landingInfo.header.subtitle }}</mat-card-subtitle\r\n    >\r\n  </mat-card-header>\r\n  <mat-card-content class="content" *ngFor="let content of landingInfo.content">\r\n    <p [data]="content.p" markdown></p>\r\n  </mat-card-content>\r\n  <div class="toggle-container">\r\n    <mat-slide-toggle\r\n      class="notShowAgainToggle"\r\n      (change)="onNotShowAgainToggle($event)"\r\n      >Nicht mehr zeigen</mat-slide-toggle\r\n    >\r\n    <mat-slide-toggle\r\n      class="startTourToggle"\r\n      checked="true"\r\n      (change)="onStartTourToggle($event)"\r\n    >\r\n      Tour starten\r\n    </mat-slide-toggle>\r\n  </div>\r\n  <div class="button-container">\r\n    <button\r\n      class="closeBtn"\r\n      mat-stroked-button\r\n      color="primary"\r\n      (click)="onCloseClick()"\r\n    >\r\n      Schlie\u00DFen\r\n    </button>\r\n  </div>\r\n</div>\r\n',
          styles: [
            '::ng-deep .landing-banner-dialog{max-width:90vw!important;border-radius:15px}::ng-deep .landing-banner-dialog mat-dialog-container{padding:18px;border-radius:10px;overflow:hidden}@media (min-width: 570px) and (max-width: 699px){::ng-deep .landing-banner-dialog .content-container{max-width:500px!important}::ng-deep .landing-banner-dialog .content-container .header{margin-bottom:14px}::ng-deep .landing-banner-dialog .content-container .header .image{height:55px;width:55px;margin-right:15px}::ng-deep .landing-banner-dialog .content-container .header .title{font-size:16px!important;margin-right:8px;margin-bottom:0}::ng-deep .landing-banner-dialog .content-container .header .subtitle{font-size:12px;margin-top:0;margin-bottom:0}::ng-deep .landing-banner-dialog .content-container .toggle-container{font-size:12px}::ng-deep .landing-banner-dialog .content-container .toggle-container .notShowAgainToggle{margin-right:13px}}@media (max-width: 569px){::ng-deep .landing-banner-dialog .content-container{max-width:340px!important;padding:5px 26px}::ng-deep .landing-banner-dialog .content-container .header .image{height:50px;width:50px;margin-right:10px}::ng-deep .landing-banner-dialog .content-container .header .title{font-size:14px!important;margin-right:5px}::ng-deep .landing-banner-dialog .content-container .header .subtitle{font-size:11px}::ng-deep .landing-banner-dialog .content-container .toggle-container{font-size:11px;margin-bottom:5px}::ng-deep .landing-banner-dialog .content-container .toggle-container .mat-slide-toggle-bar{transform:scale(.9)}::ng-deep .landing-banner-dialog .content-container .toggle-container .notShowAgainToggle{margin-right:11px}}::ng-deep .landing-banner-dialog .content-container .mat-card-header-text{display:grid;margin:0}::ng-deep .landing-banner-dialog .content-container .header{width:100%;display:flex;align-items:center;margin-bottom:10px}::ng-deep .landing-banner-dialog .content-container .header .image{border-radius:50%}::ng-deep .landing-banner-dialog .content-container .header .title{font-weight:700;margin-bottom:0}::ng-deep .landing-banner-dialog .content-container .header .subtitle{margin-top:0;margin-bottom:0}::ng-deep .landing-banner-dialog .content-container .content{font-size:14px}::ng-deep .landing-banner-dialog .toggle-container{display:flex}::ng-deep .landing-banner-dialog .button-container{display:flex;justify-content:center;margin-top:19px}::ng-deep .landing-banner-dialog .button-container .closeBtn{width:100%;border-radius:5px;font-size:12px}\n',
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
            args: [SOLID_CORE_CONFIG],
          },
        ],
      },
    ];
  },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZGluZy1iYW5uZXItZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc29saWQvc2tlbGV0b24vc3JjL2xpYi9jb21wb25lbnRzL2xhbmRpbmctYmFubmVyLWRpYWxvZy9sYW5kaW5nLWJhbm5lci1kaWFsb2cuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zb2xpZC9za2VsZXRvbi9zcmMvbGliL2NvbXBvbmVudHMvbGFuZGluZy1iYW5uZXItZGlhbG9nL2xhbmRpbmctYmFubmVyLWRpYWxvZy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFeEQsT0FBTyxFQUFtQixpQkFBaUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7Ozs7OztBQU83RSxNQUFNLE9BQU8sNEJBQTRCO0lBSTdCO0lBQzJCO0lBSjlCLFdBQVcsQ0FBQztJQUVuQixZQUNVLElBQWdELEVBQ3JCLFVBQTJCO1FBRHRELFNBQUksR0FBSixJQUFJLENBQTRDO1FBQ3JCLGVBQVUsR0FBVixVQUFVLENBQWlCO1FBRTlELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDLG9CQUFvQixDQUFDO1FBQ25ELFlBQVksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVNLFlBQVk7UUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRU0sb0JBQW9CLENBQUMsTUFBNEI7UUFDdEQsSUFBSSxNQUFNLENBQUMsT0FBTztZQUFFLFlBQVksQ0FBQyxPQUFPLENBQUMscUJBQXFCLEVBQUUsTUFBTSxDQUFDLENBQUM7O1lBQ25FLFlBQVksQ0FBQyxPQUFPLENBQUMscUJBQXFCLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVNLGlCQUFpQixDQUFDLE1BQTRCO1FBQ25ELElBQUksTUFBTSxDQUFDLE9BQU87WUFBRSxZQUFZLENBQUMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLE9BQU8sQ0FBQyxDQUFDOztZQUNsRSxZQUFZLENBQUMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3pELENBQUM7dUdBeEJVLDRCQUE0Qiw4Q0FLN0IsaUJBQWlCOzJGQUxoQiw0QkFBNEIsNEVDVnpDLHF0Q0FzQ0E7OzJGRDVCYSw0QkFBNEI7a0JBTHhDLFNBQVM7K0JBQ0Usc0NBQXNDOzswQkFTN0MsTUFBTTsyQkFBQyxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNYXREaWFsb2dSZWYgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xyXG5pbXBvcnQgeyBNYXRTbGlkZVRvZ2dsZUNoYW5nZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NsaWRlLXRvZ2dsZSc7XHJcbmltcG9ydCB7IFNvbGlkQ29yZUNvbmZpZywgU09MSURfQ09SRV9DT05GSUcgfSBmcm9tICdAemVudHJ1bW5hd2kvc29saWQtY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3NvbGlkLXNrZWxldG9uLWxhbmRpbmctYmFubmVyLWRpYWxvZycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2xhbmRpbmctYmFubmVyLWRpYWxvZy5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbGFuZGluZy1iYW5uZXItZGlhbG9nLmNvbXBvbmVudC5zY3NzJ10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMYW5kaW5nQmFubmVyRGlhbG9nQ29tcG9uZW50IHtcclxuICBwdWJsaWMgbGFuZGluZ0luZm87XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBfcmVmOiBNYXREaWFsb2dSZWY8TGFuZGluZ0Jhbm5lckRpYWxvZ0NvbXBvbmVudD4sXHJcbiAgICBASW5qZWN0KFNPTElEX0NPUkVfQ09ORklHKSBwcml2YXRlIGNvcmVDb25maWc6IFNvbGlkQ29yZUNvbmZpZ1xyXG4gICkge1xyXG4gICAgX3JlZi5kaXNhYmxlQ2xvc2UgPSB0cnVlO1xyXG4gICAgdGhpcy5sYW5kaW5nSW5mbyA9IGNvcmVDb25maWcubGFuZGluZ0Jhbm5lckNvbnRlbnQ7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaGlkZV9sYW5kaW5nX3RvdXInLCAnZmFsc2UnKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvbkNsb3NlQ2xpY2soKSB7XHJcbiAgICB0aGlzLl9yZWYuY2xvc2UoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvbk5vdFNob3dBZ2FpblRvZ2dsZShjaGFuZ2U6IE1hdFNsaWRlVG9nZ2xlQ2hhbmdlKSB7XHJcbiAgICBpZiAoY2hhbmdlLmNoZWNrZWQpIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdoaWRlX2xhbmRpbmdfYmFubmVyJywgJ3RydWUnKTtcclxuICAgIGVsc2UgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2hpZGVfbGFuZGluZ19iYW5uZXInLCAnZmFsc2UnKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvblN0YXJ0VG91clRvZ2dsZShjaGFuZ2U6IE1hdFNsaWRlVG9nZ2xlQ2hhbmdlKSB7XHJcbiAgICBpZiAoY2hhbmdlLmNoZWNrZWQpIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdoaWRlX2xhbmRpbmdfdG91cicsICdmYWxzZScpO1xyXG4gICAgZWxzZSBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaGlkZV9sYW5kaW5nX3RvdXInLCAndHJ1ZScpO1xyXG4gIH1cclxufVxyXG4iLCI8ZGl2IGNsYXNzPVwiY29udGVudC1jb250YWluZXJcIiBtYXQtZGlhbG9nLWNvbnRlbnQ+XHJcbiAgPG1hdC1jYXJkLWhlYWRlciBjbGFzcz1cImhlYWRlclwiPlxyXG4gICAgPGltZyBjbGFzcz1cImltYWdlXCIgbWF0LWNhcmQtYXZhdGFyIFtzcmNdPVwibGFuZGluZ0luZm8uaGVhZGVyLmltYWdlXCIgLz5cclxuICAgIDxtYXQtY2FyZC10aXRsZSBjbGFzcz1cInRpdGxlXCI+e3tcclxuICAgICAgbGFuZGluZ0luZm8uaGVhZGVyLnRpdGxlXHJcbiAgICB9fTwvbWF0LWNhcmQtdGl0bGU+XHJcbiAgICA8bWF0LWNhcmQtc3VidGl0bGUgY2xhc3M9XCJzdWJ0aXRsZVwiPlxyXG4gICAgICB7eyBsYW5kaW5nSW5mby5oZWFkZXIuc3VidGl0bGUgfX08L21hdC1jYXJkLXN1YnRpdGxlXHJcbiAgICA+XHJcbiAgPC9tYXQtY2FyZC1oZWFkZXI+XHJcbiAgPG1hdC1jYXJkLWNvbnRlbnQgY2xhc3M9XCJjb250ZW50XCIgKm5nRm9yPVwibGV0IGNvbnRlbnQgb2YgbGFuZGluZ0luZm8uY29udGVudFwiPlxyXG4gICAgPHAgW2RhdGFdPVwiY29udGVudC5wXCIgbWFya2Rvd24+PC9wPlxyXG4gIDwvbWF0LWNhcmQtY29udGVudD5cclxuICA8ZGl2IGNsYXNzPVwidG9nZ2xlLWNvbnRhaW5lclwiPlxyXG4gICAgPG1hdC1zbGlkZS10b2dnbGVcclxuICAgICAgY2xhc3M9XCJub3RTaG93QWdhaW5Ub2dnbGVcIlxyXG4gICAgICAoY2hhbmdlKT1cIm9uTm90U2hvd0FnYWluVG9nZ2xlKCRldmVudClcIlxyXG4gICAgICA+TmljaHQgbWVociB6ZWlnZW48L21hdC1zbGlkZS10b2dnbGVcclxuICAgID5cclxuICAgIDxtYXQtc2xpZGUtdG9nZ2xlXHJcbiAgICAgIGNsYXNzPVwic3RhcnRUb3VyVG9nZ2xlXCJcclxuICAgICAgY2hlY2tlZD1cInRydWVcIlxyXG4gICAgICAoY2hhbmdlKT1cIm9uU3RhcnRUb3VyVG9nZ2xlKCRldmVudClcIlxyXG4gICAgPlxyXG4gICAgICBUb3VyIHN0YXJ0ZW5cclxuICAgIDwvbWF0LXNsaWRlLXRvZ2dsZT5cclxuICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwiYnV0dG9uLWNvbnRhaW5lclwiPlxyXG4gICAgPGJ1dHRvblxyXG4gICAgICBjbGFzcz1cImNsb3NlQnRuXCJcclxuICAgICAgbWF0LXN0cm9rZWQtYnV0dG9uXHJcbiAgICAgIGNvbG9yPVwicHJpbWFyeVwiXHJcbiAgICAgIChjbGljayk9XCJvbkNsb3NlQ2xpY2soKVwiXHJcbiAgICA+XHJcbiAgICAgIFNjaGxpZcOfZW5cclxuICAgIDwvYnV0dG9uPlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuIl19
