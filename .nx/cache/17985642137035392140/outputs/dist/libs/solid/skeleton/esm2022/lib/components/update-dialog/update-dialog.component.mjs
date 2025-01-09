import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as i0 from '@angular/core';
import * as i1 from '@angular/material/dialog';
import * as i2 from '@angular/material/button';
export class UpdateDialogComponent {
  _ref;
  cb;
  constructor(
    _ref,
    /** Inject the required service function to prevent a circular dependency between the Component and the service */
    // callback is defined as any to prevent ng-packagr issues
    // { cb: () => void }
    data
  ) {
    this._ref = _ref;
    this.cb = data.cb;
  }
  onCancelClick() {
    this._ref.close();
  }
  onOkClick() {
    this.cb();
    this._ref.close();
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: UpdateDialogComponent,
    deps: [{ token: i1.MatDialogRef }, { token: MAT_DIALOG_DATA }],
    target: i0.ɵɵFactoryTarget.Component,
  });
  static ɵcmp = i0.ɵɵngDeclareComponent({
    minVersion: '14.0.0',
    version: '16.2.9',
    type: UpdateDialogComponent,
    selector: 'solid-skeleton-update-dialog',
    ngImport: i0,
    template:
      '<h1 mat-dialog-title>Update</h1>\r\n<div mat-dialog-content>Es steht eine neue Version der App zur Verf\u00FCgung.</div>\r\n<div mat-dialog-actions>\r\n  <div class="spacer"></div>\r\n  <button (click)="onCancelClick()" mat-button>Abbrechen</button>\r\n  <button (click)="onOkClick()" mat-button>Updaten</button>\r\n</div>\r\n',
    styles: [''],
    dependencies: [
      {
        kind: 'component',
        type: i2.MatButton,
        selector:
          '    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ',
        inputs: ['disabled', 'disableRipple', 'color'],
        exportAs: ['matButton'],
      },
      {
        kind: 'directive',
        type: i1.MatDialogTitle,
        selector: '[mat-dialog-title], [matDialogTitle]',
        inputs: ['id'],
        exportAs: ['matDialogTitle'],
      },
      {
        kind: 'directive',
        type: i1.MatDialogContent,
        selector:
          '[mat-dialog-content], mat-dialog-content, [matDialogContent]',
      },
      {
        kind: 'directive',
        type: i1.MatDialogActions,
        selector:
          '[mat-dialog-actions], mat-dialog-actions, [matDialogActions]',
        inputs: ['align'],
      },
    ],
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: UpdateDialogComponent,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'solid-skeleton-update-dialog',
          template:
            '<h1 mat-dialog-title>Update</h1>\r\n<div mat-dialog-content>Es steht eine neue Version der App zur Verf\u00FCgung.</div>\r\n<div mat-dialog-actions>\r\n  <div class="spacer"></div>\r\n  <button (click)="onCancelClick()" mat-button>Abbrechen</button>\r\n  <button (click)="onOkClick()" mat-button>Updaten</button>\r\n</div>\r\n',
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
            args: [MAT_DIALOG_DATA],
          },
        ],
      },
    ];
  },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NvbGlkL3NrZWxldG9uL3NyYy9saWIvY29tcG9uZW50cy91cGRhdGUtZGlhbG9nL3VwZGF0ZS1kaWFsb2cuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zb2xpZC9za2VsZXRvbi9zcmMvbGliL2NvbXBvbmVudHMvdXBkYXRlLWRpYWxvZy91cGRhdGUtZGlhbG9nLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7QUFPekUsTUFBTSxPQUFPLHFCQUFxQjtJQUd0QjtJQUZPLEVBQUUsQ0FBYTtJQUNoQyxZQUNVLElBQXlDO0lBQ2pELGtIQUFrSDtJQUNsSCwwREFBMEQ7SUFDMUQscUJBQXFCO0lBQ0ksSUFBUztRQUoxQixTQUFJLEdBQUosSUFBSSxDQUFxQztRQU1qRCxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVELGFBQWE7UUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxTQUFTO1FBQ1AsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNwQixDQUFDO3VHQW5CVSxxQkFBcUIsOENBT3RCLGVBQWU7MkZBUGQscUJBQXFCLG9FQ1JsQyw4VUFPQTs7MkZEQ2EscUJBQXFCO2tCQUxqQyxTQUFTOytCQUNFLDhCQUE4Qjs7MEJBV3JDLE1BQU07MkJBQUMsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1BVF9ESUFMT0dfREFUQSwgTWF0RGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnc29saWQtc2tlbGV0b24tdXBkYXRlLWRpYWxvZycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3VwZGF0ZS1kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3VwZGF0ZS1kaWFsb2cuY29tcG9uZW50LnNjc3MnXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIFVwZGF0ZURpYWxvZ0NvbXBvbmVudCB7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBjYjogKCkgPT4gdm9pZDtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgX3JlZjogTWF0RGlhbG9nUmVmPFVwZGF0ZURpYWxvZ0NvbXBvbmVudD4sXHJcbiAgICAvKiogSW5qZWN0IHRoZSByZXF1aXJlZCBzZXJ2aWNlIGZ1bmN0aW9uIHRvIHByZXZlbnQgYSBjaXJjdWxhciBkZXBlbmRlbmN5IGJldHdlZW4gdGhlIENvbXBvbmVudCBhbmQgdGhlIHNlcnZpY2UgKi9cclxuICAgIC8vIGNhbGxiYWNrIGlzIGRlZmluZWQgYXMgYW55IHRvIHByZXZlbnQgbmctcGFja2FnciBpc3N1ZXNcclxuICAgIC8vIHsgY2I6ICgpID0+IHZvaWQgfVxyXG4gICAgQEluamVjdChNQVRfRElBTE9HX0RBVEEpIGRhdGE6IGFueVxyXG4gICkge1xyXG4gICAgdGhpcy5jYiA9IGRhdGEuY2I7XHJcbiAgfVxyXG5cclxuICBvbkNhbmNlbENsaWNrKCkge1xyXG4gICAgdGhpcy5fcmVmLmNsb3NlKCk7XHJcbiAgfVxyXG5cclxuICBvbk9rQ2xpY2soKSB7XHJcbiAgICB0aGlzLmNiKCk7XHJcbiAgICB0aGlzLl9yZWYuY2xvc2UoKTtcclxuICB9XHJcbn1cclxuIiwiPGgxIG1hdC1kaWFsb2ctdGl0bGU+VXBkYXRlPC9oMT5cclxuPGRpdiBtYXQtZGlhbG9nLWNvbnRlbnQ+RXMgc3RlaHQgZWluZSBuZXVlIFZlcnNpb24gZGVyIEFwcCB6dXIgVmVyZsO8Z3VuZy48L2Rpdj5cclxuPGRpdiBtYXQtZGlhbG9nLWFjdGlvbnM+XHJcbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPjwvZGl2PlxyXG4gIDxidXR0b24gKGNsaWNrKT1cIm9uQ2FuY2VsQ2xpY2soKVwiIG1hdC1idXR0b24+QWJicmVjaGVuPC9idXR0b24+XHJcbiAgPGJ1dHRvbiAoY2xpY2spPVwib25Pa0NsaWNrKClcIiBtYXQtYnV0dG9uPlVwZGF0ZW48L2J1dHRvbj5cclxuPC9kaXY+XHJcbiJdfQ==
