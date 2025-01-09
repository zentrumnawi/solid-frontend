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
import { Component, QueryList, ViewChildren } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { GlossaryState } from '../glossary.state';
import { LoadGLossary } from '../glossary.actions';
import { combineLatest, Observable, Subject } from 'rxjs';
import { RefDirective } from './link.directive';
import { UntypedFormControl } from '@angular/forms';
import { map, startWith, takeUntil } from 'rxjs/operators';
import * as i0 from '@angular/core';
import * as i1 from '@ngxs/store';
import * as i2 from '@angular/common';
import * as i3 from '@angular/forms';
import * as i4 from '@zentrumnawi/solid-core';
import * as i5 from '@angular/material/list';
import * as i6 from '@angular/material/input';
import * as i7 from '@angular/material/form-field';
import * as i8 from '@angular/material/icon';
import * as i9 from '@angular/material/button';
import * as i10 from './link.directive';
export class GlossaryComponent {
  $destroyed = new Subject();
  Filter = new UntypedFormControl('');
  refElements;
  State;
  GlossaryEntries;
  constructor(store) {
    store.dispatch(new LoadGLossary());
    this.GlossaryEntries = combineLatest([
      this.Filter.valueChanges.pipe(startWith('')),
      this.State,
    ]).pipe(
      map((val) => {
        const filterStr = val[0].toLowerCase();
        const state = val[1];
        if (filterStr === '') {
          return state;
        }
        const validEntryIds = Object.values(state.entries)
          .filter((entry) => {
            return (
              entry.term.toLowerCase().includes(filterStr) ||
              entry.text.toLowerCase().includes(filterStr)
            );
          })
          .map((entry) => entry.id);
        const filteredSections = state.sections
          .filter((section) => {
            return section[1].some((id) => validEntryIds.includes(id));
          })
          .map((section) => {
            return [
              section[0],
              section[1].filter((id) => validEntryIds.includes(id)),
            ];
          });
        return { sections: filteredSections, entries: state.entries };
      }),
      takeUntil(this.$destroyed)
    );
  }
  followRef(refId) {
    this.Filter.setValue('');
    setTimeout(() => {
      const refElement = this.refElements.find((r) => r.refId === refId);
      if (!refElement) {
        return;
      }
      refElement.ref.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
      refElement.highlighted = true;
      setTimeout(() => {
        refElement.highlighted = false;
      }, 1000);
    });
  }
  ngOnDestroy() {
    this.$destroyed.next(true);
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: GlossaryComponent,
    deps: [{ token: i1.Store }],
    target: i0.ɵɵFactoryTarget.Component,
  });
  static ɵcmp = i0.ɵɵngDeclareComponent({
    minVersion: '14.0.0',
    version: '16.2.9',
    type: GlossaryComponent,
    selector: 'solid-glossary',
    viewQueries: [
      {
        propertyName: 'refElements',
        predicate: RefDirective,
        descendants: true,
        read: RefDirective,
      },
    ],
    ngImport: i0,
    template:
      '<mat-form-field appearance="fill">\r\n  <mat-label>Suche</mat-label>\r\n  <input [formControl]="Filter" matInput type="text" />\r\n  <button mat-icon-button matSuffix (click)="Filter.setValue(\'\')">\r\n    <mat-icon>{{ Filter.value === \'\' ? \'search\' : \'close\' }}</mat-icon>\r\n  </button>\r\n</mat-form-field>\r\n<mat-list *ngIf="GlossaryEntries | async as state">\r\n  <ng-container *ngFor="let kvp of state.sections">\r\n    <h3 mat-subeader>{{ kvp[0] }}</h3>\r\n    <mat-list-item\r\n      *ngFor="let entryId of kvp[1]"\r\n      solidGlossaryEntry\r\n      [refId]="entryId"\r\n    >\r\n      <span class="mat-body-strong entry-header" mat-line>{{\r\n        state.entries[entryId].term\r\n      }}</span>\r\n      <div\r\n        [data]="state.entries[entryId].text"\r\n        markdown\r\n        [inline]="true"\r\n        mat-line\r\n      ></div>\r\n      <span\r\n        class="links"\r\n        *ngIf="state.entries[entryId].links.length > 0"\r\n        mat-line\r\n        >&rarr;<a\r\n          (click)="followRef(refId)"\r\n          *ngFor="let refId of state.entries[entryId].links; let i = index"\r\n        >\r\n          {{ state.entries[refId].term\r\n          }}{{ i < state.entries[entryId].links.length - 1 ? \',\' : \'\' }}</a\r\n        >\r\n      </span>\r\n    </mat-list-item>\r\n  </ng-container>\r\n</mat-list>\r\n',
    styles: [
      'mat-list{padding:0;display:inline-block;height:calc(100vh - 119px);width:300px;overflow-y:auto;overflow-x:hidden}mat-list h3{margin:0;padding:4px 16px}mat-list mat-list-item{padding:4px;transition:background-color linear .3s}mat-list mat-list-item .entry-header{font-weight:500}mat-list mat-list-item sup{top:-.4em}mat-list mat-list-item span.links{margin-top:.5em}mat-list mat-list-item span.links a{font-style:italic;transition:color linear .15s;font-size:13px}mat-list mat-list-item span.links a:hover{cursor:pointer}::ng-deep .mat-list .mat-list-item .mat-line{word-wrap:break-word;white-space:pre-wrap}::ng-deep .mat-list .mat-list-item{height:initial!important}mat-form-field{width:100%;margin-top:.5em}mat-form-field ::ng-deep div.mat-form-field-wrapper{padding:0}mat-form-field ::ng-deep div.mat-form-field-underline{display:none}\n',
    ],
    dependencies: [
      {
        kind: 'directive',
        type: i2.NgForOf,
        selector: '[ngFor][ngForOf]',
        inputs: ['ngForOf', 'ngForTrackBy', 'ngForTemplate'],
      },
      {
        kind: 'directive',
        type: i2.NgIf,
        selector: '[ngIf]',
        inputs: ['ngIf', 'ngIfThen', 'ngIfElse'],
      },
      {
        kind: 'directive',
        type: i3.DefaultValueAccessor,
        selector:
          'input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]',
      },
      {
        kind: 'directive',
        type: i3.NgControlStatus,
        selector: '[formControlName],[ngModel],[formControl]',
      },
      {
        kind: 'directive',
        type: i3.FormControlDirective,
        selector: '[formControl]',
        inputs: ['formControl', 'disabled', 'ngModel'],
        outputs: ['ngModelChange'],
        exportAs: ['ngForm'],
      },
      {
        kind: 'component',
        type: i4.MarkdownComponent,
        selector: '[markdown]',
        inputs: ['inline', 'data', 'appendData'],
      },
      {
        kind: 'component',
        type: i5.MatList,
        selector: 'mat-list',
        exportAs: ['matList'],
      },
      {
        kind: 'component',
        type: i5.MatListItem,
        selector: 'mat-list-item, a[mat-list-item], button[mat-list-item]',
        inputs: ['activated'],
        exportAs: ['matListItem'],
      },
      {
        kind: 'directive',
        type: i6.MatInput,
        selector:
          'input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]',
        inputs: [
          'disabled',
          'id',
          'placeholder',
          'name',
          'required',
          'type',
          'errorStateMatcher',
          'aria-describedby',
          'value',
          'readonly',
        ],
        exportAs: ['matInput'],
      },
      {
        kind: 'component',
        type: i7.MatFormField,
        selector: 'mat-form-field',
        inputs: [
          'hideRequiredMarker',
          'color',
          'floatLabel',
          'appearance',
          'subscriptSizing',
          'hintLabel',
        ],
        exportAs: ['matFormField'],
      },
      { kind: 'directive', type: i7.MatLabel, selector: 'mat-label' },
      {
        kind: 'directive',
        type: i7.MatSuffix,
        selector: '[matSuffix], [matIconSuffix], [matTextSuffix]',
        inputs: ['matTextSuffix'],
      },
      {
        kind: 'component',
        type: i8.MatIcon,
        selector: 'mat-icon',
        inputs: ['color', 'inline', 'svgIcon', 'fontSet', 'fontIcon'],
        exportAs: ['matIcon'],
      },
      {
        kind: 'component',
        type: i9.MatIconButton,
        selector: 'button[mat-icon-button]',
        inputs: ['disabled', 'disableRipple', 'color'],
        exportAs: ['matButton'],
      },
      {
        kind: 'directive',
        type: i10.RefDirective,
        selector: '[solidGlossaryEntry]',
        inputs: ['refId', 'highlighted'],
      },
      { kind: 'pipe', type: i2.AsyncPipe, name: 'async' },
    ],
  });
}
__decorate(
  [Select(GlossaryState.state), __metadata('design:type', Observable)],
  GlossaryComponent.prototype,
  'State',
  void 0
);
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: GlossaryComponent,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'solid-glossary',
          template:
            '<mat-form-field appearance="fill">\r\n  <mat-label>Suche</mat-label>\r\n  <input [formControl]="Filter" matInput type="text" />\r\n  <button mat-icon-button matSuffix (click)="Filter.setValue(\'\')">\r\n    <mat-icon>{{ Filter.value === \'\' ? \'search\' : \'close\' }}</mat-icon>\r\n  </button>\r\n</mat-form-field>\r\n<mat-list *ngIf="GlossaryEntries | async as state">\r\n  <ng-container *ngFor="let kvp of state.sections">\r\n    <h3 mat-subeader>{{ kvp[0] }}</h3>\r\n    <mat-list-item\r\n      *ngFor="let entryId of kvp[1]"\r\n      solidGlossaryEntry\r\n      [refId]="entryId"\r\n    >\r\n      <span class="mat-body-strong entry-header" mat-line>{{\r\n        state.entries[entryId].term\r\n      }}</span>\r\n      <div\r\n        [data]="state.entries[entryId].text"\r\n        markdown\r\n        [inline]="true"\r\n        mat-line\r\n      ></div>\r\n      <span\r\n        class="links"\r\n        *ngIf="state.entries[entryId].links.length > 0"\r\n        mat-line\r\n        >&rarr;<a\r\n          (click)="followRef(refId)"\r\n          *ngFor="let refId of state.entries[entryId].links; let i = index"\r\n        >\r\n          {{ state.entries[refId].term\r\n          }}{{ i < state.entries[entryId].links.length - 1 ? \',\' : \'\' }}</a\r\n        >\r\n      </span>\r\n    </mat-list-item>\r\n  </ng-container>\r\n</mat-list>\r\n',
          styles: [
            'mat-list{padding:0;display:inline-block;height:calc(100vh - 119px);width:300px;overflow-y:auto;overflow-x:hidden}mat-list h3{margin:0;padding:4px 16px}mat-list mat-list-item{padding:4px;transition:background-color linear .3s}mat-list mat-list-item .entry-header{font-weight:500}mat-list mat-list-item sup{top:-.4em}mat-list mat-list-item span.links{margin-top:.5em}mat-list mat-list-item span.links a{font-style:italic;transition:color linear .15s;font-size:13px}mat-list mat-list-item span.links a:hover{cursor:pointer}::ng-deep .mat-list .mat-list-item .mat-line{word-wrap:break-word;white-space:pre-wrap}::ng-deep .mat-list .mat-list-item{height:initial!important}mat-form-field{width:100%;margin-top:.5em}mat-form-field ::ng-deep div.mat-form-field-wrapper{padding:0}mat-form-field ::ng-deep div.mat-form-field-underline{display:none}\n',
          ],
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [{ type: i1.Store }];
  },
  propDecorators: {
    refElements: [
      {
        type: ViewChildren,
        args: [RefDirective, { read: RefDirective }],
      },
    ],
    State: [],
  },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvc3NhcnkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zb2xpZC9nbG9zc2FyeS9zcmMvbGliL2NvbXBvbmVudHMvZ2xvc3NhcnkuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zb2xpZC9nbG9zc2FyeS9zcmMvbGliL2NvbXBvbmVudHMvZ2xvc3NhcnkuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBYSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlFLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzVDLE9BQU8sRUFFTCxhQUFhLEdBRWQsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzFELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7Ozs7O0FBTzNELE1BQU0sT0FBTyxpQkFBaUI7SUFDcEIsVUFBVSxHQUFHLElBQUksT0FBTyxFQUFXLENBQUM7SUFDckMsTUFBTSxHQUFHLElBQUksa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFcEMsV0FBVyxDQUEyQjtJQUV0QyxLQUFLLENBQWtDO0lBQ3ZDLGVBQWUsQ0FBaUM7SUFFdkQsWUFBWSxLQUFZO1FBQ3RCLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxZ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LElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7dUdBakVVLGlCQUFpQjsyRkFBakIsaUJBQWlCLHNGQUdkLFlBQVksMkJBQVUsWUFBWSw2QkNyQmxELDYxQ0F1Q0E7O0FEZlM7SUFETixNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQzs4QkFDYixVQUFVO2dEQUFxQjsyRkFObkMsaUJBQWlCO2tCQUw3QixTQUFTOytCQUNFLGdCQUFnQjs0RkFRbkIsV0FBVztzQkFEakIsWUFBWTt1QkFBQyxZQUFZLEVBQUUsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFO2dCQUczQyxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkRlc3Ryb3ksIFF1ZXJ5TGlzdCwgVmlld0NoaWxkcmVuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNlbGVjdCwgU3RvcmUgfSBmcm9tICdAbmd4cy9zdG9yZSc7XHJcbmltcG9ydCB7XHJcbiAgR2xvc3NhcnlFbnRyeU1vZGVsLFxyXG4gIEdsb3NzYXJ5U3RhdGUsXHJcbiAgR2xvc3NhcnlTdGF0ZU1vZGVsLFxyXG59IGZyb20gJy4uL2dsb3NzYXJ5LnN0YXRlJztcclxuaW1wb3J0IHsgTG9hZEdMb3NzYXJ5IH0gZnJvbSAnLi4vZ2xvc3NhcnkuYWN0aW9ucyc7XHJcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgUmVmRGlyZWN0aXZlIH0gZnJvbSAnLi9saW5rLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IFVudHlwZWRGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgbWFwLCBzdGFydFdpdGgsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnc29saWQtZ2xvc3NhcnknLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9nbG9zc2FyeS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vZ2xvc3NhcnkuY29tcG9uZW50LnNjc3MnXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIEdsb3NzYXJ5Q29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcclxuICBwcml2YXRlICRkZXN0cm95ZWQgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xyXG4gIHB1YmxpYyBGaWx0ZXIgPSBuZXcgVW50eXBlZEZvcm1Db250cm9sKCcnKTtcclxuICBAVmlld0NoaWxkcmVuKFJlZkRpcmVjdGl2ZSwgeyByZWFkOiBSZWZEaXJlY3RpdmUgfSlcclxuICBwdWJsaWMgcmVmRWxlbWVudHMhOiBRdWVyeUxpc3Q8UmVmRGlyZWN0aXZlPjtcclxuICBAU2VsZWN0KEdsb3NzYXJ5U3RhdGUuc3RhdGUpXHJcbiAgcHVibGljIFN0YXRlITogT2JzZXJ2YWJsZTxHbG9zc2FyeVN0YXRlTW9kZWw+O1xyXG4gIHB1YmxpYyBHbG9zc2FyeUVudHJpZXM6IE9ic2VydmFibGU8R2xvc3NhcnlTdGF0ZU1vZGVsPjtcclxuXHJcbiAgY29uc3RydWN0b3Ioc3RvcmU6IFN0b3JlKSB7XHJcbiAgICBzdG9yZS5kaXNwYXRjaChuZXcgTG9hZEdMb3NzYXJ5KCkpO1xyXG4gICAgdGhpcy5HbG9zc2FyeUVudHJpZXMgPSBjb21iaW5lTGF0ZXN0KFtcclxuICAgICAgdGhpcy5GaWx0ZXIudmFsdWVDaGFuZ2VzLnBpcGUoc3RhcnRXaXRoKCcnKSksXHJcbiAgICAgIHRoaXMuU3RhdGUsXHJcbiAgICBdKS5waXBlKFxyXG4gICAgICBtYXAoKHZhbCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGZpbHRlclN0cjogc3RyaW5nID0gKHZhbFswXSBhcyBzdHJpbmcpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB2YWxbMV07XHJcbiAgICAgICAgaWYgKGZpbHRlclN0ciA9PT0gJycpIHtcclxuICAgICAgICAgIHJldHVybiBzdGF0ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgdmFsaWRFbnRyeUlkcyA9IE9iamVjdC52YWx1ZXMoc3RhdGUuZW50cmllcylcclxuICAgICAgICAgIC5maWx0ZXIoKGVudHJ5OiBHbG9zc2FyeUVudHJ5TW9kZWwpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICBlbnRyeS50ZXJtLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoZmlsdGVyU3RyKSB8fFxyXG4gICAgICAgICAgICAgIGVudHJ5LnRleHQudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhmaWx0ZXJTdHIpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLm1hcCgoZW50cnkpID0+IGVudHJ5LmlkKTtcclxuICAgICAgICBjb25zdCBmaWx0ZXJlZFNlY3Rpb25zID0gc3RhdGUuc2VjdGlvbnNcclxuICAgICAgICAgIC5maWx0ZXIoKHNlY3Rpb24pID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHNlY3Rpb25bMV0uc29tZSgoaWQpID0+IHZhbGlkRW50cnlJZHMuaW5jbHVkZXMoaWQpKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAubWFwKChzZWN0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgc2VjdGlvblswXSxcclxuICAgICAgICAgICAgICBzZWN0aW9uWzFdLmZpbHRlcigoaWQpID0+IHZhbGlkRW50cnlJZHMuaW5jbHVkZXMoaWQpKSxcclxuICAgICAgICAgICAgXSBhcyBbc3RyaW5nLCBudW1iZXJbXV07XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4geyBzZWN0aW9uczogZmlsdGVyZWRTZWN0aW9ucywgZW50cmllczogc3RhdGUuZW50cmllcyB9O1xyXG4gICAgICB9KSxcclxuICAgICAgdGFrZVVudGlsKHRoaXMuJGRlc3Ryb3llZClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBmb2xsb3dSZWYocmVmSWQ6IG51bWJlcikge1xyXG4gICAgdGhpcy5GaWx0ZXIuc2V0VmFsdWUoJycpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHJlZkVsZW1lbnQgPSB0aGlzLnJlZkVsZW1lbnRzLmZpbmQoKHIpID0+IHIucmVmSWQgPT09IHJlZklkKTtcclxuICAgICAgaWYgKCFyZWZFbGVtZW50KSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHJlZkVsZW1lbnQucmVmLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsSW50b1ZpZXcoe1xyXG4gICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJyxcclxuICAgICAgICBibG9jazogJ25lYXJlc3QnLFxyXG4gICAgICB9KTtcclxuICAgICAgcmVmRWxlbWVudC5oaWdobGlnaHRlZCA9IHRydWU7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHJlZkVsZW1lbnQuaGlnaGxpZ2h0ZWQgPSBmYWxzZTtcclxuICAgICAgfSwgMTAwMCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy4kZGVzdHJveWVkLm5leHQodHJ1ZSk7XHJcbiAgfVxyXG59XHJcbiIsIjxtYXQtZm9ybS1maWVsZCBhcHBlYXJhbmNlPVwiZmlsbFwiPlxyXG4gIDxtYXQtbGFiZWw+U3VjaGU8L21hdC1sYWJlbD5cclxuICA8aW5wdXQgW2Zvcm1Db250cm9sXT1cIkZpbHRlclwiIG1hdElucHV0IHR5cGU9XCJ0ZXh0XCIgLz5cclxuICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiBtYXRTdWZmaXggKGNsaWNrKT1cIkZpbHRlci5zZXRWYWx1ZSgnJylcIj5cclxuICAgIDxtYXQtaWNvbj57eyBGaWx0ZXIudmFsdWUgPT09ICcnID8gJ3NlYXJjaCcgOiAnY2xvc2UnIH19PC9tYXQtaWNvbj5cclxuICA8L2J1dHRvbj5cclxuPC9tYXQtZm9ybS1maWVsZD5cclxuPG1hdC1saXN0ICpuZ0lmPVwiR2xvc3NhcnlFbnRyaWVzIHwgYXN5bmMgYXMgc3RhdGVcIj5cclxuICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBrdnAgb2Ygc3RhdGUuc2VjdGlvbnNcIj5cclxuICAgIDxoMyBtYXQtc3ViZWFkZXI+e3sga3ZwWzBdIH19PC9oMz5cclxuICAgIDxtYXQtbGlzdC1pdGVtXHJcbiAgICAgICpuZ0Zvcj1cImxldCBlbnRyeUlkIG9mIGt2cFsxXVwiXHJcbiAgICAgIHNvbGlkR2xvc3NhcnlFbnRyeVxyXG4gICAgICBbcmVmSWRdPVwiZW50cnlJZFwiXHJcbiAgICA+XHJcbiAgICAgIDxzcGFuIGNsYXNzPVwibWF0LWJvZHktc3Ryb25nIGVudHJ5LWhlYWRlclwiIG1hdC1saW5lPnt7XHJcbiAgICAgICAgc3RhdGUuZW50cmllc1tlbnRyeUlkXS50ZXJtXHJcbiAgICAgIH19PC9zcGFuPlxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgW2RhdGFdPVwic3RhdGUuZW50cmllc1tlbnRyeUlkXS50ZXh0XCJcclxuICAgICAgICBtYXJrZG93blxyXG4gICAgICAgIFtpbmxpbmVdPVwidHJ1ZVwiXHJcbiAgICAgICAgbWF0LWxpbmVcclxuICAgICAgPjwvZGl2PlxyXG4gICAgICA8c3BhblxyXG4gICAgICAgIGNsYXNzPVwibGlua3NcIlxyXG4gICAgICAgICpuZ0lmPVwic3RhdGUuZW50cmllc1tlbnRyeUlkXS5saW5rcy5sZW5ndGggPiAwXCJcclxuICAgICAgICBtYXQtbGluZVxyXG4gICAgICAgID4mcmFycjs8YVxyXG4gICAgICAgICAgKGNsaWNrKT1cImZvbGxvd1JlZihyZWZJZClcIlxyXG4gICAgICAgICAgKm5nRm9yPVwibGV0IHJlZklkIG9mIHN0YXRlLmVudHJpZXNbZW50cnlJZF0ubGlua3M7IGxldCBpID0gaW5kZXhcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIHt7IHN0YXRlLmVudHJpZXNbcmVmSWRdLnRlcm1cclxuICAgICAgICAgIH19e3sgaSA8IHN0YXRlLmVudHJpZXNbZW50cnlJZF0ubGlua3MubGVuZ3RoIC0gMSA/ICcsJyA6ICcnIH19PC9hXHJcbiAgICAgICAgPlxyXG4gICAgICA8L3NwYW4+XHJcbiAgICA8L21hdC1saXN0LWl0ZW0+XHJcbiAgPC9uZy1jb250YWluZXI+XHJcbjwvbWF0LWxpc3Q+XHJcbiJdfQ==
