import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SOLID_CORE_CONFIG } from '../../solid-core-config';
import * as i0 from '@angular/core';
import * as i1 from '@angular/material/icon';
import * as i2 from '@angular/material/button';
import * as i3 from '@angular/material/dialog';
export class MediaErrorDialogComponent {
  data;
  name;
  coreConfig;
  constructor(data, name, coreConfig) {
    this.data = data;
    this.name = name;
    this.coreConfig = coreConfig;
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: MediaErrorDialogComponent,
    deps: [
      { token: MAT_DIALOG_DATA },
      { token: MAT_DIALOG_DATA },
      { token: SOLID_CORE_CONFIG },
    ],
    target: i0.ɵɵFactoryTarget.Component,
  });
  static ɵcmp = i0.ɵɵngDeclareComponent({
    minVersion: '14.0.0',
    version: '16.2.9',
    type: MediaErrorDialogComponent,
    selector: 'solid-core-media-error-dialog',
    ngImport: i0,
    template:
      '<div mat-dialog-title class="mat-error-dialog-title">\r\n  <div>{{ data.title }}</div>\r\n  <button mat-icon-button mat-dialog-close>\r\n    <mat-icon>close</mat-icon>\r\n  </button>\r\n</div>\r\n<div class="mat-error-dialog-content">\r\n  <p>{{ data.content }}</p>\r\n</div>\r\n',
    styles: [
      '::ng-deep .solid-core-media-error-dialog mat-dialog-container{overflow:hidden;padding:0}div.mat-error-dialog-title{display:flex;justify-content:space-between;align-items:center;padding-left:15px;margin:0;background-color:#d3d3d3;color:#fff;font-weight:400}@media (max-width: 400px){div.mat-error-dialog-title{font-size:18px}}div.mat-error-dialog-content{margin:0rem 1.3rem 1.4rem;padding:0;max-height:calc(100% - 44px);height:100%;width:-moz-fit-content;width:fit-content;position:relative;font-weight:200}@media (max-width: 400px){div.mat-error-dialog-content{font-size:14px}}::ng-deep .mat-button-focus-overlay{background-color:transparent!important}\n',
    ],
    dependencies: [
      {
        kind: 'component',
        type: i1.MatIcon,
        selector: 'mat-icon',
        inputs: ['color', 'inline', 'svgIcon', 'fontSet', 'fontIcon'],
        exportAs: ['matIcon'],
      },
      {
        kind: 'component',
        type: i2.MatIconButton,
        selector: 'button[mat-icon-button]',
        inputs: ['disabled', 'disableRipple', 'color'],
        exportAs: ['matButton'],
      },
      {
        kind: 'directive',
        type: i3.MatDialogClose,
        selector: '[mat-dialog-close], [matDialogClose]',
        inputs: ['aria-label', 'type', 'mat-dialog-close', 'matDialogClose'],
        exportAs: ['matDialogClose'],
      },
      {
        kind: 'directive',
        type: i3.MatDialogTitle,
        selector: '[mat-dialog-title], [matDialogTitle]',
        inputs: ['id'],
        exportAs: ['matDialogTitle'],
      },
    ],
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: MediaErrorDialogComponent,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'solid-core-media-error-dialog',
          template:
            '<div mat-dialog-title class="mat-error-dialog-title">\r\n  <div>{{ data.title }}</div>\r\n  <button mat-icon-button mat-dialog-close>\r\n    <mat-icon>close</mat-icon>\r\n  </button>\r\n</div>\r\n<div class="mat-error-dialog-content">\r\n  <p>{{ data.content }}</p>\r\n</div>\r\n',
          styles: [
            '::ng-deep .solid-core-media-error-dialog mat-dialog-container{overflow:hidden;padding:0}div.mat-error-dialog-title{display:flex;justify-content:space-between;align-items:center;padding-left:15px;margin:0;background-color:#d3d3d3;color:#fff;font-weight:400}@media (max-width: 400px){div.mat-error-dialog-title{font-size:18px}}div.mat-error-dialog-content{margin:0rem 1.3rem 1.4rem;padding:0;max-height:calc(100% - 44px);height:100%;width:-moz-fit-content;width:fit-content;position:relative;font-weight:200}@media (max-width: 400px){div.mat-error-dialog-content{font-size:14px}}::ng-deep .mat-button-focus-overlay{background-color:transparent!important}\n',
          ],
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [
      {
        type: undefined,
        decorators: [
          {
            type: Inject,
            args: [MAT_DIALOG_DATA],
          },
        ],
      },
      {
        type: undefined,
        decorators: [
          {
            type: Inject,
            args: [MAT_DIALOG_DATA],
          },
        ],
      },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEtZXJyb3ItZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc29saWQvY29yZS9zcmMvbGliL2NvbXBvbmVudHMvbWVkaWEtZXJyb3ItZGlhbG9nL21lZGlhLWVycm9yLWRpYWxvZy5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NvbGlkL2NvcmUvc3JjL2xpYi9jb21wb25lbnRzL21lZGlhLWVycm9yLWRpYWxvZy9tZWRpYS1lcnJvci1kaWFsb2cuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzNELE9BQU8sRUFBRSxpQkFBaUIsRUFBbUIsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7QUFPN0UsTUFBTSxPQUFPLHlCQUF5QjtJQUVGO0lBQ0E7SUFDRTtJQUhwQyxZQUNrQyxJQUFTLEVBQ1QsSUFBWSxFQUNWLFVBQTJCO1FBRjdCLFNBQUksR0FBSixJQUFJLENBQUs7UUFDVCxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ1YsZUFBVSxHQUFWLFVBQVUsQ0FBaUI7SUFDNUQsQ0FBQzt1R0FMTyx5QkFBeUIsa0JBRTFCLGVBQWUsYUFDZixlQUFlLGFBQ2YsaUJBQWlCOzJGQUpoQix5QkFBeUIscUVDVHRDLDZSQVNBOzsyRkRBYSx5QkFBeUI7a0JBTHJDLFNBQVM7K0JBQ0UsK0JBQStCOzswQkFNdEMsTUFBTTsyQkFBQyxlQUFlOzswQkFDdEIsTUFBTTsyQkFBQyxlQUFlOzswQkFDdEIsTUFBTTsyQkFBQyxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNQVRfRElBTE9HX0RBVEEgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xyXG5pbXBvcnQgeyBTT0xJRF9DT1JFX0NPTkZJRywgU29saWRDb3JlQ29uZmlnIH0gZnJvbSAnLi4vLi4vc29saWQtY29yZS1jb25maWcnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdzb2xpZC1jb3JlLW1lZGlhLWVycm9yLWRpYWxvZycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL21lZGlhLWVycm9yLWRpYWxvZy5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbWVkaWEtZXJyb3ItZGlhbG9nLmNvbXBvbmVudC5zY3NzJ10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNZWRpYUVycm9yRGlhbG9nQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBJbmplY3QoTUFUX0RJQUxPR19EQVRBKSBwdWJsaWMgZGF0YTogYW55LFxyXG4gICAgQEluamVjdChNQVRfRElBTE9HX0RBVEEpIHB1YmxpYyBuYW1lOiBzdHJpbmcsXHJcbiAgICBASW5qZWN0KFNPTElEX0NPUkVfQ09ORklHKSBwdWJsaWMgY29yZUNvbmZpZzogU29saWRDb3JlQ29uZmlnXHJcbiAgKSB7fVxyXG59XHJcbiIsIjxkaXYgbWF0LWRpYWxvZy10aXRsZSBjbGFzcz1cIm1hdC1lcnJvci1kaWFsb2ctdGl0bGVcIj5cclxuICA8ZGl2Pnt7IGRhdGEudGl0bGUgfX08L2Rpdj5cclxuICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiBtYXQtZGlhbG9nLWNsb3NlPlxyXG4gICAgPG1hdC1pY29uPmNsb3NlPC9tYXQtaWNvbj5cclxuICA8L2J1dHRvbj5cclxuPC9kaXY+XHJcbjxkaXYgY2xhc3M9XCJtYXQtZXJyb3ItZGlhbG9nLWNvbnRlbnRcIj5cclxuICA8cD57eyBkYXRhLmNvbnRlbnQgfX08L3A+XHJcbjwvZGl2PlxyXG4iXX0=
