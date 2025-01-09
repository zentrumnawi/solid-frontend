import * as i0 from '@angular/core';
import {
  Component,
  Inject,
  Injectable,
  InjectionToken,
  Directive,
  HostBinding,
  Input,
  EventEmitter,
  ViewChild,
  HostListener,
  Output,
  ErrorHandler,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import * as i1$2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i3$1 from '@zentrumnawi/solid-core';
import { SOLID_CORE_CONFIG, SolidCoreModule } from '@zentrumnawi/solid-core';
import * as i8$1 from '@angular/material/sidenav';
import { MatSidenavModule } from '@angular/material/sidenav';
import * as i2$1 from '@angular/cdk/layout';
import { Breakpoints } from '@angular/cdk/layout';
import * as i1$1 from '@angular/service-worker';
import * as i1 from '@angular/material/dialog';
import {
  MAT_DIALOG_DATA,
  MatDialogConfig,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import * as i4 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import {
  of,
  ReplaySubject,
  map as map$1,
  tap,
  Subject,
  takeUntil,
  Observable,
} from 'rxjs';
import * as i1$4 from '@angular/forms';
import { Validators } from '@angular/forms';
import * as i1$3 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i5 from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import * as i7 from '@angular/material/input';
import { MatInputModule } from '@angular/material/input';
import * as i8 from '@angular/cdk/text-field';
import * as i9 from '@angular/material/checkbox';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { map, catchError } from 'rxjs/operators';
import * as i1$5 from '@angular/router';
import { Router, ROUTES, RouterModule } from '@angular/router';
import * as i2 from '@ngxs/store';
import {
  Action,
  Selector,
  State,
  Store,
  Select,
  NgxsModule,
} from '@ngxs/store';
import { RouterDataResolved, Navigate } from '@ngxs/router-plugin';
import * as i3 from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import introJs from 'intro.js';
import * as i2$2 from '@angular/platform-browser';
import * as i10 from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';
import * as i6 from '@angular/material/slide-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import * as i1$6 from '@angular/material/grid-list';
import { MatGridListModule } from '@angular/material/grid-list';
import * as i13 from '@angular/material/badge';
import { MatBadgeModule } from '@angular/material/badge';
import {
  BaseComponent,
  SOLID_PROFILE_BASE_URL,
} from '@zentrumnawi/solid-profile';
import * as i5$1 from '@zentrumnawi/solid-glossary';
import { SolidGlossaryModule } from '@zentrumnawi/solid-glossary';
import * as i9$1 from '@angular/material/toolbar';
import { MatToolbarModule } from '@angular/material/toolbar';
import * as i3$2 from '@angular/material/core';
import * as i4$1 from '@angular/material/list';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import * as i8$2 from '@angular/material/tabs';
import { MatTabsModule } from '@angular/material/tabs';
import { createErrorHandler, init } from '@sentry/angular';
import { SOLID_SLIDESHOW_APP_ROUTING_CONFIG } from '@zentrumnawi/solid-slideshow';
import { MatExpansionModule } from '@angular/material/expansion';

class UpdateDialogComponent {
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
        type: i4.MatButton,
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

class UpdateService {
  constructor(updates, dialog) {
    updates.available.subscribe((event) => {
      dialog.open(UpdateDialogComponent, {
        disableClose: true,
        data: {
          cb: () =>
            updates.activateUpdate().then(() => document.location.reload()),
        },
      });
      console.log('current version is', event.current);
      console.log('available version is', event.available);
    });
    updates.activated.subscribe((event) => {
      console.log('old version was', event.previous);
      console.log('new version is', event.current);
    });
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: UpdateService,
    deps: [{ token: i1$1.SwUpdate }, { token: i1.MatDialog }],
    target: i0.ɵɵFactoryTarget.Injectable,
  });
  static ɵprov = i0.ɵɵngDeclareInjectable({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: UpdateService,
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: UpdateService,
  decorators: [
    {
      type: Injectable,
    },
  ],
  ctorParameters: function () {
    return [{ type: i1$1.SwUpdate }, { type: i1.MatDialog }];
  },
});

const defaultSkeletonConfig = {
  feedbackEnabled: true,
  glossary: {
    enabled: true,
    matIcon: 'help',
  },
  routingConfig: {
    landing: {
      enabled: true,
      showOnLandingPage: false,
      showInMenu: true,
      url: '',
      title: 'Startseite',
      order: 0,
      matIcon: 'home',
    },
    profile: {
      enabled: true,
      showOnLandingPage: true,
      showInMenu: true,
      url: 'profiles',
      title: 'Steckbriefe',
      order: 1,
      matIcon: 'list',
      moduleImport: () =>
        import('@zentrumnawi/solid-profile').then((m) => m.SolidProfileModule),
    },
    quiz: {
      enabled: true,
      showOnLandingPage: true,
      showInMenu: true,
      url: 'quiz',
      title: 'Selbsttest',
      order: 2,
      matIcon: 'question_answer',
      moduleImport: () =>
        import('@zentrumnawi/solid-quiz').then((m) => m.SolidQuizModule),
    },
    slideshow: {
      enabled: true,
      showOnLandingPage: true,
      showInMenu: true,
      url: 'slideshow',
      title: 'Bestimmungshelfer',
      order: 3,
      matIcon: 'help',
      moduleImport: () =>
        import('@zentrumnawi/solid-slideshow').then(
          (m) => m.SolidSlideshowModule
        ),
    },
    info: {
      enabled: true,
      showOnLandingPage: true,
      showInMenu: true,
      url: 'info',
      title: 'Info | Datenschutz',
      order: 4,
      matIcon: 'info',
    },
    // privacy: {
    //   enabled: true,
    //   showOnLandingPage: true,
    //   showInMenu: true,
    //   url: 'privacy',
    //   title: 'Datenschutz',
    //   order: 5,
    //   matIcon: 'info',
    // },
  },
};
const SOLID_SKELETON_CONFIG = new InjectionToken('solid-skeleton-config');

class PrivacyDialogComponent {
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
        type: i1$2.NgComponentOutlet,
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
        type: i4.MatIconButton,
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
        type: i1$3.MatIcon,
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

class FeedbackComponent {
  feedback;
  fb;
  _ref;
  _dialog;
  _submitFeedback;
  static STORAGE_KEY_1 = 'FEEDBACK';
  static STORAGE_KEY_2 = 'ERROR_REPORT';
  _sent = false;
  Form;
  formTitle;
  privacyChecked = false;
  constructor(
    feedback,
    fb,
    _ref,
    _dialog,
    /** Inject the required service function to prevent a circular dependency between the Component and the service */
    /* type is defined as any to prevent ng-packagr issues
     (data: any) => Observable<boolean> */
    _submitFeedback
  ) {
    this.feedback = feedback;
    this.fb = fb;
    this._ref = _ref;
    this._dialog = _dialog;
    this._submitFeedback = _submitFeedback;
    this.formTitle = _submitFeedback.title;
    this.Form = fb.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      subject: [_submitFeedback.subject, Validators.required],
      message: [''],
    });
  }
  onCancelClick() {
    this._ref.close();
  }
  onOkClick() {
    if (!this.Form.valid) {
      this.Form.markAllAsTouched();
    } else {
      this.Form.value['message'] += '\n\n' + this._submitFeedback.location;
      this.feedback.submitFeedback(this.Form.value).subscribe(() => {
        this._sent = true;
        this._ref.close();
      });
    }
  }
  ngOnDestroy() {
    const key = this.getLocation()
      ? FeedbackComponent.STORAGE_KEY_2
      : FeedbackComponent.STORAGE_KEY_1;
    sessionStorage.setItem(key, JSON.stringify(this.Form.value));
    if (this._sent) {
      sessionStorage.removeItem(key);
    }
  }
  ngOnInit() {
    const str = this.getLocation()
      ? sessionStorage.getItem(FeedbackComponent.STORAGE_KEY_2)
      : sessionStorage.getItem(FeedbackComponent.STORAGE_KEY_1);
    if (!str) {
      return;
    }
    const obj = JSON.parse(str);
    this.Form.setValue(obj);
  }
  getLocation() {
    return this._submitFeedback.location;
  }
  onPrivacyClick() {
    this._dialog.open(PrivacyDialogComponent, {
      maxWidth: '800px',
      panelClass: 'privacy-dialog',
    });
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: FeedbackComponent,
    deps: [
      { token: SOLID_SKELETON_FEEDBACK_SERVICE },
      { token: i1$4.UntypedFormBuilder },
      { token: i1.MatDialogRef },
      { token: i1.MatDialog },
      { token: MAT_DIALOG_DATA },
    ],
    target: i0.ɵɵFactoryTarget.Component,
  });
  static ɵcmp = i0.ɵɵngDeclareComponent({
    minVersion: '14.0.0',
    version: '16.2.9',
    type: FeedbackComponent,
    selector: 'solid-skeleton-feedback',
    ngImport: i0,
    template:
      '<div class="header-container">\r\n  <p class="title">{{ formTitle }}</p>\r\n  <button class="closeBtn" mat-icon-button mat-dialog-close>\r\n    <mat-icon>close</mat-icon>\r\n  </button>\r\n</div>\r\n<div class="feedback-content" mat-dialog-content>\r\n  <form [formGroup]="Form">\r\n    <mat-form-field>\r\n      <input formControlName="name" matInput placeholder="Name" type="text" />\r\n    </mat-form-field>\r\n    <mat-form-field>\r\n      <input\r\n        formControlName="email"\r\n        matInput\r\n        placeholder="Email"\r\n        type="email"\r\n      />\r\n    </mat-form-field>\r\n    <mat-form-field>\r\n      <input matInput formControlName="subject" placeholder="Betreff" />\r\n    </mat-form-field>\r\n    <mat-form-field>\r\n      <textarea\r\n        cdkAutosizeMinRows="10"\r\n        cdkTextareaAutosize\r\n        formControlName="message"\r\n        matInput\r\n        placeholder="Nachricht"\r\n      ></textarea>\r\n    </mat-form-field>\r\n  </form>\r\n</div>\r\n<div class="additional-container">\r\n  <mat-label class="location" *ngIf="getLocation()"\r\n    >Fehler gefunden in: {{ getLocation() }}</mat-label\r\n  >\r\n  <mat-checkbox [(ngModel)]="privacyChecked">\r\n    Hiermit nehme ich die\r\n    <a class="privacy-link" (click)="onPrivacyClick()">Datenschutzerkl\u00E4rung</a>\r\n    zur Kenntnis und stimme der Speicherung der in diesem Formular angegebenen\r\n    Daten zu.\r\n  </mat-checkbox>\r\n</div>\r\n<div mat-dialog-actions>\r\n  <div class="spacer"></div>\r\n  <button type="submit" (click)="onCancelClick()" mat-button>Abbrechen</button>\r\n  <button\r\n    [disabled]="!privacyChecked"\r\n    class="send-btn"\r\n    (click)="onOkClick()"\r\n    mat-button\r\n  >\r\n    Absenden\r\n  </button>\r\n</div>\r\n',
    styles: [
      '::ng-deep .mat-dialog-container{border-radius:6px}::ng-deep .feedback-content{overflow:unset;margin-top:28px}::ng-deep .mat-dialog-title{margin-bottom:20px;height:42px;margin-top:-27px}::ng-deep textarea.mat-input-element{height:30px;max-height:300px}::ng-deep .mat-button-focus-overlay{background-color:transparent}::ng-deep .report-dialog .header-container{background-color:tomato!important;z-index:999}@media (max-width: 420px){::ng-deep .report-dialog .mat-dialog-container,::ng-deep .feedback-dialog .mat-dialog-container{margin:0!important;width:100vw;height:100vh;border-radius:0}}@media (max-width: 420px) and (min-height: 741px){::ng-deep .report-dialog textarea.mat-input-element,::ng-deep .feedback-dialog textarea.mat-input-element{min-height:320px!important;max-height:320px}}@media (max-width: 420px) and (max-height: 740px){::ng-deep .report-dialog textarea.mat-input-element,::ng-deep .feedback-dialog textarea.mat-input-element{min-height:200px!important;max-height:200px}}@media (max-width: 420px){::ng-deep .report-dialog mat-checkbox ::ng-deep .mat-checkbox-label,::ng-deep .feedback-dialog mat-checkbox ::ng-deep .mat-checkbox-label{margin-top:10px}.send-btn{margin-left:0!important}.header-container{width:100%!important;z-index:999;border-top-left-radius:0!important;border-top-right-radius:0!important}}mat-form-field{width:100%}mat-checkbox{margin-top:20px;font-size:small}mat-checkbox ::ng-deep .mat-checkbox-layout{white-space:normal!important}mat-checkbox ::ng-deep .mat-checkbox-label{margin-left:8px}.privacy-link{text-decoration:underline;cursor:pointer;font-weight:500}.header-container{display:flex;justify-content:space-between;position:fixed;width:600px;height:40px;margin-top:-24px;margin-left:-24px;border-top-left-radius:4px;border-top-right-radius:4px;color:#fff}.header-container p.title{margin-left:19px;margin-top:8px;font-weight:500;font-size:18px}.header-container .closeBtn{width:23px;margin-top:8px;margin-right:8px}.header-container .closeBtn mat-icon{vertical-align:top;font-size:25px;font-weight:600}.header-container .closeBtn ::ng-deep .mat-button-focus-overlay{background-color:transparent}.additional-container{display:flex;flex-direction:column;margin-top:10px}.additional-container .location{color:#0000008a;font-weight:500}\n',
    ],
    dependencies: [
      {
        kind: 'directive',
        type: i1$2.NgIf,
        selector: '[ngIf]',
        inputs: ['ngIf', 'ngIfThen', 'ngIfElse'],
      },
      {
        kind: 'directive',
        type: i1$4.ɵNgNoValidate,
        selector: 'form:not([ngNoForm]):not([ngNativeValidate])',
      },
      {
        kind: 'directive',
        type: i1$4.DefaultValueAccessor,
        selector:
          'input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]',
      },
      {
        kind: 'directive',
        type: i1$4.NgControlStatus,
        selector: '[formControlName],[ngModel],[formControl]',
      },
      {
        kind: 'directive',
        type: i1$4.NgControlStatusGroup,
        selector:
          '[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]',
      },
      {
        kind: 'directive',
        type: i1$4.NgModel,
        selector: '[ngModel]:not([formControlName]):not([formControl])',
        inputs: ['name', 'disabled', 'ngModel', 'ngModelOptions'],
        outputs: ['ngModelChange'],
        exportAs: ['ngModel'],
      },
      {
        kind: 'directive',
        type: i1$4.FormGroupDirective,
        selector: '[formGroup]',
        inputs: ['formGroup'],
        outputs: ['ngSubmit'],
        exportAs: ['ngForm'],
      },
      {
        kind: 'directive',
        type: i1$4.FormControlName,
        selector: '[formControlName]',
        inputs: ['formControlName', 'disabled', 'ngModel'],
        outputs: ['ngModelChange'],
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
        kind: 'component',
        type: i4.MatIconButton,
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
        kind: 'directive',
        type: i1.MatDialogActions,
        selector:
          '[mat-dialog-actions], mat-dialog-actions, [matDialogActions]',
        inputs: ['align'],
      },
      {
        kind: 'component',
        type: i5.MatFormField,
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
      { kind: 'directive', type: i5.MatLabel, selector: 'mat-label' },
      {
        kind: 'component',
        type: i1$3.MatIcon,
        selector: 'mat-icon',
        inputs: ['color', 'inline', 'svgIcon', 'fontSet', 'fontIcon'],
        exportAs: ['matIcon'],
      },
      {
        kind: 'directive',
        type: i7.MatInput,
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
        kind: 'directive',
        type: i8.CdkTextareaAutosize,
        selector: 'textarea[cdkTextareaAutosize]',
        inputs: [
          'cdkAutosizeMinRows',
          'cdkAutosizeMaxRows',
          'cdkTextareaAutosize',
          'placeholder',
        ],
        exportAs: ['cdkTextareaAutosize'],
      },
      {
        kind: 'component',
        type: i9.MatCheckbox,
        selector: 'mat-checkbox',
        inputs: ['disableRipple', 'color', 'tabIndex'],
        exportAs: ['matCheckbox'],
      },
    ],
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: FeedbackComponent,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'solid-skeleton-feedback',
          template:
            '<div class="header-container">\r\n  <p class="title">{{ formTitle }}</p>\r\n  <button class="closeBtn" mat-icon-button mat-dialog-close>\r\n    <mat-icon>close</mat-icon>\r\n  </button>\r\n</div>\r\n<div class="feedback-content" mat-dialog-content>\r\n  <form [formGroup]="Form">\r\n    <mat-form-field>\r\n      <input formControlName="name" matInput placeholder="Name" type="text" />\r\n    </mat-form-field>\r\n    <mat-form-field>\r\n      <input\r\n        formControlName="email"\r\n        matInput\r\n        placeholder="Email"\r\n        type="email"\r\n      />\r\n    </mat-form-field>\r\n    <mat-form-field>\r\n      <input matInput formControlName="subject" placeholder="Betreff" />\r\n    </mat-form-field>\r\n    <mat-form-field>\r\n      <textarea\r\n        cdkAutosizeMinRows="10"\r\n        cdkTextareaAutosize\r\n        formControlName="message"\r\n        matInput\r\n        placeholder="Nachricht"\r\n      ></textarea>\r\n    </mat-form-field>\r\n  </form>\r\n</div>\r\n<div class="additional-container">\r\n  <mat-label class="location" *ngIf="getLocation()"\r\n    >Fehler gefunden in: {{ getLocation() }}</mat-label\r\n  >\r\n  <mat-checkbox [(ngModel)]="privacyChecked">\r\n    Hiermit nehme ich die\r\n    <a class="privacy-link" (click)="onPrivacyClick()">Datenschutzerkl\u00E4rung</a>\r\n    zur Kenntnis und stimme der Speicherung der in diesem Formular angegebenen\r\n    Daten zu.\r\n  </mat-checkbox>\r\n</div>\r\n<div mat-dialog-actions>\r\n  <div class="spacer"></div>\r\n  <button type="submit" (click)="onCancelClick()" mat-button>Abbrechen</button>\r\n  <button\r\n    [disabled]="!privacyChecked"\r\n    class="send-btn"\r\n    (click)="onOkClick()"\r\n    mat-button\r\n  >\r\n    Absenden\r\n  </button>\r\n</div>\r\n',
          styles: [
            '::ng-deep .mat-dialog-container{border-radius:6px}::ng-deep .feedback-content{overflow:unset;margin-top:28px}::ng-deep .mat-dialog-title{margin-bottom:20px;height:42px;margin-top:-27px}::ng-deep textarea.mat-input-element{height:30px;max-height:300px}::ng-deep .mat-button-focus-overlay{background-color:transparent}::ng-deep .report-dialog .header-container{background-color:tomato!important;z-index:999}@media (max-width: 420px){::ng-deep .report-dialog .mat-dialog-container,::ng-deep .feedback-dialog .mat-dialog-container{margin:0!important;width:100vw;height:100vh;border-radius:0}}@media (max-width: 420px) and (min-height: 741px){::ng-deep .report-dialog textarea.mat-input-element,::ng-deep .feedback-dialog textarea.mat-input-element{min-height:320px!important;max-height:320px}}@media (max-width: 420px) and (max-height: 740px){::ng-deep .report-dialog textarea.mat-input-element,::ng-deep .feedback-dialog textarea.mat-input-element{min-height:200px!important;max-height:200px}}@media (max-width: 420px){::ng-deep .report-dialog mat-checkbox ::ng-deep .mat-checkbox-label,::ng-deep .feedback-dialog mat-checkbox ::ng-deep .mat-checkbox-label{margin-top:10px}.send-btn{margin-left:0!important}.header-container{width:100%!important;z-index:999;border-top-left-radius:0!important;border-top-right-radius:0!important}}mat-form-field{width:100%}mat-checkbox{margin-top:20px;font-size:small}mat-checkbox ::ng-deep .mat-checkbox-layout{white-space:normal!important}mat-checkbox ::ng-deep .mat-checkbox-label{margin-left:8px}.privacy-link{text-decoration:underline;cursor:pointer;font-weight:500}.header-container{display:flex;justify-content:space-between;position:fixed;width:600px;height:40px;margin-top:-24px;margin-left:-24px;border-top-left-radius:4px;border-top-right-radius:4px;color:#fff}.header-container p.title{margin-left:19px;margin-top:8px;font-weight:500;font-size:18px}.header-container .closeBtn{width:23px;margin-top:8px;margin-right:8px}.header-container .closeBtn mat-icon{vertical-align:top;font-size:25px;font-weight:600}.header-container .closeBtn ::ng-deep .mat-button-focus-overlay{background-color:transparent}.additional-container{display:flex;flex-direction:column;margin-top:10px}.additional-container .location{color:#0000008a;font-weight:500}\n',
          ],
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [
      {
        type: FeedbackService,
        decorators: [
          {
            type: Inject,
            args: [SOLID_SKELETON_FEEDBACK_SERVICE],
          },
        ],
      },
      { type: i1$4.UntypedFormBuilder },
      { type: i1.MatDialogRef },
      { type: i1.MatDialog },
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

const SOLID_SKELETON_FEEDBACK_SERVICE = new InjectionToken(
  'SOLID_SKELETON_FEEDBACK_SERVICE'
);
function feedbackServiceFactory(http, dialog, coreConfig, skeletonConfig) {
  if (skeletonConfig.feedbackEnabled) {
    return new FeedbackService(http, dialog, coreConfig);
  }
  return null;
}
class FeedbackService {
  _http;
  _dialog;
  _config;
  constructor(_http, _dialog, _config) {
    this._http = _http;
    this._dialog = _dialog;
    this._config = _config;
  }
  showDialog(location, title) {
    const dialogConfig = new MatDialogConfig();
    const report = title == '' ? 'Fehler melden' : 'Fehler melden - ' + title;
    dialogConfig.data = {
      location: location,
      title: location ? 'Fehler melden' : 'Kontakt und Feedback',
      subject: location ? report : 'Feedback',
    };
    this._dialog.open(FeedbackComponent, {
      data: dialogConfig.data,
      maxWidth: '600px',
      panelClass: location ? 'report-dialog' : 'feedback-dialog',
    });
  }
  submitFeedback(value) {
    return this._http.post(`${this._config.apiUrl}/contact`, value).pipe(
      map((_) => true),
      catchError((err) => of(false))
    );
  }
}

class SetMenuEntries {
  items;
  static type = '[Menu] set entries';
  constructor(items) {
    this.items = items;
  }
}

var __decorate$4 =
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
var __metadata$4 =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
const isActive = (routerUrl, routeUrl) =>
  routeUrl === ''
    ? routerUrl === '/'
    : routerUrl.substring(1).startsWith(routeUrl);
let MenuState = class MenuState {
  store;
  _http;
  _config;
  items;
  static getLandingItems(state) {
    const filter = function (item) {
      return item.showOnLanding;
    };
    return state.items.filter(filter);
  }
  static getMenuItems(state) {
    const filter = function (item) {
      return item.showInMenu;
    };
    return state.items.filter(filter);
  }
  constructor(router, store, _http, _config) {
    this.store = store;
    this._http = _http;
    this._config = _config;
    const items = [];
    for (const route of router.config.sort(
      (a, b) => a.data?.order - b.data?.order
    )) {
      items.push({
        route: route.path || '',
        active: isActive(router.url, route.path || ''),
        title: route.data?.title,
        icon: route.data?.icon,
        svgIcon: route.data?.svgIcon,
        showInMenu: route.data?.showInMenu,
        showOnLanding: route.data?.showOnLandingPage,
        name: route.data?.name,
      });
    }
    this.items = items;
    setTimeout(() => this.store.dispatch(new SetMenuEntries(items)));
  }
  getItemsCount() {
    const filter = function (item) {
      return item.showOnLanding;
    };
    return this.items.filter(filter).length;
  }
  setEntries({ setState }, { items }) {
    return setState({
      items: [...items],
    });
  }
  test(ctx, { event }) {
    const newUrl = event.urlAfterRedirects;
    const newItems = ctx.getState().items.map((item) => {
      return { ...item, active: isActive(newUrl, item.route) };
    });
    return ctx.patchState({
      items: newItems,
    });
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: MenuState,
    deps: [
      { token: i1$5.Router },
      { token: i2.Store },
      { token: i3.HttpClient },
      { token: SOLID_CORE_CONFIG },
    ],
    target: i0.ɵɵFactoryTarget.Injectable,
  });
  static ɵprov = i0.ɵɵngDeclareInjectable({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: MenuState,
  });
};
__decorate$4(
  [
    Action(SetMenuEntries),
    __metadata$4('design:type', Function),
    __metadata$4('design:paramtypes', [Object, SetMenuEntries]),
    __metadata$4('design:returntype', void 0),
  ],
  MenuState.prototype,
  'setEntries',
  null
);
__decorate$4(
  [
    Action(RouterDataResolved),
    __metadata$4('design:type', Function),
    __metadata$4('design:paramtypes', [Object, RouterDataResolved]),
    __metadata$4('design:returntype', void 0),
  ],
  MenuState.prototype,
  'test',
  null
);
__decorate$4(
  [
    Selector(),
    __metadata$4('design:type', Function),
    __metadata$4('design:paramtypes', [Object]),
    __metadata$4('design:returntype', Array),
  ],
  MenuState,
  'getLandingItems',
  null
);
__decorate$4(
  [
    Selector(),
    __metadata$4('design:type', Function),
    __metadata$4('design:paramtypes', [Object]),
    __metadata$4('design:returntype', Array),
  ],
  MenuState,
  'getMenuItems',
  null
);
MenuState = __decorate$4(
  [
    State({
      name: 'menu',
      defaults: {
        items: [],
      },
    }),
    __metadata$4('design:paramtypes', [Router, Store, HttpClient, Object]),
  ],
  MenuState
);
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: MenuState,
  decorators: [
    {
      type: Injectable,
    },
  ],
  ctorParameters: function () {
    return [
      { type: i1$5.Router },
      { type: i2.Store },
      { type: i3.HttpClient },
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
  propDecorators: { setEntries: [], test: [] },
});

var __decorate$3 =
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
var __metadata$3 =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
class IntroService {
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
__decorate$3(
  [
    Dispatch(),
    __metadata$3('design:type', Function),
    __metadata$3('design:paramtypes', [String]),
    __metadata$3('design:returntype', Promise),
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

class LandingBannerDialogComponent {
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
        type: i1$2.NgForOf,
        selector: '[ngFor][ngForOf]',
        inputs: ['ngForOf', 'ngForTrackBy', 'ngForTemplate'],
      },
      {
        kind: 'component',
        type: i3$1.MarkdownComponent,
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
        type: i10.MatCardAvatar,
        selector: '[mat-card-avatar], [matCardAvatar]',
      },
      {
        kind: 'directive',
        type: i10.MatCardContent,
        selector: 'mat-card-content',
      },
      {
        kind: 'component',
        type: i10.MatCardHeader,
        selector: 'mat-card-header',
      },
      {
        kind: 'directive',
        type: i10.MatCardSubtitle,
        selector: 'mat-card-subtitle, [mat-card-subtitle], [matCardSubtitle]',
      },
      {
        kind: 'directive',
        type: i10.MatCardTitle,
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

var MessageType;
(function (MessageType) {
  MessageType['Changelog'] = 'CL';
  MessageType['Series'] = 'SE';
  MessageType['Notice'] = 'NO';
})(MessageType || (MessageType = {}));

const sortByDate = function (a, b) {
  return b.valid_from.getTime() - a.valid_from.getTime();
};
class MessagesService {
  _config;
  _http;
  messages = new ReplaySubject();
  messages$ = this.messages.asObservable();
  messageKey = 'solid_skeleton_messages';
  constructor(_config, _http) {
    this._config = _config;
    this._http = _http;
    this.getMessages().subscribe();
  }
  getMessages() {
    const now = new Date(Date.now());
    const localMessages = [];
    const localData = localStorage.getItem(this.messageKey);
    if (localData) {
      localMessages.push(...JSON.parse(localData));
    }
    return this._http.get(`${this._config.apiUrl}/messages`).pipe(
      map$1((res) => {
        return res
          .map((message) => {
            return {
              ...message,
              valid_to:
                message.valid_to === null ? null : new Date(message.valid_to),
              valid_from: new Date(message.valid_from),
              unread:
                localMessages.find((msg) => msg.id === message.id)?.unread ??
                true,
            };
          })
          .filter((msg) => {
            return (
              msg.valid_from < now &&
              (msg.valid_to === null || msg.valid_to > now)
            );
          })
          .sort(sortByDate);
      }),
      tap((res) => {
        this.updateMessageState(res);
      })
    );
  }
  updateMessageState(msgs) {
    if (!msgs) {
      return;
    }
    this.messages.next(msgs);
    localStorage.setItem(this.messageKey, JSON.stringify(msgs));
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: MessagesService,
    deps: [{ token: SOLID_CORE_CONFIG }, { token: i3.HttpClient }],
    target: i0.ɵɵFactoryTarget.Injectable,
  });
  static ɵprov = i0.ɵɵngDeclareInjectable({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: MessagesService,
    providedIn: 'root',
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: MessagesService,
  decorators: [
    {
      type: Injectable,
      args: [
        {
          providedIn: 'root',
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
            args: [SOLID_CORE_CONFIG],
          },
        ],
      },
      { type: i3.HttpClient },
    ];
  },
});

class GridColsDirective {
  grid;
  breakpointObserver;
  gridWidth;
  gridMarginTop;
  gridCols = { xs: 1, sm: 2, md: 4, lg: 6, xl: 7 };
  get cols() {
    return this.gridCols;
  }
  set cols(map) {
    if (map && 'object' === typeof map) {
      this.gridCols = map;
    }
  }
  constructor(grid, breakpointObserver) {
    this.grid = grid;
    this.breakpointObserver = breakpointObserver;
    if (this.grid != null) {
      this.grid.cols = this.gridCols.md;
    }
  }
  ngOnInit() {
    if (this.grid != null) {
      this.grid.cols = this.gridCols.md;
    }
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((result) => {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.grid.cols = this.gridCols.xs;
          this.gridWidth = '23rem';
        }
        if (result.breakpoints[Breakpoints.Small]) {
          this.grid.cols = this.gridCols.sm;
          this.gridWidth = '34rem';
          this.gridMarginTop = '1vh';
        }
        if (result.breakpoints[Breakpoints.Medium]) {
          this.grid.cols = this.gridCols.md;
          this.gridWidth = '34rem';
          this.gridMarginTop = '1vh';
        }
        if (result.breakpoints[Breakpoints.Large]) {
          this.grid.cols = this.gridCols.lg;
          this.gridWidth = '34rem';
          this.gridMarginTop = '1vh';
        }
        if (result.breakpoints[Breakpoints.XLarge]) {
          this.grid.cols = this.gridCols.xl;
          this.gridWidth = this.grid.cols > 6 ? '80rem ' : '70rem';
          this.gridMarginTop = '4vh';
        }
      });
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: GridColsDirective,
    deps: [{ token: i1$6.MatGridList }, { token: i2$1.BreakpointObserver }],
    target: i0.ɵɵFactoryTarget.Directive,
  });
  static ɵdir = i0.ɵɵngDeclareDirective({
    minVersion: '14.0.0',
    version: '16.2.9',
    type: GridColsDirective,
    selector: '[solidSkeletonGridCols]',
    inputs: { cols: ['solidSkeletonGridCols', 'cols'] },
    host: {
      properties: {
        'style.width': 'this.gridWidth',
        'style.marginTop': 'this.gridMarginTop',
      },
    },
    ngImport: i0,
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: GridColsDirective,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: '[solidSkeletonGridCols]',
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [{ type: i1$6.MatGridList }, { type: i2$1.BreakpointObserver }];
  },
  propDecorators: {
    gridWidth: [
      {
        type: HostBinding,
        args: ['style.width'],
      },
    ],
    gridMarginTop: [
      {
        type: HostBinding,
        args: ['style.marginTop'],
      },
    ],
    cols: [
      {
        type: Input,
        args: ['solidSkeletonGridCols'],
      },
    ],
  },
});

var __decorate$2 =
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
var __metadata$2 =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
const SOLID_SKELETON_HACKY_INJECTION = new InjectionToken(
  'solid-skeleton-hacky-injection'
);
class LandingComponent {
  feedback;
  coreConfig;
  introService;
  landingDialog;
  menuState;
  messagesService;
  menuItems$;
  Landing;
  onGlossaryClick = new EventEmitter();
  destroy$ = new Subject();
  landingBannerKey = 'hide_landing_banner';
  landingTourKey = 'hide_landing_tour';
  messages = [];
  msgCount = 0;
  messagesLoading = true;
  showLanding =
    localStorage.getItem(this.landingBannerKey) == 'false' ? true : false;
  showTour =
    localStorage.getItem(this.landingTourKey) == 'false' || this.showLanding
      ? true
      : false;
  innerWidth = window.innerWidth;
  gridColumns;
  landingInfo;
  landingRef;
  constructor(
    feedback,
    coreConfig,
    iconRegistry,
    sanitizer,
    introService,
    landingDialog,
    menuState,
    messagesService
  ) {
    this.feedback = feedback;
    this.coreConfig = coreConfig;
    this.introService = introService;
    this.landingDialog = landingDialog;
    this.menuState = menuState;
    this.messagesService = messagesService;
    iconRegistry.addSvgIcon(
      'glossary_custom',
      sanitizer.bypassSecurityTrustResourceUrl(coreConfig.glossaryLogo)
    );
  }
  onResize(event) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth > 700 && this.landingRef) {
      this.landingRef.close();
      this.showTour = false;
    }
  }
  ngOnInit() {
    this.getNewMessagesCount();
    const itemsCount = this.menuState.getItemsCount();
    this.gridColumns = { xs: 2, sm: 3, md: 3, lg: 3, xl: itemsCount + 2 };
    this.landingInfo = this.coreConfig.landingBannerContent;
  }
  ngAfterViewInit() {
    if (this.innerWidth < 700 && this.showLanding) {
      this.landingRef = this.landingDialog.open(LandingBannerDialogComponent, {
        panelClass: 'landing-banner-dialog',
      });
      this.landingRef.afterClosed().subscribe(() => {
        if (this.showTour) this.startGuidedTour();
      });
    } else if (!this.showLanding && this.showTour) this.startGuidedTour();
  }
  ngOnDestroy() {
    if (this.showTour) localStorage.setItem(this.landingTourKey, 'false');
    this.destroy$.next();
    this.destroy$.complete();
  }
  startGuidedTour() {
    setTimeout(() => {
      this.introService.guidedTour((_targetElement) => {
        try {
          const id = _targetElement.id;
          const landing = this.Landing?.nativeElement;
          const menuOffSetTop =
            document.getElementById('menu-grid-list')?.offsetTop;
          if (id.slice(0, 9) == 'menu-tile' || id == 'feedback') {
            if (menuOffSetTop) landing.scrollTop = menuOffSetTop - 50;
          }
          if (id == '') {
            if (menuOffSetTop) landing.scrollTop = 0;
          }
        } catch (error) {
          return;
        }
        return;
      });
    }, 500);
  }
  onNotShowAgainToggle(change) {
    if (change.checked) localStorage.setItem(this.landingBannerKey, 'true');
    else localStorage.setItem(this.landingBannerKey, 'false');
  }
  onStartTourToggle(change) {
    this.showTour = !this.showTour;
    if (change.checked) localStorage.setItem(this.landingTourKey, 'false');
    else localStorage.setItem(this.landingTourKey, 'true');
  }
  onCloseClick() {
    this.showLanding = false;
    localStorage.setItem(this.landingBannerKey, 'true');
    if (this.showTour) {
      localStorage.setItem(this.landingTourKey, 'false');
      this.startGuidedTour();
    }
  }
  getNewMessagesCount() {
    this.messagesService.messages$
      .pipe(takeUntil(this.destroy$))
      .subscribe((msgs) => {
        this.messages = msgs.filter((msg) => {
          return msg.unread && msg.type !== MessageType.Changelog;
        });
        this.msgCount = this.messages.length;
        this.messagesLoading = false;
      });
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: LandingComponent,
    deps: [
      { token: SOLID_SKELETON_FEEDBACK_SERVICE },
      { token: SOLID_CORE_CONFIG },
      { token: i1$3.MatIconRegistry },
      { token: i2$2.DomSanitizer },
      { token: IntroService },
      { token: i1.MatDialog },
      { token: MenuState },
      { token: MessagesService },
    ],
    target: i0.ɵɵFactoryTarget.Component,
  });
  static ɵcmp = i0.ɵɵngDeclareComponent({
    minVersion: '14.0.0',
    version: '16.2.9',
    type: LandingComponent,
    selector: 'solid-skeleton-landing',
    host: { listeners: { 'window:resize': 'onResize($event)' } },
    viewQueries: [
      {
        propertyName: 'Landing',
        first: true,
        predicate: ['landing'],
        descendants: true,
      },
    ],
    ngImport: i0,
    template:
      '<div class="landing-container" #landing>\r\n  <mat-card *ngIf="innerWidth >= 700 && showLanding && !messagesLoading">\r\n    <mat-card-header>\r\n      <img mat-card-avatar [src]="landingInfo.header.image" />\r\n      <mat-card-title>{{ landingInfo.header.title }}</mat-card-title>\r\n      <mat-card-subtitle>{{ landingInfo.header.subtitle }}</mat-card-subtitle>\r\n    </mat-card-header>\r\n    <mat-card-content *ngFor="let content of landingInfo.content">\r\n      <p>\r\n        {{ content.p }}\r\n      </p>\r\n    </mat-card-content>\r\n    <div class="toggle-container">\r\n      <mat-slide-toggle\r\n        class="notShowAgainToggle"\r\n        (change)="onNotShowAgainToggle($event)"\r\n        >Nicht mehr zeigen</mat-slide-toggle\r\n      >\r\n      <mat-slide-toggle\r\n        class="startTourToggle"\r\n        checked="true"\r\n        (change)="onStartTourToggle($event)"\r\n      >\r\n        Tour starten\r\n      </mat-slide-toggle>\r\n    </div>\r\n    <div class="button-container">\r\n      <button\r\n        class="closeBtn"\r\n        mat-stroked-button\r\n        color="primary"\r\n        (click)="onCloseClick()"\r\n      >\r\n        Schlie\u00DFen\r\n      </button>\r\n    </div>\r\n  </mat-card>\r\n  <mat-grid-list\r\n    id="menu-grid-list"\r\n    [solidSkeletonGridCols]="gridColumns"\r\n    gutterSize="1rem"\r\n    rowHeight="1:1"\r\n  >\r\n    <mat-grid-tile\r\n      *ngFor="let menuItem of menuItems$ | async; let index = index"\r\n      class="mat-elevation-z2"\r\n      [routerLink]="menuItem.route"\r\n      [queryParams]="{ directTo: msgCount > 0 ? \'news\' : undefined }"\r\n      id="menu-tile-{{ index }}"\r\n    >\r\n      <mat-icon\r\n        *ngIf="menuItem.svgIcon && menuItem.route !== \'info\'"\r\n        [svgIcon]="menuItem.svgIcon"\r\n      ></mat-icon>\r\n      <mat-icon *ngIf="!menuItem.svgIcon && menuItem.route !== \'info\'">{{\r\n        menuItem.icon\r\n      }}</mat-icon>\r\n      <mat-icon\r\n        *ngIf="menuItem.svgIcon && menuItem.route === \'info\'"\r\n        [svgIcon]="menuItem.svgIcon"\r\n        [matBadge]="msgCount"\r\n        [matBadgeHidden]="msgCount === 0"\r\n        matBadgeSize="large"\r\n      ></mat-icon>\r\n      <span class="navTitle">{{ menuItem.title }}</span>\r\n    </mat-grid-tile>\r\n    <mat-grid-tile\r\n      id="glossary"\r\n      (click)="onGlossaryClick.emit()"\r\n      class="mat-elevation-z2"\r\n      ><mat-icon matListIcon svgIcon="glossary_custom"></mat-icon>\r\n      <span class="navTitle">Glossar</span>\r\n    </mat-grid-tile>\r\n    <mat-grid-tile\r\n      id="feedback"\r\n      (click)="feedback.showDialog()"\r\n      class="mat-elevation-z2"\r\n      ><mat-icon matListIcon svgIcon="feedback"></mat-icon>\r\n      <span class="navTitle">Kontakt</span>\r\n    </mat-grid-tile>\r\n  </mat-grid-list>\r\n  <div class="footer-container">\r\n    <a routerLink="info">Impressum</a>\r\n    <a routerLink="info" [queryParams]="{ directTo: \'privacy\' }">\r\n      Datenschutz</a\r\n    >\r\n  </div>\r\n</div>\r\n',
    styles: [
      '@charset "UTF-8";:host{display:block}mat-card{margin-bottom:1.5rem}mat-list{padding-top:0!important}mat-grid-list{max-width:100%;margin-left:auto;margin-right:auto;margin-bottom:10vh}mat-grid-tile{border-radius:.25rem;cursor:pointer;transition:background-color .05s linear .05s}mat-grid-tile ::ng-deep div.mat-grid-tile-content{display:inline-flex;flex-direction:column;align-content:center}mat-grid-tile ::ng-deep .mat-badge-content{top:-7px!important;right:0!important;color:#fff;background-color:#e41e3f;width:24px;height:24px;line-height:24px;font-size:18px}mat-grid-tile mat-icon{height:4.5rem;width:4.5rem;font-size:4.5rem}.navTitle{padding-top:.5rem}.landing-container{overflow:auto;height:calc(100vh - 60px);padding:1rem;display:flex;flex-direction:column}.footer-container{margin-bottom:-16px;margin-top:auto;text-align:center}.footer-container a{text-decoration:none}.footer-container a:not(:last-child):after{content:"\\a0|\\a0"}.toggle-container{display:flex;font-size:13px}.toggle-container .notShowAgainToggle{margin-right:13px}.button-container{display:flex;justify-content:center;margin-top:19px}.button-container .closeBtn{width:100%;border-radius:5px;font-size:13px}\n',
    ],
    dependencies: [
      {
        kind: 'directive',
        type: i1$2.NgForOf,
        selector: '[ngFor][ngForOf]',
        inputs: ['ngForOf', 'ngForTrackBy', 'ngForTemplate'],
      },
      {
        kind: 'directive',
        type: i1$2.NgIf,
        selector: '[ngIf]',
        inputs: ['ngIf', 'ngIfThen', 'ngIfElse'],
      },
      {
        kind: 'directive',
        type: i1$5.RouterLink,
        selector: '[routerLink]',
        inputs: [
          'target',
          'queryParams',
          'fragment',
          'queryParamsHandling',
          'state',
          'relativeTo',
          'preserveFragment',
          'skipLocationChange',
          'replaceUrl',
          'routerLink',
        ],
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
        kind: 'component',
        type: i10.MatCard,
        selector: 'mat-card',
        inputs: ['appearance'],
        exportAs: ['matCard'],
      },
      {
        kind: 'directive',
        type: i10.MatCardAvatar,
        selector: '[mat-card-avatar], [matCardAvatar]',
      },
      {
        kind: 'directive',
        type: i10.MatCardContent,
        selector: 'mat-card-content',
      },
      {
        kind: 'component',
        type: i10.MatCardHeader,
        selector: 'mat-card-header',
      },
      {
        kind: 'directive',
        type: i10.MatCardSubtitle,
        selector: 'mat-card-subtitle, [mat-card-subtitle], [matCardSubtitle]',
      },
      {
        kind: 'directive',
        type: i10.MatCardTitle,
        selector: 'mat-card-title, [mat-card-title], [matCardTitle]',
      },
      {
        kind: 'component',
        type: i1$6.MatGridList,
        selector: 'mat-grid-list',
        inputs: ['cols', 'gutterSize', 'rowHeight'],
        exportAs: ['matGridList'],
      },
      {
        kind: 'component',
        type: i1$6.MatGridTile,
        selector: 'mat-grid-tile',
        inputs: ['rowspan', 'colspan'],
        exportAs: ['matGridTile'],
      },
      {
        kind: 'component',
        type: i1$3.MatIcon,
        selector: 'mat-icon',
        inputs: ['color', 'inline', 'svgIcon', 'fontSet', 'fontIcon'],
        exportAs: ['matIcon'],
      },
      {
        kind: 'component',
        type: i6.MatSlideToggle,
        selector: 'mat-slide-toggle',
        inputs: ['disabled', 'disableRipple', 'color', 'tabIndex'],
        exportAs: ['matSlideToggle'],
      },
      {
        kind: 'directive',
        type: i13.MatBadge,
        selector: '[matBadge]',
        inputs: [
          'matBadgeDisabled',
          'matBadgeColor',
          'matBadgeOverlap',
          'matBadgePosition',
          'matBadge',
          'matBadgeDescription',
          'matBadgeSize',
          'matBadgeHidden',
        ],
      },
      {
        kind: 'directive',
        type: GridColsDirective,
        selector: '[solidSkeletonGridCols]',
        inputs: ['solidSkeletonGridCols'],
      },
      { kind: 'pipe', type: i1$2.AsyncPipe, name: 'async' },
    ],
  });
}
__decorate$2(
  [Select(MenuState.getLandingItems), __metadata$2('design:type', Observable)],
  LandingComponent.prototype,
  'menuItems$',
  void 0
);
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: LandingComponent,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'solid-skeleton-landing',
          template:
            '<div class="landing-container" #landing>\r\n  <mat-card *ngIf="innerWidth >= 700 && showLanding && !messagesLoading">\r\n    <mat-card-header>\r\n      <img mat-card-avatar [src]="landingInfo.header.image" />\r\n      <mat-card-title>{{ landingInfo.header.title }}</mat-card-title>\r\n      <mat-card-subtitle>{{ landingInfo.header.subtitle }}</mat-card-subtitle>\r\n    </mat-card-header>\r\n    <mat-card-content *ngFor="let content of landingInfo.content">\r\n      <p>\r\n        {{ content.p }}\r\n      </p>\r\n    </mat-card-content>\r\n    <div class="toggle-container">\r\n      <mat-slide-toggle\r\n        class="notShowAgainToggle"\r\n        (change)="onNotShowAgainToggle($event)"\r\n        >Nicht mehr zeigen</mat-slide-toggle\r\n      >\r\n      <mat-slide-toggle\r\n        class="startTourToggle"\r\n        checked="true"\r\n        (change)="onStartTourToggle($event)"\r\n      >\r\n        Tour starten\r\n      </mat-slide-toggle>\r\n    </div>\r\n    <div class="button-container">\r\n      <button\r\n        class="closeBtn"\r\n        mat-stroked-button\r\n        color="primary"\r\n        (click)="onCloseClick()"\r\n      >\r\n        Schlie\u00DFen\r\n      </button>\r\n    </div>\r\n  </mat-card>\r\n  <mat-grid-list\r\n    id="menu-grid-list"\r\n    [solidSkeletonGridCols]="gridColumns"\r\n    gutterSize="1rem"\r\n    rowHeight="1:1"\r\n  >\r\n    <mat-grid-tile\r\n      *ngFor="let menuItem of menuItems$ | async; let index = index"\r\n      class="mat-elevation-z2"\r\n      [routerLink]="menuItem.route"\r\n      [queryParams]="{ directTo: msgCount > 0 ? \'news\' : undefined }"\r\n      id="menu-tile-{{ index }}"\r\n    >\r\n      <mat-icon\r\n        *ngIf="menuItem.svgIcon && menuItem.route !== \'info\'"\r\n        [svgIcon]="menuItem.svgIcon"\r\n      ></mat-icon>\r\n      <mat-icon *ngIf="!menuItem.svgIcon && menuItem.route !== \'info\'">{{\r\n        menuItem.icon\r\n      }}</mat-icon>\r\n      <mat-icon\r\n        *ngIf="menuItem.svgIcon && menuItem.route === \'info\'"\r\n        [svgIcon]="menuItem.svgIcon"\r\n        [matBadge]="msgCount"\r\n        [matBadgeHidden]="msgCount === 0"\r\n        matBadgeSize="large"\r\n      ></mat-icon>\r\n      <span class="navTitle">{{ menuItem.title }}</span>\r\n    </mat-grid-tile>\r\n    <mat-grid-tile\r\n      id="glossary"\r\n      (click)="onGlossaryClick.emit()"\r\n      class="mat-elevation-z2"\r\n      ><mat-icon matListIcon svgIcon="glossary_custom"></mat-icon>\r\n      <span class="navTitle">Glossar</span>\r\n    </mat-grid-tile>\r\n    <mat-grid-tile\r\n      id="feedback"\r\n      (click)="feedback.showDialog()"\r\n      class="mat-elevation-z2"\r\n      ><mat-icon matListIcon svgIcon="feedback"></mat-icon>\r\n      <span class="navTitle">Kontakt</span>\r\n    </mat-grid-tile>\r\n  </mat-grid-list>\r\n  <div class="footer-container">\r\n    <a routerLink="info">Impressum</a>\r\n    <a routerLink="info" [queryParams]="{ directTo: \'privacy\' }">\r\n      Datenschutz</a\r\n    >\r\n  </div>\r\n</div>\r\n',
          styles: [
            '@charset "UTF-8";:host{display:block}mat-card{margin-bottom:1.5rem}mat-list{padding-top:0!important}mat-grid-list{max-width:100%;margin-left:auto;margin-right:auto;margin-bottom:10vh}mat-grid-tile{border-radius:.25rem;cursor:pointer;transition:background-color .05s linear .05s}mat-grid-tile ::ng-deep div.mat-grid-tile-content{display:inline-flex;flex-direction:column;align-content:center}mat-grid-tile ::ng-deep .mat-badge-content{top:-7px!important;right:0!important;color:#fff;background-color:#e41e3f;width:24px;height:24px;line-height:24px;font-size:18px}mat-grid-tile mat-icon{height:4.5rem;width:4.5rem;font-size:4.5rem}.navTitle{padding-top:.5rem}.landing-container{overflow:auto;height:calc(100vh - 60px);padding:1rem;display:flex;flex-direction:column}.footer-container{margin-bottom:-16px;margin-top:auto;text-align:center}.footer-container a{text-decoration:none}.footer-container a:not(:last-child):after{content:"\\a0|\\a0"}.toggle-container{display:flex;font-size:13px}.toggle-container .notShowAgainToggle{margin-right:13px}.button-container{display:flex;justify-content:center;margin-top:19px}.button-container .closeBtn{width:100%;border-radius:5px;font-size:13px}\n',
          ],
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [
      {
        type: FeedbackService,
        decorators: [
          {
            type: Inject,
            args: [SOLID_SKELETON_FEEDBACK_SERVICE],
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
      { type: i1$3.MatIconRegistry },
      { type: i2$2.DomSanitizer },
      { type: IntroService },
      { type: i1.MatDialog },
      { type: MenuState },
      { type: MessagesService },
    ];
  },
  propDecorators: {
    menuItems$: [],
    Landing: [
      {
        type: ViewChild,
        args: ['landing'],
      },
    ],
    onResize: [
      {
        type: HostListener,
        args: ['window:resize', ['$event']],
      },
    ],
  },
});

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
class MainMenuComponent {
  feedback;
  selectMenuEntry = new EventEmitter();
  MenuItems;
  openGlossaryClick = new EventEmitter();
  messages;
  msgNumber;
  constructor(feedback) {
    this.feedback = feedback;
    this.messages = localStorage.getItem('solid_skeleton_messages');
    this.msgNumber = 0;
  }
  ngOnInit() {
    const msgObj = JSON.parse(this.messages);
    msgObj?.forEach((msg) => {
      if (msg.unread && msg.type != 'CL') this.msgNumber++;
    });
  }
  onMenuItemSelected(item) {
    if (item === 'info') this.msgNumber = 0;
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: MainMenuComponent,
    deps: [{ token: SOLID_SKELETON_FEEDBACK_SERVICE }],
    target: i0.ɵɵFactoryTarget.Component,
  });
  static ɵcmp = i0.ɵɵngDeclareComponent({
    minVersion: '14.0.0',
    version: '16.2.9',
    type: MainMenuComponent,
    selector: 'solid-skeleton-main-menu',
    outputs: {
      selectMenuEntry: 'selectMenuEntry',
      openGlossaryClick: 'openGlossaryClick',
    },
    ngImport: i0,
    template:
      '<!-- Without Dropdown Version -->\r\n<div class="main-menu-container">\r\n  <mat-nav-list id="menu">\r\n    <ng-container *ngFor="let item of MenuItems | async; let index = index">\r\n      <mat-list-item\r\n        *ngIf="item.route === \'info\'"\r\n        (click)="openGlossaryClick.emit()"\r\n      >\r\n        <h3 matLine>Glossar</h3>\r\n      </mat-list-item>\r\n      <mat-list-item\r\n        (click)="selectMenuEntry.emit(); onMenuItemSelected(item.route)"\r\n        [class.active]="item.active"\r\n        [routerLink]="item.route"\r\n        [queryParams]="{ directTo: msgNumber > 0 ? \'news\' : undefined }"\r\n      >\r\n        <h3 matLine>\r\n          {{ item.title }}\r\n        </h3>\r\n      </mat-list-item>\r\n    </ng-container>\r\n    <mat-list-item (click)="feedback.showDialog()" *ngIf="feedback">\r\n      <h3 matLine>Kontakt</h3>\r\n    </mat-list-item>\r\n  </mat-nav-list>\r\n</div>\r\n<!-- Slideshow Dropdown Version -->\r\n<!-- <div class="main-menu-container">\r\n  <mat-accordion>\r\n    <ng-container *ngFor="let menuItem of MenuItems | async">\r\n      <mat-expansion-panel\r\n        (click)="navigateTo(menuItem.route)"\r\n        *ngIf="menuItem.name !== \'slideshow\'"\r\n        [class.active]="menuItem.active"\r\n        hideToggle\r\n      >\r\n        <mat-expansion-panel-header>\r\n          <mat-panel-title\r\n            ><h3 matLine>{{ menuItem.title }}</h3></mat-panel-title\r\n          >\r\n        </mat-expansion-panel-header>\r\n      </mat-expansion-panel>\r\n      <mat-expansion-panel *ngIf="menuItem.name === \'slideshow\'" hideToggle>\r\n        <mat-expansion-panel-header [class.active]="menuItem.active">\r\n          <mat-panel-title\r\n            ><h3 matLine>{{ menuItem.title }}</h3></mat-panel-title\r\n          >\r\n        </mat-expansion-panel-header>\r\n        <mat-nav-list *ngIf="CategoriesItems | async as categories">\r\n          <mat-list-item\r\n            (click)="navigateTo(menuItem.route + \'/\' + category.slug)"\r\n            *ngFor="let category of categories"\r\n          >\r\n            <span matLine>{{ category.name }}</span>\r\n          </mat-list-item>\r\n        </mat-nav-list>\r\n      </mat-expansion-panel>\r\n    </ng-container>\r\n    <mat-expansion-panel\r\n      (click)="feedback.showDialog()"\r\n      *ngIf="feedback"\r\n      hideToggle\r\n    >\r\n      <mat-expansion-panel-header>\r\n        <mat-panel-title><h3 matLine>Kontakt</h3></mat-panel-title>\r\n      </mat-expansion-panel-header>\r\n    </mat-expansion-panel>\r\n  </mat-accordion>\r\n</div> -->\r\n',
    styles: [
      'mat-accordion{padding:0;display:inline-block;width:300px;overflow-y:auto;overflow-x:hidden}mat-accordion ::ng-deep .mat-line{margin-bottom:0!important}mat-accordion ::ng-deep .mat-expansion-panel-header{padding:0 16px!important;height:48px!important}mat-accordion ::ng-deep .mat-expansion-panel:not([class*=mat-elevation-z]){box-shadow:none!important}mat-accordion ::ng-deep .mat-accordion .mat-expansion-panel:last-of-type{border-bottom-right-radius:0!important;border-bottom-left-radius:0!important}mat-accordion ::ng-deep .mat-accordion .mat-expansion-panel:first-of-type{border-top-right-radius:0!important;border-top-left-radius:0!important}mat-accordion ::ng-deep .mat-expansion-panel-spacing{margin:0!important}mat-accordion ::ng-deep .mat-expansion-panel{border-radius:0!important}mat-accordion ::ng-deep .mat-expansion-panel-body{padding:0!important}mat-nav-list{padding:0;display:inline-block;width:300px;overflow-y:auto;overflow-x:hidden}mat-nav-list mat-list-item{height:56px!important}.main-menu-container{height:100%;width:300px;overflow-y:auto}\n',
    ],
    dependencies: [
      {
        kind: 'directive',
        type: i1$2.NgForOf,
        selector: '[ngFor][ngForOf]',
        inputs: ['ngForOf', 'ngForTrackBy', 'ngForTemplate'],
      },
      {
        kind: 'directive',
        type: i1$2.NgIf,
        selector: '[ngIf]',
        inputs: ['ngIf', 'ngIfThen', 'ngIfElse'],
      },
      {
        kind: 'directive',
        type: i1$5.RouterLink,
        selector: '[routerLink]',
        inputs: [
          'target',
          'queryParams',
          'fragment',
          'queryParamsHandling',
          'state',
          'relativeTo',
          'preserveFragment',
          'skipLocationChange',
          'replaceUrl',
          'routerLink',
        ],
      },
      {
        kind: 'directive',
        type: i3$2.MatLine,
        selector: '[mat-line], [matLine]',
      },
      {
        kind: 'component',
        type: i4$1.MatNavList,
        selector: 'mat-nav-list',
        exportAs: ['matNavList'],
      },
      {
        kind: 'component',
        type: i4$1.MatListItem,
        selector: 'mat-list-item, a[mat-list-item], button[mat-list-item]',
        inputs: ['activated'],
        exportAs: ['matListItem'],
      },
      { kind: 'pipe', type: i1$2.AsyncPipe, name: 'async' },
    ],
  });
}
__decorate$1(
  [Select(MenuState.getMenuItems), __metadata$1('design:type', Observable)],
  MainMenuComponent.prototype,
  'MenuItems',
  void 0
);
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: MainMenuComponent,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'solid-skeleton-main-menu',
          template:
            '<!-- Without Dropdown Version -->\r\n<div class="main-menu-container">\r\n  <mat-nav-list id="menu">\r\n    <ng-container *ngFor="let item of MenuItems | async; let index = index">\r\n      <mat-list-item\r\n        *ngIf="item.route === \'info\'"\r\n        (click)="openGlossaryClick.emit()"\r\n      >\r\n        <h3 matLine>Glossar</h3>\r\n      </mat-list-item>\r\n      <mat-list-item\r\n        (click)="selectMenuEntry.emit(); onMenuItemSelected(item.route)"\r\n        [class.active]="item.active"\r\n        [routerLink]="item.route"\r\n        [queryParams]="{ directTo: msgNumber > 0 ? \'news\' : undefined }"\r\n      >\r\n        <h3 matLine>\r\n          {{ item.title }}\r\n        </h3>\r\n      </mat-list-item>\r\n    </ng-container>\r\n    <mat-list-item (click)="feedback.showDialog()" *ngIf="feedback">\r\n      <h3 matLine>Kontakt</h3>\r\n    </mat-list-item>\r\n  </mat-nav-list>\r\n</div>\r\n<!-- Slideshow Dropdown Version -->\r\n<!-- <div class="main-menu-container">\r\n  <mat-accordion>\r\n    <ng-container *ngFor="let menuItem of MenuItems | async">\r\n      <mat-expansion-panel\r\n        (click)="navigateTo(menuItem.route)"\r\n        *ngIf="menuItem.name !== \'slideshow\'"\r\n        [class.active]="menuItem.active"\r\n        hideToggle\r\n      >\r\n        <mat-expansion-panel-header>\r\n          <mat-panel-title\r\n            ><h3 matLine>{{ menuItem.title }}</h3></mat-panel-title\r\n          >\r\n        </mat-expansion-panel-header>\r\n      </mat-expansion-panel>\r\n      <mat-expansion-panel *ngIf="menuItem.name === \'slideshow\'" hideToggle>\r\n        <mat-expansion-panel-header [class.active]="menuItem.active">\r\n          <mat-panel-title\r\n            ><h3 matLine>{{ menuItem.title }}</h3></mat-panel-title\r\n          >\r\n        </mat-expansion-panel-header>\r\n        <mat-nav-list *ngIf="CategoriesItems | async as categories">\r\n          <mat-list-item\r\n            (click)="navigateTo(menuItem.route + \'/\' + category.slug)"\r\n            *ngFor="let category of categories"\r\n          >\r\n            <span matLine>{{ category.name }}</span>\r\n          </mat-list-item>\r\n        </mat-nav-list>\r\n      </mat-expansion-panel>\r\n    </ng-container>\r\n    <mat-expansion-panel\r\n      (click)="feedback.showDialog()"\r\n      *ngIf="feedback"\r\n      hideToggle\r\n    >\r\n      <mat-expansion-panel-header>\r\n        <mat-panel-title><h3 matLine>Kontakt</h3></mat-panel-title>\r\n      </mat-expansion-panel-header>\r\n    </mat-expansion-panel>\r\n  </mat-accordion>\r\n</div> -->\r\n',
          styles: [
            'mat-accordion{padding:0;display:inline-block;width:300px;overflow-y:auto;overflow-x:hidden}mat-accordion ::ng-deep .mat-line{margin-bottom:0!important}mat-accordion ::ng-deep .mat-expansion-panel-header{padding:0 16px!important;height:48px!important}mat-accordion ::ng-deep .mat-expansion-panel:not([class*=mat-elevation-z]){box-shadow:none!important}mat-accordion ::ng-deep .mat-accordion .mat-expansion-panel:last-of-type{border-bottom-right-radius:0!important;border-bottom-left-radius:0!important}mat-accordion ::ng-deep .mat-accordion .mat-expansion-panel:first-of-type{border-top-right-radius:0!important;border-top-left-radius:0!important}mat-accordion ::ng-deep .mat-expansion-panel-spacing{margin:0!important}mat-accordion ::ng-deep .mat-expansion-panel{border-radius:0!important}mat-accordion ::ng-deep .mat-expansion-panel-body{padding:0!important}mat-nav-list{padding:0;display:inline-block;width:300px;overflow-y:auto;overflow-x:hidden}mat-nav-list mat-list-item{height:56px!important}.main-menu-container{height:100%;width:300px;overflow-y:auto}\n',
          ],
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [
      {
        type: FeedbackService,
        decorators: [
          {
            type: Inject,
            args: [SOLID_SKELETON_FEEDBACK_SERVICE],
          },
        ],
      },
    ];
  },
  propDecorators: {
    selectMenuEntry: [
      {
        type: Output,
      },
    ],
    MenuItems: [],
    openGlossaryClick: [
      {
        type: Output,
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
class BaseLayoutComponent {
  feedback;
  config;
  _breakpointObserver;
  _router;
  FixedLayout = false;
  subscription;
  title = '';
  MainMenu;
  Glossary;
  // noinspection JSUnusedLocalSymbols.
  constructor(feedback, config, update, _breakpointObserver, _router) {
    this.feedback = feedback;
    this.config = config;
    this._breakpointObserver = _breakpointObserver;
    this._router = _router;
  }
  ngOnInit() {
    this._breakpointObserver
      .observe(['(min-width: 1000px)'])
      .subscribe((isFixed) => {
        const newFixedLayout = isFixed.matches;
        if (newFixedLayout) {
          if (this.MainMenu) {
            this.MainMenu.open();
          }
          if (this.Glossary) {
            this.Glossary.close();
          }
        } else {
          if (this.MainMenu) {
            this.MainMenu.close();
          }
          if (this.Glossary) {
            this.Glossary.close();
          }
        }
        this.FixedLayout = newFixedLayout;
      });
  }
  async onMenuSelectionChanged() {
    if (!this.FixedLayout && this.MainMenu) {
      await this.MainMenu.close();
    }
    if (!this.FixedLayout && this.Glossary) {
      await this.Glossary.close();
    }
  }
  onMenuGlossaryClick() {
    if (this.Glossary) {
      this.Glossary.open();
    }
    if (!this.FixedLayout && this.MainMenu) {
      this.MainMenu.close();
    }
  }
  closeMenu() {
    if (this.MainMenu && !this.FixedLayout) this.MainMenu.close();
  }
  reportError() {
    const location = this.Glossary?.opened ? 'glossary' : this._router.url;
    this.feedback.showDialog(location, this.title);
    this.title = '';
  }
  onLandingGlossaryClick(ref) {
    if (!(ref instanceof LandingComponent)) {
      return;
    }
    ref.onGlossaryClick.subscribe(() => {
      if (this.Glossary) {
        this.Glossary.open();
      }
    });
  }
  unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  async navigateTo(url) {
    return new Navigate([url]);
  }
  profileTitle(ref) {
    if (!(ref instanceof BaseComponent)) {
      return;
    }
    ref.profileTitle.subscribe((profileTitle) => {
      this.title = profileTitle;
    });
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: BaseLayoutComponent,
    deps: [
      { token: SOLID_SKELETON_FEEDBACK_SERVICE },
      { token: SOLID_CORE_CONFIG },
      { token: UpdateService },
      { token: i2$1.BreakpointObserver },
      { token: i1$5.Router },
    ],
    target: i0.ɵɵFactoryTarget.Component,
  });
  static ɵcmp = i0.ɵɵngDeclareComponent({
    minVersion: '14.0.0',
    version: '16.2.9',
    type: BaseLayoutComponent,
    selector: 'solid-skeleton-base-layout',
    viewQueries: [
      {
        propertyName: 'MainMenu',
        first: true,
        predicate: ['mainmenu'],
        descendants: true,
        static: true,
      },
      {
        propertyName: 'Glossary',
        first: true,
        predicate: ['glossary'],
        descendants: true,
        static: true,
      },
    ],
    ngImport: i0,
    template:
      '<div class="base-layout-container mat-typography">\r\n  <mat-toolbar color="primary" class="base-layout-main-toolbar">\r\n    <ng-container *ngIf="FixedLayout">\r\n      <div class="right-border">\r\n        <span>Men\u00FC</span>\r\n      </div>\r\n      <img\r\n        id="Logo"\r\n        [src]="config.appLogo"\r\n        onerror=\'this.style.display = "none"\'\r\n        (click)="navigateTo(\'/\')"\r\n      />\r\n      <span id="app-name" class="appName" (click)="navigateTo(\'/\')">{{\r\n        config.appName\r\n      }}</span>\r\n      <div class="spacer"></div>\r\n      <div class="reportButton" *ngIf="this.config.error_report">\r\n        <button\r\n          id="reportButton"\r\n          class="button"\r\n          (click)="reportError()"\r\n          mat-icon-button\r\n        >\r\n          <mat-icon\r\n            aria-label="Fehler melden"\r\n            svgIcon="feedback_outline"\r\n          ></mat-icon>\r\n        </button>\r\n        <div class="bottom"></div>\r\n      </div>\r\n      <div id="glossary">\r\n        <button (click)="Glossary?.toggle()" mat-icon-button>\r\n          <mat-icon\r\n            aria-label="Glossar \u00F6ffnen"\r\n            svgIcon="glossary_generic"\r\n          ></mat-icon>\r\n        </button>\r\n      </div>\r\n    </ng-container>\r\n    <ng-container *ngIf="!FixedLayout">\r\n      <div class="mainmenu-button">\r\n        <button\r\n          id="menu"\r\n          (click)="MainMenu?.toggle(); Glossary?.close()"\r\n          mat-icon-button\r\n        >\r\n          <mat-icon aria-label="Men\u00FC \u00F6ffnen">menu</mat-icon>\r\n        </button>\r\n      </div>\r\n      <img\r\n        id="Logo"\r\n        [src]="config.appLogo"\r\n        onerror=\'this.style.display = "none"\'\r\n        (click)="navigateTo(\'/\')"\r\n      />\r\n      <span\r\n        id="app-name"\r\n        [class.app-title-fixed]="FixedLayout"\r\n        class="appName"\r\n        (click)="navigateTo(\'/\')"\r\n        >{{ config.appName }}</span\r\n      >\r\n      <div class="spacer"></div>\r\n      <div class="reportButton" *ngIf="this.config.error_report">\r\n        <button\r\n          id="reportButton"\r\n          class="button"\r\n          (click)="reportError()"\r\n          mat-icon-button\r\n        >\r\n          <mat-icon\r\n            aria-label="Fehler melden"\r\n            svgIcon="feedback_outline"\r\n          ></mat-icon>\r\n        </button>\r\n        <div class="bottom"></div>\r\n      </div>\r\n      <button\r\n        id="glossary"\r\n        (click)="Glossary?.toggle(); MainMenu?.close()"\r\n        mat-icon-button\r\n      >\r\n        <mat-icon\r\n          aria-label="Glossar \u00F6ffnen"\r\n          svgIcon="glossary_generic"\r\n        ></mat-icon>\r\n      </button>\r\n    </ng-container>\r\n  </mat-toolbar>\r\n  <mat-sidenav-container (backdropClick)="closeMenu()">\r\n    <mat-sidenav\r\n      #mainmenu\r\n      [fixedInViewport]="!FixedLayout"\r\n      [mode]="FixedLayout ? \'side\' : \'over\'"\r\n      class="mainmenu-sidenav"\r\n      position="start"\r\n      disableClose\r\n    >\r\n      <mat-toolbar\r\n        (click)="MainMenu?.toggle()"\r\n        *ngIf="!FixedLayout"\r\n        color="primary"\r\n      >\r\n        Men\u00FC\r\n      </mat-toolbar>\r\n      <solid-skeleton-main-menu\r\n        (selectMenuEntry)="onMenuSelectionChanged()"\r\n        (openGlossaryClick)="onMenuGlossaryClick()"\r\n      ></solid-skeleton-main-menu>\r\n    </mat-sidenav>\r\n    <mat-sidenav-content>\r\n      <router-outlet\r\n        (activate)="onLandingGlossaryClick($event); profileTitle($event)"\r\n        (deactivate)="unsubscribe()"\r\n      >\r\n      </router-outlet>\r\n    </mat-sidenav-content>\r\n    <mat-sidenav\r\n      #glossary\r\n      [fixedInViewport]="true"\r\n      [mode]="\'over\'"\r\n      class="glossary-sidenav"\r\n      position="end"\r\n    >\r\n      <mat-toolbar\r\n        (click)="Glossary?.toggle()"\r\n        class="glossary-toolbar"\r\n        color="primary"\r\n      >\r\n        Glossar\r\n      </mat-toolbar>\r\n      <solid-glossary></solid-glossary>\r\n    </mat-sidenav>\r\n  </mat-sidenav-container>\r\n</div>\r\n',
    styles: [
      '.base-layout-container{position:absolute;inset:0}.base-layout-container mat-sidenav-content{height:100%;max-height:100%}.base-layout-container mat-sidenav-container{position:absolute;inset:60px 0 0}.base-layout-container mat-toolbar{height:60px;position:relative;z-index:999}.base-layout-container mat-toolbar span.appName{padding-left:16px}@media (max-width: 365px){.base-layout-container mat-toolbar span.appName{padding-left:9px;padding-right:5px}}.base-layout-container mat-toolbar .app-title-fixed{margin-left:300px}.base-layout-container mat-toolbar .right-border{width:284px;height:100%;display:inline-flex;align-items:center}.base-layout-container mat-toolbar .left-border{width:284px;height:56px;text-align:right;display:inline-flex;align-items:center}.base-layout-container .glossary-sidenav,.base-layout-container .mainmenu-sidenav{width:300px;height:100%}.base-layout-container ::ng-deep .mat-drawer-inner-container{overflow:hidden}.base-layout-container .reportButton{height:100%;display:flex;flex-direction:column;justify-content:flex-end;margin-top:8px;margin-right:.3em}.base-layout-container .reportButton .button{background-color:#fff;border-radius:10px 10px 0 0}.base-layout-container .reportButton .button ::ng-deep .mat-icon{height:40px;width:40px;color:#000000b3}.base-layout-container .reportButton .bottom{background-color:#fff;height:10px}@media (max-width: 365px){.base-layout-container .reportButton{margin-right:0}}img#Logo{margin-left:1em;height:24px;cursor:pointer}span.appName{cursor:pointer}@media (max-width: 365px){img#Logo{margin-left:3px;height:20px}}\n',
    ],
    dependencies: [
      {
        kind: 'directive',
        type: i1$2.NgIf,
        selector: '[ngIf]',
        inputs: ['ngIf', 'ngIfThen', 'ngIfElse'],
      },
      {
        kind: 'component',
        type: i5$1.GlossaryComponent,
        selector: 'solid-glossary',
      },
      {
        kind: 'directive',
        type: i1$5.RouterOutlet,
        selector: 'router-outlet',
        inputs: ['name'],
        outputs: ['activate', 'deactivate', 'attach', 'detach'],
        exportAs: ['outlet'],
      },
      {
        kind: 'component',
        type: i4.MatIconButton,
        selector: 'button[mat-icon-button]',
        inputs: ['disabled', 'disableRipple', 'color'],
        exportAs: ['matButton'],
      },
      {
        kind: 'component',
        type: i1$3.MatIcon,
        selector: 'mat-icon',
        inputs: ['color', 'inline', 'svgIcon', 'fontSet', 'fontIcon'],
        exportAs: ['matIcon'],
      },
      {
        kind: 'component',
        type: i8$1.MatSidenav,
        selector: 'mat-sidenav',
        inputs: ['fixedInViewport', 'fixedTopGap', 'fixedBottomGap'],
        exportAs: ['matSidenav'],
      },
      {
        kind: 'component',
        type: i8$1.MatSidenavContainer,
        selector: 'mat-sidenav-container',
        exportAs: ['matSidenavContainer'],
      },
      {
        kind: 'component',
        type: i8$1.MatSidenavContent,
        selector: 'mat-sidenav-content',
      },
      {
        kind: 'component',
        type: i9$1.MatToolbar,
        selector: 'mat-toolbar',
        inputs: ['color'],
        exportAs: ['matToolbar'],
      },
      {
        kind: 'component',
        type: MainMenuComponent,
        selector: 'solid-skeleton-main-menu',
        outputs: ['selectMenuEntry', 'openGlossaryClick'],
      },
    ],
  });
}
__decorate(
  [
    Dispatch(),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String]),
    __metadata('design:returntype', Promise),
  ],
  BaseLayoutComponent.prototype,
  'navigateTo',
  null
);
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: BaseLayoutComponent,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'solid-skeleton-base-layout',
          template:
            '<div class="base-layout-container mat-typography">\r\n  <mat-toolbar color="primary" class="base-layout-main-toolbar">\r\n    <ng-container *ngIf="FixedLayout">\r\n      <div class="right-border">\r\n        <span>Men\u00FC</span>\r\n      </div>\r\n      <img\r\n        id="Logo"\r\n        [src]="config.appLogo"\r\n        onerror=\'this.style.display = "none"\'\r\n        (click)="navigateTo(\'/\')"\r\n      />\r\n      <span id="app-name" class="appName" (click)="navigateTo(\'/\')">{{\r\n        config.appName\r\n      }}</span>\r\n      <div class="spacer"></div>\r\n      <div class="reportButton" *ngIf="this.config.error_report">\r\n        <button\r\n          id="reportButton"\r\n          class="button"\r\n          (click)="reportError()"\r\n          mat-icon-button\r\n        >\r\n          <mat-icon\r\n            aria-label="Fehler melden"\r\n            svgIcon="feedback_outline"\r\n          ></mat-icon>\r\n        </button>\r\n        <div class="bottom"></div>\r\n      </div>\r\n      <div id="glossary">\r\n        <button (click)="Glossary?.toggle()" mat-icon-button>\r\n          <mat-icon\r\n            aria-label="Glossar \u00F6ffnen"\r\n            svgIcon="glossary_generic"\r\n          ></mat-icon>\r\n        </button>\r\n      </div>\r\n    </ng-container>\r\n    <ng-container *ngIf="!FixedLayout">\r\n      <div class="mainmenu-button">\r\n        <button\r\n          id="menu"\r\n          (click)="MainMenu?.toggle(); Glossary?.close()"\r\n          mat-icon-button\r\n        >\r\n          <mat-icon aria-label="Men\u00FC \u00F6ffnen">menu</mat-icon>\r\n        </button>\r\n      </div>\r\n      <img\r\n        id="Logo"\r\n        [src]="config.appLogo"\r\n        onerror=\'this.style.display = "none"\'\r\n        (click)="navigateTo(\'/\')"\r\n      />\r\n      <span\r\n        id="app-name"\r\n        [class.app-title-fixed]="FixedLayout"\r\n        class="appName"\r\n        (click)="navigateTo(\'/\')"\r\n        >{{ config.appName }}</span\r\n      >\r\n      <div class="spacer"></div>\r\n      <div class="reportButton" *ngIf="this.config.error_report">\r\n        <button\r\n          id="reportButton"\r\n          class="button"\r\n          (click)="reportError()"\r\n          mat-icon-button\r\n        >\r\n          <mat-icon\r\n            aria-label="Fehler melden"\r\n            svgIcon="feedback_outline"\r\n          ></mat-icon>\r\n        </button>\r\n        <div class="bottom"></div>\r\n      </div>\r\n      <button\r\n        id="glossary"\r\n        (click)="Glossary?.toggle(); MainMenu?.close()"\r\n        mat-icon-button\r\n      >\r\n        <mat-icon\r\n          aria-label="Glossar \u00F6ffnen"\r\n          svgIcon="glossary_generic"\r\n        ></mat-icon>\r\n      </button>\r\n    </ng-container>\r\n  </mat-toolbar>\r\n  <mat-sidenav-container (backdropClick)="closeMenu()">\r\n    <mat-sidenav\r\n      #mainmenu\r\n      [fixedInViewport]="!FixedLayout"\r\n      [mode]="FixedLayout ? \'side\' : \'over\'"\r\n      class="mainmenu-sidenav"\r\n      position="start"\r\n      disableClose\r\n    >\r\n      <mat-toolbar\r\n        (click)="MainMenu?.toggle()"\r\n        *ngIf="!FixedLayout"\r\n        color="primary"\r\n      >\r\n        Men\u00FC\r\n      </mat-toolbar>\r\n      <solid-skeleton-main-menu\r\n        (selectMenuEntry)="onMenuSelectionChanged()"\r\n        (openGlossaryClick)="onMenuGlossaryClick()"\r\n      ></solid-skeleton-main-menu>\r\n    </mat-sidenav>\r\n    <mat-sidenav-content>\r\n      <router-outlet\r\n        (activate)="onLandingGlossaryClick($event); profileTitle($event)"\r\n        (deactivate)="unsubscribe()"\r\n      >\r\n      </router-outlet>\r\n    </mat-sidenav-content>\r\n    <mat-sidenav\r\n      #glossary\r\n      [fixedInViewport]="true"\r\n      [mode]="\'over\'"\r\n      class="glossary-sidenav"\r\n      position="end"\r\n    >\r\n      <mat-toolbar\r\n        (click)="Glossary?.toggle()"\r\n        class="glossary-toolbar"\r\n        color="primary"\r\n      >\r\n        Glossar\r\n      </mat-toolbar>\r\n      <solid-glossary></solid-glossary>\r\n    </mat-sidenav>\r\n  </mat-sidenav-container>\r\n</div>\r\n',
          styles: [
            '.base-layout-container{position:absolute;inset:0}.base-layout-container mat-sidenav-content{height:100%;max-height:100%}.base-layout-container mat-sidenav-container{position:absolute;inset:60px 0 0}.base-layout-container mat-toolbar{height:60px;position:relative;z-index:999}.base-layout-container mat-toolbar span.appName{padding-left:16px}@media (max-width: 365px){.base-layout-container mat-toolbar span.appName{padding-left:9px;padding-right:5px}}.base-layout-container mat-toolbar .app-title-fixed{margin-left:300px}.base-layout-container mat-toolbar .right-border{width:284px;height:100%;display:inline-flex;align-items:center}.base-layout-container mat-toolbar .left-border{width:284px;height:56px;text-align:right;display:inline-flex;align-items:center}.base-layout-container .glossary-sidenav,.base-layout-container .mainmenu-sidenav{width:300px;height:100%}.base-layout-container ::ng-deep .mat-drawer-inner-container{overflow:hidden}.base-layout-container .reportButton{height:100%;display:flex;flex-direction:column;justify-content:flex-end;margin-top:8px;margin-right:.3em}.base-layout-container .reportButton .button{background-color:#fff;border-radius:10px 10px 0 0}.base-layout-container .reportButton .button ::ng-deep .mat-icon{height:40px;width:40px;color:#000000b3}.base-layout-container .reportButton .bottom{background-color:#fff;height:10px}@media (max-width: 365px){.base-layout-container .reportButton{margin-right:0}}img#Logo{margin-left:1em;height:24px;cursor:pointer}span.appName{cursor:pointer}@media (max-width: 365px){img#Logo{margin-left:3px;height:20px}}\n',
          ],
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [
      {
        type: FeedbackService,
        decorators: [
          {
            type: Inject,
            args: [SOLID_SKELETON_FEEDBACK_SERVICE],
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
      { type: UpdateService },
      { type: i2$1.BreakpointObserver },
      { type: i1$5.Router },
    ];
  },
  propDecorators: {
    MainMenu: [
      {
        type: ViewChild,
        args: ['mainmenu', { static: true }],
      },
    ],
    Glossary: [
      {
        type: ViewChild,
        args: ['glossary', { static: true }],
      },
    ],
    navigateTo: [],
  },
});

class MessageListComponent {
  messages;
  tabIndex;
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: MessageListComponent,
    deps: [],
    target: i0.ɵɵFactoryTarget.Component,
  });
  static ɵcmp = i0.ɵɵngDeclareComponent({
    minVersion: '14.0.0',
    version: '16.2.9',
    type: MessageListComponent,
    selector: 'solid-skeleton-message-list',
    inputs: { messages: 'messages', tabIndex: 'tabIndex' },
    ngImport: i0,
    template:
      '<mat-list>\r\n  <mat-list-item *ngFor="let msg of messages">\r\n    <h3 matLine [ngStyle]="{ fontWeight: msg.unread ? \'500\' : \'normal\' }">\r\n      {{ msg.title\r\n      }}<span *ngIf="msg.valid_from"\r\n        >&nbsp;|&nbsp;{{ msg.valid_from | date: \'dd.MM.yyyy\' }}</span\r\n      >\r\n      <span *ngIf="msg.valid_to"\r\n        >&nbsp;- {{ msg.valid_to | date: \'dd.MM.yyyy\' }}</span\r\n      >\r\n    </h3>\r\n    <div class="content-container">\r\n      <img\r\n        *ngIf="msg.img"\r\n        [src]="msg.img.img.thumbnail"\r\n        [alt]="msg.img.img_alt"\r\n      />\r\n      <div\r\n        class="text"\r\n        *ngIf="msg.text !== \'\'"\r\n        [data]="msg.text"\r\n        markdown\r\n        matLine\r\n      ></div>\r\n    </div>\r\n  </mat-list-item>\r\n</mat-list>\r\n',
    styles: [
      'mat-list{padding:.8rem 1rem 1rem}mat-list-item{margin-top:0}mat-list-item ::ng-deep p{margin-block-end:0}mat-list-item ::ng-deep h3.mat-line{padding-bottom:.5em}mat-list-item ::ng-deep .mat-list-item-content{padding:0!important;flex-direction:column!important;align-items:baseline!important}mat-list-item ::ng-deep .mat-line.md-rendered{padding-left:.22rem!important;white-space:normal!important}mat-list-item img{float:left;margin:5px 10px 1px 5px}mat-list-item .content-container{width:100%}mat-list-item .text{overflow:inherit;font-size:14px!important}mat-list-item:not(:first-child) h3{padding-top:.5em}mat-list-item:not(:last-child){padding-bottom:.8em!important}\n',
    ],
    dependencies: [
      {
        kind: 'directive',
        type: i1$2.NgForOf,
        selector: '[ngFor][ngForOf]',
        inputs: ['ngForOf', 'ngForTrackBy', 'ngForTemplate'],
      },
      {
        kind: 'directive',
        type: i1$2.NgIf,
        selector: '[ngIf]',
        inputs: ['ngIf', 'ngIfThen', 'ngIfElse'],
      },
      {
        kind: 'directive',
        type: i1$2.NgStyle,
        selector: '[ngStyle]',
        inputs: ['ngStyle'],
      },
      {
        kind: 'component',
        type: i3$1.MarkdownComponent,
        selector: '[markdown]',
        inputs: ['inline', 'data', 'appendData'],
      },
      {
        kind: 'directive',
        type: i3$2.MatLine,
        selector: '[mat-line], [matLine]',
      },
      {
        kind: 'component',
        type: i4$1.MatList,
        selector: 'mat-list',
        exportAs: ['matList'],
      },
      {
        kind: 'component',
        type: i4$1.MatListItem,
        selector: 'mat-list-item, a[mat-list-item], button[mat-list-item]',
        inputs: ['activated'],
        exportAs: ['matListItem'],
      },
      { kind: 'pipe', type: i1$2.DatePipe, name: 'date' },
    ],
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: MessageListComponent,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'solid-skeleton-message-list',
          template:
            '<mat-list>\r\n  <mat-list-item *ngFor="let msg of messages">\r\n    <h3 matLine [ngStyle]="{ fontWeight: msg.unread ? \'500\' : \'normal\' }">\r\n      {{ msg.title\r\n      }}<span *ngIf="msg.valid_from"\r\n        >&nbsp;|&nbsp;{{ msg.valid_from | date: \'dd.MM.yyyy\' }}</span\r\n      >\r\n      <span *ngIf="msg.valid_to"\r\n        >&nbsp;- {{ msg.valid_to | date: \'dd.MM.yyyy\' }}</span\r\n      >\r\n    </h3>\r\n    <div class="content-container">\r\n      <img\r\n        *ngIf="msg.img"\r\n        [src]="msg.img.img.thumbnail"\r\n        [alt]="msg.img.img_alt"\r\n      />\r\n      <div\r\n        class="text"\r\n        *ngIf="msg.text !== \'\'"\r\n        [data]="msg.text"\r\n        markdown\r\n        matLine\r\n      ></div>\r\n    </div>\r\n  </mat-list-item>\r\n</mat-list>\r\n',
          styles: [
            'mat-list{padding:.8rem 1rem 1rem}mat-list-item{margin-top:0}mat-list-item ::ng-deep p{margin-block-end:0}mat-list-item ::ng-deep h3.mat-line{padding-bottom:.5em}mat-list-item ::ng-deep .mat-list-item-content{padding:0!important;flex-direction:column!important;align-items:baseline!important}mat-list-item ::ng-deep .mat-line.md-rendered{padding-left:.22rem!important;white-space:normal!important}mat-list-item img{float:left;margin:5px 10px 1px 5px}mat-list-item .content-container{width:100%}mat-list-item .text{overflow:inherit;font-size:14px!important}mat-list-item:not(:first-child) h3{padding-top:.5em}mat-list-item:not(:last-child){padding-bottom:.8em!important}\n',
          ],
        },
      ],
    },
  ],
  propDecorators: {
    messages: [
      {
        type: Input,
      },
    ],
    tabIndex: [
      {
        type: Input,
      },
    ],
  },
});

class InfoComponent {
  msgService;
  destroy$ = new Subject();
  tourLandingChecked = false;
  tourProfileChecked = false;
  landingChecked = false;
  messagesLoading = true;
  route;
  profileTitle = '';
  changeLogMsg = [];
  newsMsg = [];
  messages = [];
  prevTab = -1;
  InfoPageContentComponent;
  PrivacyContentComponent;
  tabIndex = 0;
  info_container;
  constructor(cfg, route, msgService) {
    this.msgService = msgService;
    this.InfoPageContentComponent = cfg.infoPageContent;
    this.PrivacyContentComponent = cfg.privacyContent;
    this.profileTitle = cfg.routingConfig.profile.title;
    this.landingChecked =
      localStorage.getItem('hide_landing_banner') === 'false';
    this.tourLandingChecked =
      localStorage.getItem('hide_landing_tour') === 'false';
    this.tourProfileChecked =
      localStorage.getItem('hide_profile_tour') === 'false';
    this.route = route;
  }
  ngOnInit() {
    this.getMessages();
    this.navigateTab();
    if (this.tabIndex === 2) {
      this.prevTab = 2;
      this.updateMessages(MessageType.Notice);
    } else if (this.tabIndex === 3) {
      this.prevTab = 3;
      this.updateMessages(MessageType.Changelog);
    }
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.msgService.updateMessageState(this.messages);
  }
  moveTabToPrivacy(event) {
    event.preventDefault();
    this.tabIndex = 1;
  }
  scrollToTop() {
    const info_container = this.info_container;
    if (!info_container || info_container.nativeElement.scrollTop === 0) {
      return;
    }
    info_container.nativeElement.scrollTop = 0;
  }
  toggleChange() {
    if (this.tourLandingChecked)
      localStorage.setItem('hide_landing_tour', 'false');
    else localStorage.setItem('hide_landing_tour', 'true');
    if (this.tourProfileChecked)
      localStorage.setItem('hide_profile_tour', 'false');
    else localStorage.setItem('hide_profile_tour', 'true');
    if (this.landingChecked)
      localStorage.setItem('hide_landing_banner', 'false');
    else localStorage.setItem('hide_landing_banner', 'true');
  }
  onSelectedIndexChange(index) {
    if (this.prevTab === 2 || this.prevTab === 3) {
      this.msgService.updateMessageState(this.messages);
    }
    if (index === 2) {
      this.updateMessages(MessageType.Notice);
    } else if (index === 3) {
      this.updateMessages(MessageType.Changelog);
    }
    this.prevTab = index;
  }
  getMessages() {
    this.messagesLoading = true;
    this.msgService.messages$
      .pipe(takeUntil(this.destroy$))
      .subscribe((msgs) => {
        this.newsMsg = msgs.filter((msg) => {
          return msg.type !== MessageType.Changelog;
        });
        this.changeLogMsg = msgs.filter((msg) => {
          return msg.type === MessageType.Changelog;
        });
        this.messages = msgs;
        this.messagesLoading = false;
      });
  }
  navigateTab() {
    const directTo = this.route.snapshot.queryParams.directTo;
    switch (directTo) {
      case 'privacy':
        this.tabIndex = 1;
        break;
      case 'news':
        this.tabIndex = 2;
        break;
      default:
        this.tabIndex = 0;
        break;
    }
  }
  updateMessages(type) {
    switch (type) {
      case MessageType.Changelog:
        this.messages = this.messages.map((msg) => {
          if (msg.type === MessageType.Changelog) {
            return { ...msg, unread: false };
          } else {
            return msg;
          }
        });
        break;
      case MessageType.Notice:
      case MessageType.Series:
        this.messages = this.messages.map((msg) => {
          if (msg.type !== MessageType.Changelog) {
            return { ...msg, unread: false };
          } else {
            return msg;
          }
        });
        break;
      default:
        return;
    }
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: InfoComponent,
    deps: [
      { token: SOLID_SKELETON_CONFIG },
      { token: i1$5.ActivatedRoute },
      { token: MessagesService },
    ],
    target: i0.ɵɵFactoryTarget.Component,
  });
  static ɵcmp = i0.ɵɵngDeclareComponent({
    minVersion: '14.0.0',
    version: '16.2.9',
    type: InfoComponent,
    selector: 'solid-skeleton-info',
    viewQueries: [
      {
        propertyName: 'info_container',
        first: true,
        predicate: ['info_container'],
        descendants: true,
      },
    ],
    ngImport: i0,
    template:
      '<div class="container" *ngIf="!messagesLoading">\r\n  <div class="info-container" #info_container>\r\n    <div class="button-back-container">\r\n      <button id="backBtn" mat-icon-button class="button-back" routerLink="">\r\n        <mat-icon>arrow_back</mat-icon>\r\n      </button>\r\n    </div>\r\n    <mat-tab-group\r\n      [(selectedIndex)]="tabIndex"\r\n      (selectedIndexChange)="onSelectedIndexChange($event)"\r\n    >\r\n      <mat-tab label="Info">\r\n        <ng-container\r\n          *ngComponentOutlet="InfoPageContentComponent"\r\n        ></ng-container>\r\n        <p class="privacy">\r\n          Beachten Sie auch die\r\n          <a class="info-link" (click)="moveTabToPrivacy($event)" href=""\r\n            >Datenschutzerkl\u00E4rung</a\r\n          >\r\n          gem\u00E4\u00DF Art 13. EU DSGVO.\r\n        </p>\r\n      </mat-tab>\r\n      <mat-tab label="Datenschutz">\r\n        <ng-container\r\n          *ngComponentOutlet="PrivacyContentComponent"\r\n        ></ng-container>\r\n      </mat-tab>\r\n      <mat-tab label="News" *ngIf="newsMsg.length > 0">\r\n        <solid-skeleton-message-list\r\n          [messages]="newsMsg"\r\n          [tabIndex]="tabIndex"\r\n        ></solid-skeleton-message-list>\r\n      </mat-tab>\r\n      <mat-tab label="Changelog" *ngIf="changeLogMsg.length > 0">\r\n        <solid-skeleton-message-list\r\n          [messages]="changeLogMsg"\r\n          [tabIndex]="tabIndex"\r\n        >\r\n        </solid-skeleton-message-list>\r\n      </mat-tab>\r\n      <mat-tab label="Einstellungen">\r\n        <div class="setting-container">\r\n          <div mat-subheader class="hint">\r\n            Hinweis: Alle Einstellungen werden nur auf diesem Ger\u00E4t gespeichert.\r\n          </div>\r\n\r\n          <mat-list id="setting" class="setting-list">\r\n            <div mat-subheader>Startseite</div>\r\n            <mat-list-item>\r\n              <mat-slide-toggle\r\n                (change)="toggleChange()"\r\n                [(ngModel)]="landingChecked"\r\n              >\r\n                Willkommensnachricht anzeigen\r\n              </mat-slide-toggle>\r\n            </mat-list-item>\r\n            <mat-list-item>\r\n              <mat-slide-toggle\r\n                (change)="toggleChange()"\r\n                [(ngModel)]="tourLandingChecked"\r\n              >\r\n                Tour anzeigen\r\n              </mat-slide-toggle>\r\n            </mat-list-item>\r\n            <div mat-subheader class="hint" *ngIf="tourLandingChecked">\r\n              Die Tour wird beim n\u00E4chsten Besuch der Startseite angezeigt.\r\n            </div>\r\n            <div mat-subheader>{{ profileTitle }}</div>\r\n            <mat-list-item>\r\n              <mat-slide-toggle\r\n                (change)="toggleChange()"\r\n                [(ngModel)]="tourProfileChecked"\r\n              >\r\n                Tour anzeigen\r\n              </mat-slide-toggle>\r\n            </mat-list-item>\r\n            <div mat-subheader class="hint" *ngIf="tourProfileChecked">\r\n              Die Tour wird beim n\u00E4chsten Besuch der\r\n              {{ profileTitle }} angezeigt.\r\n            </div>\r\n          </mat-list>\r\n        </div>\r\n      </mat-tab>\r\n    </mat-tab-group>\r\n  </div>\r\n</div>\r\n',
    styles: [
      '.container{height:100%;overflow:hidden}.container mat-tab-group ::ng-deep .mat-tab-header{box-shadow:0 4px 2px -2px #0003;height:56px;border-bottom:0;background-color:#fff;margin-left:60px;position:fixed;width:calc(100% - 56px);z-index:999}.container mat-tab-group ::ng-deep .mat-tab-label{height:56px}.container mat-tab-group ::ng-deep .mat-tab-body-wrapper{position:relative;margin-top:40px}.container mat-tab-group ::ng-deep .mat-tab-body-wrapper .mat-list{margin-top:1.5em}.info-container{overflow-y:auto;height:100%;z-index:-999}.info-container .button-back-container{background-color:#fff;box-shadow:0 4px 2px -2px #0003;height:56px;width:64px;position:absolute;z-index:99}.info-container .button-back-container .button-back{position:absolute;left:16px;top:8px}.privacy{margin-top:-1rem;padding:0 1rem 1rem}.setting-container{padding:.8rem 1rem 1rem}.setting-container mat-slide-toggle{margin:7px 0;display:block;font-size:14px}.hint{font-style:italic;font-size:12px}\n',
    ],
    dependencies: [
      {
        kind: 'directive',
        type: i1$2.NgComponentOutlet,
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
        kind: 'directive',
        type: i1$2.NgIf,
        selector: '[ngIf]',
        inputs: ['ngIf', 'ngIfThen', 'ngIfElse'],
      },
      {
        kind: 'directive',
        type: i1$4.NgControlStatus,
        selector: '[formControlName],[ngModel],[formControl]',
      },
      {
        kind: 'directive',
        type: i1$4.NgModel,
        selector: '[ngModel]:not([formControlName]):not([formControl])',
        inputs: ['name', 'disabled', 'ngModel', 'ngModelOptions'],
        outputs: ['ngModelChange'],
        exportAs: ['ngModel'],
      },
      {
        kind: 'directive',
        type: i1$5.RouterLink,
        selector: '[routerLink]',
        inputs: [
          'target',
          'queryParams',
          'fragment',
          'queryParamsHandling',
          'state',
          'relativeTo',
          'preserveFragment',
          'skipLocationChange',
          'replaceUrl',
          'routerLink',
        ],
      },
      {
        kind: 'component',
        type: i4.MatIconButton,
        selector: 'button[mat-icon-button]',
        inputs: ['disabled', 'disableRipple', 'color'],
        exportAs: ['matButton'],
      },
      {
        kind: 'component',
        type: i1$3.MatIcon,
        selector: 'mat-icon',
        inputs: ['color', 'inline', 'svgIcon', 'fontSet', 'fontIcon'],
        exportAs: ['matIcon'],
      },
      {
        kind: 'component',
        type: i4$1.MatList,
        selector: 'mat-list',
        exportAs: ['matList'],
      },
      {
        kind: 'component',
        type: i4$1.MatListItem,
        selector: 'mat-list-item, a[mat-list-item], button[mat-list-item]',
        inputs: ['activated'],
        exportAs: ['matListItem'],
      },
      {
        kind: 'directive',
        type: i4$1.MatListSubheaderCssMatStyler,
        selector: '[mat-subheader], [matSubheader]',
      },
      {
        kind: 'component',
        type: i8$2.MatTab,
        selector: 'mat-tab',
        inputs: ['disabled'],
        exportAs: ['matTab'],
      },
      {
        kind: 'component',
        type: i8$2.MatTabGroup,
        selector: 'mat-tab-group',
        inputs: [
          'color',
          'disableRipple',
          'fitInkBarToContent',
          'mat-stretch-tabs',
        ],
        exportAs: ['matTabGroup'],
      },
      {
        kind: 'component',
        type: i6.MatSlideToggle,
        selector: 'mat-slide-toggle',
        inputs: ['disabled', 'disableRipple', 'color', 'tabIndex'],
        exportAs: ['matSlideToggle'],
      },
      {
        kind: 'component',
        type: MessageListComponent,
        selector: 'solid-skeleton-message-list',
        inputs: ['messages', 'tabIndex'],
      },
    ],
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: InfoComponent,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'solid-skeleton-info',
          template:
            '<div class="container" *ngIf="!messagesLoading">\r\n  <div class="info-container" #info_container>\r\n    <div class="button-back-container">\r\n      <button id="backBtn" mat-icon-button class="button-back" routerLink="">\r\n        <mat-icon>arrow_back</mat-icon>\r\n      </button>\r\n    </div>\r\n    <mat-tab-group\r\n      [(selectedIndex)]="tabIndex"\r\n      (selectedIndexChange)="onSelectedIndexChange($event)"\r\n    >\r\n      <mat-tab label="Info">\r\n        <ng-container\r\n          *ngComponentOutlet="InfoPageContentComponent"\r\n        ></ng-container>\r\n        <p class="privacy">\r\n          Beachten Sie auch die\r\n          <a class="info-link" (click)="moveTabToPrivacy($event)" href=""\r\n            >Datenschutzerkl\u00E4rung</a\r\n          >\r\n          gem\u00E4\u00DF Art 13. EU DSGVO.\r\n        </p>\r\n      </mat-tab>\r\n      <mat-tab label="Datenschutz">\r\n        <ng-container\r\n          *ngComponentOutlet="PrivacyContentComponent"\r\n        ></ng-container>\r\n      </mat-tab>\r\n      <mat-tab label="News" *ngIf="newsMsg.length > 0">\r\n        <solid-skeleton-message-list\r\n          [messages]="newsMsg"\r\n          [tabIndex]="tabIndex"\r\n        ></solid-skeleton-message-list>\r\n      </mat-tab>\r\n      <mat-tab label="Changelog" *ngIf="changeLogMsg.length > 0">\r\n        <solid-skeleton-message-list\r\n          [messages]="changeLogMsg"\r\n          [tabIndex]="tabIndex"\r\n        >\r\n        </solid-skeleton-message-list>\r\n      </mat-tab>\r\n      <mat-tab label="Einstellungen">\r\n        <div class="setting-container">\r\n          <div mat-subheader class="hint">\r\n            Hinweis: Alle Einstellungen werden nur auf diesem Ger\u00E4t gespeichert.\r\n          </div>\r\n\r\n          <mat-list id="setting" class="setting-list">\r\n            <div mat-subheader>Startseite</div>\r\n            <mat-list-item>\r\n              <mat-slide-toggle\r\n                (change)="toggleChange()"\r\n                [(ngModel)]="landingChecked"\r\n              >\r\n                Willkommensnachricht anzeigen\r\n              </mat-slide-toggle>\r\n            </mat-list-item>\r\n            <mat-list-item>\r\n              <mat-slide-toggle\r\n                (change)="toggleChange()"\r\n                [(ngModel)]="tourLandingChecked"\r\n              >\r\n                Tour anzeigen\r\n              </mat-slide-toggle>\r\n            </mat-list-item>\r\n            <div mat-subheader class="hint" *ngIf="tourLandingChecked">\r\n              Die Tour wird beim n\u00E4chsten Besuch der Startseite angezeigt.\r\n            </div>\r\n            <div mat-subheader>{{ profileTitle }}</div>\r\n            <mat-list-item>\r\n              <mat-slide-toggle\r\n                (change)="toggleChange()"\r\n                [(ngModel)]="tourProfileChecked"\r\n              >\r\n                Tour anzeigen\r\n              </mat-slide-toggle>\r\n            </mat-list-item>\r\n            <div mat-subheader class="hint" *ngIf="tourProfileChecked">\r\n              Die Tour wird beim n\u00E4chsten Besuch der\r\n              {{ profileTitle }} angezeigt.\r\n            </div>\r\n          </mat-list>\r\n        </div>\r\n      </mat-tab>\r\n    </mat-tab-group>\r\n  </div>\r\n</div>\r\n',
          styles: [
            '.container{height:100%;overflow:hidden}.container mat-tab-group ::ng-deep .mat-tab-header{box-shadow:0 4px 2px -2px #0003;height:56px;border-bottom:0;background-color:#fff;margin-left:60px;position:fixed;width:calc(100% - 56px);z-index:999}.container mat-tab-group ::ng-deep .mat-tab-label{height:56px}.container mat-tab-group ::ng-deep .mat-tab-body-wrapper{position:relative;margin-top:40px}.container mat-tab-group ::ng-deep .mat-tab-body-wrapper .mat-list{margin-top:1.5em}.info-container{overflow-y:auto;height:100%;z-index:-999}.info-container .button-back-container{background-color:#fff;box-shadow:0 4px 2px -2px #0003;height:56px;width:64px;position:absolute;z-index:99}.info-container .button-back-container .button-back{position:absolute;left:16px;top:8px}.privacy{margin-top:-1rem;padding:0 1rem 1rem}.setting-container{padding:.8rem 1rem 1rem}.setting-container mat-slide-toggle{margin:7px 0;display:block;font-size:14px}.hint{font-style:italic;font-size:12px}\n',
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
            args: [SOLID_SKELETON_CONFIG],
          },
        ],
      },
      { type: i1$5.ActivatedRoute },
      { type: MessagesService },
    ];
  },
  propDecorators: {
    info_container: [
      {
        type: ViewChild,
        args: ['info_container'],
      },
    ],
  },
});

function generateRoutes(config) {
  const routes = [];
  const addRoute = (cfg) => {
    routes.push({
      path: cfg.url,
      component: cfg.component,
      data: {
        title: cfg.title,
        showInMenu: cfg.showInMenu,
        showOnLandingPage: cfg.showOnLandingPage,
        icon: cfg.matIcon,
        svgIcon: cfg.svgIcon,
        order: cfg.order,
        name: cfg.name,
      },
    });
  };
  const addModuleRoute = (cfg) => {
    routes.push({
      path: cfg.url,
      loadChildren: cfg.moduleImport,
      data: {
        title: cfg.title,
        showInMenu: cfg.showInMenu,
        showOnLandingPage: cfg.showOnLandingPage,
        icon: cfg.matIcon,
        svgIcon: cfg.svgIcon,
        order: cfg.order,
        name: cfg.name,
      },
    });
  };
  // landing page
  if (config.landing.enabled) {
    addRoute({ ...config.landing, component: LandingComponent });
  }
  if (config.profile.enabled) {
    addModuleRoute(config.profile);
  }
  if (config.quiz.enabled) {
    addModuleRoute(config.quiz);
  }
  if (config.slideshow.enabled) {
    addModuleRoute(config.slideshow);
  }
  if (config.info.enabled) {
    addRoute({ ...config.info, component: InfoComponent });
  }
  // if (config.privacy.enabled) {
  //   addRoute(config.privacy);
  // }
  config.custom?.forEach((custom) => {
    if (custom.enabled) {
      if (custom.component) {
        addRoute(custom);
      } else {
        addModuleRoute(custom);
      }
    }
  });
  routes.push({ path: '**', redirectTo: '' });
  return routes.sort((a, b) => a.data?.order - b.data?.order);
}

function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}
function deepMerge(target, source) {
  const output = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) Object.assign(output, { [key]: source[key] });
        else output[key] = deepMerge(target[key], source[key]);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

// This workaround is required for the "old" angular compiler in production mode. Ivy library publishing is not supported until angular 10.
// https://github.com/ng-packagr/ng-packagr/issues/767
const ngxsFeatureModule = NgxsModule.forFeature([MenuState]);
function configFactory(cfg) {
  const fn = function () {
    return deepMerge(defaultSkeletonConfig, cfg);
  };
  return fn;
}
function routingFactory(cfg) {
  return generateRoutes(cfg.routingConfig);
}
class SolidSkeletonModule {
  static forRoot(cfg) {
    const errHandler = createErrorHandler(cfg.sentry?.errorHandlerOptions);
    return {
      ngModule: SolidSkeletonModule,
      providers: [
        {
          provide: SOLID_SKELETON_CONFIG,
          useFactory: configFactory(cfg),
        },
        {
          provide: SOLID_SKELETON_FEEDBACK_SERVICE,
          useFactory: feedbackServiceFactory,
          deps: [
            HttpClient,
            MatDialog,
            SOLID_CORE_CONFIG,
            SOLID_SKELETON_CONFIG,
          ],
        },
        {
          provide: ROUTES,
          useFactory: routingFactory,
          deps: [SOLID_SKELETON_CONFIG],
          multi: true,
        },
        {
          provide: ErrorHandler,
          useValue: createErrorHandler(cfg.sentry?.errorHandlerOptions),
        },
        {
          provide: SOLID_PROFILE_BASE_URL,
          useValue: cfg.routingConfig.profile?.url ?? 'profile',
        },
        {
          provide: SOLID_SLIDESHOW_APP_ROUTING_CONFIG,
          useValue: cfg.routingConfig.slideshow,
        },
      ],
    };
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: SolidSkeletonModule,
    deps: [],
    target: i0.ɵɵFactoryTarget.NgModule,
  });
  static ɵmod = i0.ɵɵngDeclareNgModule({
    minVersion: '14.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: SolidSkeletonModule,
    declarations: [
      BaseLayoutComponent,
      FeedbackComponent,
      MainMenuComponent,
      UpdateDialogComponent,
      LandingComponent,
      InfoComponent,
      MessageListComponent,
      PrivacyDialogComponent,
      LandingBannerDialogComponent,
      GridColsDirective,
    ],
    imports: [
      CommonModule,
      SolidCoreModule,
      SolidGlossaryModule,
      RouterModule,
      MatButtonModule,
      MatCardModule,
      MatDialogModule,
      MatFormFieldModule,
      MatGridListModule,
      MatIconModule,
      MatInputModule,
      MatListModule,
      MatSelectModule,
      MatCheckboxModule,
      MatSidenavModule,
      MatTabsModule,
      MatToolbarModule,
      i2.ɵNgxsFeatureModule,
      MatExpansionModule,
      MatSlideToggleModule,
      MatBadgeModule,
    ],
    exports: [BaseLayoutComponent],
  });
  static ɵinj = i0.ɵɵngDeclareInjector({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: SolidSkeletonModule,
    providers: [UpdateService, IntroService],
    imports: [
      CommonModule,
      SolidCoreModule,
      SolidGlossaryModule,
      RouterModule,
      MatButtonModule,
      MatCardModule,
      MatDialogModule,
      MatFormFieldModule,
      MatGridListModule,
      MatIconModule,
      MatInputModule,
      MatListModule,
      MatSelectModule,
      MatCheckboxModule,
      MatSidenavModule,
      MatTabsModule,
      MatToolbarModule,
      ngxsFeatureModule,
      MatExpansionModule,
      MatSlideToggleModule,
      MatBadgeModule,
    ],
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: SolidSkeletonModule,
  decorators: [
    {
      type: NgModule,
      args: [
        {
          imports: [
            CommonModule,
            SolidCoreModule,
            SolidGlossaryModule,
            RouterModule,
            MatButtonModule,
            MatCardModule,
            MatDialogModule,
            MatFormFieldModule,
            MatGridListModule,
            MatIconModule,
            MatInputModule,
            MatListModule,
            MatSelectModule,
            MatCheckboxModule,
            MatSidenavModule,
            MatTabsModule,
            MatToolbarModule,
            ngxsFeatureModule,
            MatExpansionModule,
            MatSlideToggleModule,
            MatBadgeModule,
          ],
          declarations: [
            BaseLayoutComponent,
            FeedbackComponent,
            MainMenuComponent,
            UpdateDialogComponent,
            LandingComponent,
            InfoComponent,
            MessageListComponent,
            PrivacyDialogComponent,
            LandingBannerDialogComponent,
            GridColsDirective,
          ],
          exports: [BaseLayoutComponent],
          providers: [UpdateService, IntroService],
          schemas: [CUSTOM_ELEMENTS_SCHEMA],
        },
      ],
    },
  ],
});

const initSentry = (cfg) => {
  init({
    enabled: cfg !== undefined,
    dsn: cfg?.dsn,
    environment: cfg?.environment,
    release: cfg?.version.semver.version,
    autoSessionTracking: false,
    integrations: [
      // new Integrations.BrowserTracing({
      //   tracingOrigins: ["localhost", "https://yourserver.io/api"],
      //   routingInstrumentation: Sentry.routingInstrumentation,
      // }),
    ],
  });
};

/**
 * Generated bundle index. Do not edit.
 */

export {
  BaseLayoutComponent,
  FeedbackService,
  SOLID_SKELETON_CONFIG,
  SOLID_SKELETON_FEEDBACK_SERVICE,
  SOLID_SKELETON_HACKY_INJECTION,
  SolidSkeletonModule,
  configFactory,
  feedbackServiceFactory,
  initSentry,
  ngxsFeatureModule,
  routingFactory,
};
//# sourceMappingURL=zentrumnawi-solid-skeleton.mjs.map
