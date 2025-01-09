import * as i0 from '@angular/core';
import {
  Injectable,
  Inject,
  Directive,
  Input,
  HostBinding,
  Component,
  ViewChildren,
  NgModule,
} from '@angular/core';
import * as i4 from '@zentrumnawi/solid-core';
import { SOLID_CORE_CONFIG, SolidCoreModule } from '@zentrumnawi/solid-core';
import * as i1$1 from '@ngxs/store';
import { Action, Selector, State, Select, NgxsModule } from '@ngxs/store';
import * as i1 from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { map, tap, startWith, takeUntil } from 'rxjs/operators';
import { Subject, combineLatest, Observable } from 'rxjs';
import * as i3 from '@angular/forms';
import { UntypedFormControl } from '@angular/forms';
import * as i2 from '@angular/common';
import * as i5 from '@angular/material/list';
import { MatListModule } from '@angular/material/list';
import * as i6 from '@angular/material/input';
import { MatInputModule } from '@angular/material/input';
import * as i7 from '@angular/material/form-field';
import * as i8 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i9 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';

class LoadGLossary {
  static type = '[Glossary] LoadEntries';
}

var __decorate$1 =
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
var __metadata$1 =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
let GlossaryState = class GlossaryState {
  _config;
  _http;
  constructor(_config, _http) {
    this._config = _config;
    this._http = _http;
  }
  static state(state) {
    return { ...state };
  }
  load(ctx) {
    return this._http.get(`${this._config.apiUrl}/glossaryentries`).pipe(
      map((result) => {
        const entries = {};
        const sections = {};
        result.forEach((entry) => {
          entries[entry.id] = entry;
          const firstChar = entry.term[0].toUpperCase();
          if (sections[firstChar] === undefined) {
            sections[firstChar] = [];
          }
          sections[firstChar].push(entry.id);
        });
        Object.keys(sections).forEach((sectionKey) =>
          sections[sectionKey].sort((a, b) =>
            entries[a].term.localeCompare(entries[b].term)
          )
        );
        const sectionArr = Object.entries(sections);
        sectionArr.sort((a, b) => a[0].localeCompare(b[0]));
        return { entries, sections: sectionArr };
      }),
      tap((v) => {
        ctx.patchState(v);
      })
    );
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: GlossaryState,
    deps: [{ token: SOLID_CORE_CONFIG }, { token: i1.HttpClient }],
    target: i0.ɵɵFactoryTarget.Injectable,
  });
  static ɵprov = i0.ɵɵngDeclareInjectable({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: GlossaryState,
  });
};
__decorate$1(
  [
    Action(LoadGLossary),
    __metadata$1('design:type', Function),
    __metadata$1('design:paramtypes', [Object]),
    __metadata$1('design:returntype', void 0),
  ],
  GlossaryState.prototype,
  'load',
  null
);
__decorate$1(
  [
    Selector(),
    __metadata$1('design:type', Function),
    __metadata$1('design:paramtypes', [Object]),
    __metadata$1('design:returntype', void 0),
  ],
  GlossaryState,
  'state',
  null
);
GlossaryState = __decorate$1(
  [
    State({
      name: 'glossary',
      defaults: {
        entries: {},
        sections: [],
      },
    }),
    __metadata$1('design:paramtypes', [Object, HttpClient]),
  ],
  GlossaryState
);
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: GlossaryState,
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

class RefDirective {
  ref;
  refId;
  highlighted = false;
  get flashClass() {
    return this.highlighted;
  }
  constructor(ref) {
    this.ref = ref;
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: RefDirective,
    deps: [{ token: i0.ElementRef }],
    target: i0.ɵɵFactoryTarget.Directive,
  });
  static ɵdir = i0.ɵɵngDeclareDirective({
    minVersion: '14.0.0',
    version: '16.2.9',
    type: RefDirective,
    selector: '[solidGlossaryEntry]',
    inputs: { refId: 'refId', highlighted: 'highlighted' },
    host: { properties: { 'class.flash': 'this.flashClass' } },
    ngImport: i0,
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: RefDirective,
  decorators: [
    {
      type: Directive,
      args: [{ selector: '[solidGlossaryEntry]' }],
    },
  ],
  ctorParameters: function () {
    return [{ type: i0.ElementRef }];
  },
  propDecorators: {
    refId: [
      {
        type: Input,
      },
    ],
    highlighted: [
      {
        type: Input,
      },
    ],
    flashClass: [
      {
        type: HostBinding,
        args: ['class.flash'],
      },
    ],
  },
});

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
class GlossaryComponent {
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
    deps: [{ token: i1$1.Store }],
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
        type: RefDirective,
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
    return [{ type: i1$1.Store }];
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

// This workaround is required for the "old" angular compiler in production mode. Ivy library publishing is not supported until angular 10.
// https://github.com/ng-packagr/ng-packagr/issues/767
const ngxsFeatureModule = NgxsModule.forFeature([GlossaryState]);
class SolidGlossaryModule {
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: SolidGlossaryModule,
    deps: [],
    target: i0.ɵɵFactoryTarget.NgModule,
  });
  static ɵmod = i0.ɵɵngDeclareNgModule({
    minVersion: '14.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: SolidGlossaryModule,
    declarations: [GlossaryComponent, RefDirective],
    imports: [
      SolidCoreModule,
      MatListModule,
      i1$1.ɵNgxsFeatureModule,
      MatInputModule,
      MatIconModule,
      MatButtonModule,
    ],
    exports: [GlossaryComponent],
  });
  static ɵinj = i0.ɵɵngDeclareInjector({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: SolidGlossaryModule,
    imports: [
      SolidCoreModule,
      MatListModule,
      ngxsFeatureModule,
      MatInputModule,
      MatIconModule,
      MatButtonModule,
    ],
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: SolidGlossaryModule,
  decorators: [
    {
      type: NgModule,
      args: [
        {
          declarations: [GlossaryComponent, RefDirective],
          imports: [
            SolidCoreModule,
            MatListModule,
            ngxsFeatureModule,
            MatInputModule,
            MatIconModule,
            MatButtonModule,
          ],
          exports: [GlossaryComponent],
        },
      ],
    },
  ],
});

/**
 * Generated bundle index. Do not edit.
 */

export { GlossaryComponent, SolidGlossaryModule, ngxsFeatureModule };
//# sourceMappingURL=zentrumnawi-solid-glossary.mjs.map
