import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';
import {
  FeedbackService,
  SOLID_SKELETON_FEEDBACK_SERVICE,
} from '../../services/feedback.service';
import { PrivacyDialogComponent } from '../privacy-dialog/privacy-dialog.component';
import * as i0 from '@angular/core';
import * as i1 from '@angular/forms';
import * as i2 from '@angular/material/dialog';
import * as i3 from '@angular/common';
import * as i4 from '@angular/material/button';
import * as i5 from '@angular/material/form-field';
import * as i6 from '@angular/material/icon';
import * as i7 from '@angular/material/input';
import * as i8 from '@angular/cdk/text-field';
import * as i9 from '@angular/material/checkbox';
import * as i10 from '../../services/feedback.service';
export class FeedbackComponent {
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
      { token: i1.UntypedFormBuilder },
      { token: i2.MatDialogRef },
      { token: i2.MatDialog },
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
        type: i3.NgIf,
        selector: '[ngIf]',
        inputs: ['ngIf', 'ngIfThen', 'ngIfElse'],
      },
      {
        kind: 'directive',
        type: i1.ɵNgNoValidate,
        selector: 'form:not([ngNoForm]):not([ngNativeValidate])',
      },
      {
        kind: 'directive',
        type: i1.DefaultValueAccessor,
        selector:
          'input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]',
      },
      {
        kind: 'directive',
        type: i1.NgControlStatus,
        selector: '[formControlName],[ngModel],[formControl]',
      },
      {
        kind: 'directive',
        type: i1.NgControlStatusGroup,
        selector:
          '[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]',
      },
      {
        kind: 'directive',
        type: i1.NgModel,
        selector: '[ngModel]:not([formControlName]):not([formControl])',
        inputs: ['name', 'disabled', 'ngModel', 'ngModelOptions'],
        outputs: ['ngModelChange'],
        exportAs: ['ngModel'],
      },
      {
        kind: 'directive',
        type: i1.FormGroupDirective,
        selector: '[formGroup]',
        inputs: ['formGroup'],
        outputs: ['ngSubmit'],
        exportAs: ['ngForm'],
      },
      {
        kind: 'directive',
        type: i1.FormControlName,
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
        type: i2.MatDialogClose,
        selector: '[mat-dialog-close], [matDialogClose]',
        inputs: ['aria-label', 'type', 'mat-dialog-close', 'matDialogClose'],
        exportAs: ['matDialogClose'],
      },
      {
        kind: 'directive',
        type: i2.MatDialogContent,
        selector:
          '[mat-dialog-content], mat-dialog-content, [matDialogContent]',
      },
      {
        kind: 'directive',
        type: i2.MatDialogActions,
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
        type: i6.MatIcon,
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
        type: i10.FeedbackService,
        decorators: [
          {
            type: Inject,
            args: [SOLID_SKELETON_FEEDBACK_SERVICE],
          },
        ],
      },
      { type: i1.UntypedFormBuilder },
      { type: i2.MatDialogRef },
      { type: i2.MatDialog },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVlZGJhY2suY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zb2xpZC9za2VsZXRvbi9zcmMvbGliL2NvbXBvbmVudHMvZmVlZGJhY2svZmVlZGJhY2suY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zb2xpZC9za2VsZXRvbi9zcmMvbGliL2NvbXBvbmVudHMvZmVlZGJhY2svZmVlZGJhY2suY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQ3JFLE9BQU8sRUFDTCxrQkFBa0IsRUFFbEIsVUFBVSxHQUNYLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxFQUNMLGVBQWUsRUFDZixZQUFZLEVBQ1osU0FBUyxHQUNWLE1BQU0sMEJBQTBCLENBQUM7QUFFbEMsT0FBTyxFQUNMLGVBQWUsRUFDZiwrQkFBK0IsR0FDaEMsTUFBTSxpQ0FBaUMsQ0FBQztBQUN6QyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQzs7Ozs7Ozs7Ozs7O0FBT3BGLE1BQU0sT0FBTyxpQkFBaUI7SUFVbkI7SUFDQTtJQUNDO0lBQ0E7SUFJeUI7SUFoQjNCLE1BQU0sQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDO0lBQ2xDLE1BQU0sQ0FBQyxhQUFhLEdBQUcsY0FBYyxDQUFDO0lBQ3RDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDZixJQUFJLENBQW1CO0lBQ3ZCLFNBQVMsQ0FBUztJQUNsQixjQUFjLEdBQUcsS0FBSyxDQUFDO0lBRTlCLFlBRVMsUUFBeUIsRUFDekIsRUFBc0IsRUFDckIsSUFBcUMsRUFDckMsT0FBa0I7SUFDMUIsa0hBQWtIO0lBQ2xIOzBDQUNzQztJQUNMLGVBQW9CO1FBUDlDLGFBQVEsR0FBUixRQUFRLENBQWlCO1FBQ3pC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TDdCLFNBQVM7K0JBQ0UseUJBQXlCOzswQkFhaEMsTUFBTTsyQkFBQywrQkFBK0I7OzBCQVF0QyxNQUFNOzJCQUFDLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEluamVjdCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtcclxuICBVbnR5cGVkRm9ybUJ1aWxkZXIsXHJcbiAgVW50eXBlZEZvcm1Hcm91cCxcclxuICBWYWxpZGF0b3JzLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHtcclxuICBNQVRfRElBTE9HX0RBVEEsXHJcbiAgTWF0RGlhbG9nUmVmLFxyXG4gIE1hdERpYWxvZyxcclxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xyXG5cclxuaW1wb3J0IHtcclxuICBGZWVkYmFja1NlcnZpY2UsXHJcbiAgU09MSURfU0tFTEVUT05fRkVFREJBQ0tfU0VSVklDRSxcclxufSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9mZWVkYmFjay5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUHJpdmFjeURpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4uL3ByaXZhY3ktZGlhbG9nL3ByaXZhY3ktZGlhbG9nLmNvbXBvbmVudCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3NvbGlkLXNrZWxldG9uLWZlZWRiYWNrJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vZmVlZGJhY2suY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2ZlZWRiYWNrLmNvbXBvbmVudC5zY3NzJ10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGZWVkYmFja0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBwcml2YXRlIHN0YXRpYyBTVE9SQUdFX0tFWV8xID0gJ0ZFRURCQUNLJztcclxuICBwcml2YXRlIHN0YXRpYyBTVE9SQUdFX0tFWV8yID0gJ0VSUk9SX1JFUE9SVCc7XHJcbiAgcHJpdmF0ZSBfc2VudCA9IGZhbHNlO1xyXG4gIHB1YmxpYyBGb3JtOiBVbnR5cGVkRm9ybUdyb3VwO1xyXG4gIHB1YmxpYyBmb3JtVGl0bGU6IHN0cmluZztcclxuICBwdWJsaWMgcHJpdmFjeUNoZWNrZWQgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBASW5qZWN0KFNPTElEX1NLRUxFVE9OX0ZFRURCQUNLX1NFUlZJQ0UpXHJcbiAgICBwdWJsaWMgZmVlZGJhY2s6IEZlZWRiYWNrU2VydmljZSxcclxuICAgIHB1YmxpYyBmYjogVW50eXBlZEZvcm1CdWlsZGVyLFxyXG4gICAgcHJpdmF0ZSBfcmVmOiBNYXREaWFsb2dSZWY8RmVlZGJhY2tDb21wb25lbnQ+LFxyXG4gICAgcHJpdmF0ZSBfZGlhbG9nOiBNYXREaWFsb2csXHJcbiAgICAvKiogSW5qZWN0IHRoZSByZXF1aXJlZCBzZXJ2aWNlIGZ1bmN0aW9uIHRvIHByZXZlbnQgYSBjaXJjdWxhciBkZXBlbmRlbmN5IGJldHdlZW4gdGhlIENvbXBvbmVudCBhbmQgdGhlIHNlcnZpY2UgKi9cclxuICAgIC8qIHR5cGUgaXMgZGVmaW5lZCBhcyBhbnkgdG8gcHJldmVudCBuZy1wYWNrYWdyIGlzc3Vlc1xyXG4gICAgIChkYXRhOiBhbnkpID0+IE9ic2VydmFibGU8Ym9vbGVhbj4gKi9cclxuICAgIEBJbmplY3QoTUFUX0RJQUxPR19EQVRBKSBwcml2YXRlIF9zdWJtaXRGZWVkYmFjazogYW55XHJcbiAgKSB7XHJcbiAgICB0aGlzLmZvcm1UaXRsZSA9IF9zdWJtaXRGZWVkYmFjay50aXRsZTtcclxuXHJcbiAgICB0aGlzLkZvcm0gPSBmYi5ncm91cCh7XHJcbiAgICAgIG5hbWU6IFsnJ10sXHJcbiAgICAgIGVtYWlsOiBbJycsIFtWYWxpZGF0b3JzLnJlcXVpcmVkLCBWYWxpZGF0b3JzLmVtYWlsXV0sXHJcbiAgICAgIHN1YmplY3Q6IFtfc3VibWl0RmVlZGJhY2suc3ViamVjdCwgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXHJcbiAgICAgIG1lc3NhZ2U6IFsnJ10sXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvbkNhbmNlbENsaWNrKCkge1xyXG4gICAgdGhpcy5fcmVmLmNsb3NlKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25Pa0NsaWNrKCkge1xyXG4gICAgaWYgKCF0aGlzLkZvcm0udmFsaWQpIHtcclxuICAgICAgdGhpcy5Gb3JtLm1hcmtBbGxBc1RvdWNoZWQoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuRm9ybS52YWx1ZVsnbWVzc2FnZSddICs9ICdcXG5cXG4nICsgdGhpcy5fc3VibWl0RmVlZGJhY2subG9jYXRpb247XHJcbiAgICAgIHRoaXMuZmVlZGJhY2suc3VibWl0RmVlZGJhY2sodGhpcy5Gb3JtLnZhbHVlKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuX3NlbnQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX3JlZi5jbG9zZSgpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGtleSA9IHRoaXMuZ2V0TG9jYXRpb24oKVxyXG4gICAgICA/IEZlZWRiYWNrQ29tcG9uZW50LlNUT1JBR0VfS0VZXzJcclxuICAgICAgOiBGZWVkYmFja0NvbXBvbmVudC5TVE9SQUdFX0tFWV8xO1xyXG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KHRoaXMuRm9ybS52YWx1ZSkpO1xyXG4gICAgaWYgKHRoaXMuX3NlbnQpIHtcclxuICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgY29uc3Qgc3RyID0gdGhpcy5nZXRMb2NhdGlvbigpXHJcbiAgICAgID8gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShGZWVkYmFja0NvbXBvbmVudC5TVE9SQUdFX0tFWV8yKVxyXG4gICAgICA6IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oRmVlZGJhY2tDb21wb25lbnQuU1RPUkFHRV9LRVlfMSk7XHJcbiAgICBpZiAoIXN0cikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBvYmogPSBKU09OLnBhcnNlKHN0cik7XHJcbiAgICB0aGlzLkZvcm0uc2V0VmFsdWUob2JqKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRMb2NhdGlvbigpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX3N1Ym1pdEZlZWRiYWNrLmxvY2F0aW9uO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uUHJpdmFjeUNsaWNrKCkge1xyXG4gICAgdGhpcy5fZGlhbG9nLm9wZW4oUHJpdmFjeURpYWxvZ0NvbXBvbmVudCwge1xyXG4gICAgICBtYXhXaWR0aDogJzgwMHB4JyxcclxuICAgICAgcGFuZWxDbGFzczogJ3ByaXZhY3ktZGlhbG9nJyxcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCI8ZGl2IGNsYXNzPVwiaGVhZGVyLWNvbnRhaW5lclwiPlxyXG4gIDxwIGNsYXNzPVwidGl0bGVcIj57eyBmb3JtVGl0bGUgfX08L3A+XHJcbiAgPGJ1dHRvbiBjbGFzcz1cImNsb3NlQnRuXCIgbWF0LWljb24tYnV0dG9uIG1hdC1kaWFsb2ctY2xvc2U+XHJcbiAgICA8bWF0LWljb24+Y2xvc2U8L21hdC1pY29uPlxyXG4gIDwvYnV0dG9uPlxyXG48L2Rpdj5cclxuPGRpdiBjbGFzcz1cImZlZWRiYWNrLWNvbnRlbnRcIiBtYXQtZGlhbG9nLWNvbnRlbnQ+XHJcbiAgPGZvcm0gW2Zvcm1Hcm91cF09XCJGb3JtXCI+XHJcbiAgICA8bWF0LWZvcm0tZmllbGQ+XHJcbiAgICAgIDxpbnB1dCBmb3JtQ29udHJvbE5hbWU9XCJuYW1lXCIgbWF0SW5wdXQgcGxhY2Vob2xkZXI9XCJOYW1lXCIgdHlwZT1cInRleHRcIiAvPlxyXG4gICAgPC9tYXQtZm9ybS1maWVsZD5cclxuICAgIDxtYXQtZm9ybS1maWVsZD5cclxuICAgICAgPGlucHV0XHJcbiAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwiZW1haWxcIlxyXG4gICAgICAgIG1hdElucHV0XHJcbiAgICAgICAgcGxhY2Vob2xkZXI9XCJFbWFpbFwiXHJcbiAgICAgICAgdHlwZT1cImVtYWlsXCJcclxuICAgICAgLz5cclxuICAgIDwvbWF0LWZvcm0tZmllbGQ+XHJcbiAgICA8bWF0LWZvcm0tZmllbGQ+XHJcbiAgICAgIDxpbnB1dCBtYXRJbnB1dCBmb3JtQ29udHJvbE5hbWU9XCJzdWJqZWN0XCIgcGxhY2Vob2xkZXI9XCJCZXRyZWZmXCIgLz5cclxuICAgIDwvbWF0LWZvcm0tZmllbGQ+XHJcbiAgICA8bWF0LWZvcm0tZmllbGQ+XHJcbiAgICAgIDx0ZXh0YXJlYVxyXG4gICAgICAgIGNka0F1dG9zaXplTWluUm93cz1cIjEwXCJcclxuICAgICAgICBjZGtUZXh0YXJlYUF1dG9zaXplXHJcbiAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwibWVzc2FnZVwiXHJcbiAgICAgICAgbWF0SW5wdXRcclxuICAgICAgICBwbGFjZWhvbGRlcj1cIk5hY2hyaWNodFwiXHJcbiAgICAgID48L3RleHRhcmVhPlxyXG4gICAgPC9tYXQtZm9ybS1maWVsZD5cclxuICA8L2Zvcm0+XHJcbjwvZGl2PlxyXG48ZGl2IGNsYXNzPVwiYWRkaXRpb25hbC1jb250YWluZXJcIj5cclxuICA8bWF0LWxhYmVsIGNsYXNzPVwibG9jYXRpb25cIiAqbmdJZj1cImdldExvY2F0aW9uKClcIlxyXG4gICAgPkZlaGxlciBnZWZ1bmRlbiBpbjoge3sgZ2V0TG9jYXRpb24oKSB9fTwvbWF0LWxhYmVsXHJcbiAgPlxyXG4gIDxtYXQtY2hlY2tib3ggWyhuZ01vZGVsKV09XCJwcml2YWN5Q2hlY2tlZFwiPlxyXG4gICAgSGllcm1pdCBuZWhtZSBpY2ggZGllXHJcbiAgICA8YSBjbGFzcz1cInByaXZhY3ktbGlua1wiIChjbGljayk9XCJvblByaXZhY3lDbGljaygpXCI+RGF0ZW5zY2h1dHplcmtsw6RydW5nPC9hPlxyXG4gICAgenVyIEtlbm50bmlzIHVuZCBzdGltbWUgZGVyIFNwZWljaGVydW5nIGRlciBpbiBkaWVzZW0gRm9ybXVsYXIgYW5nZWdlYmVuZW5cclxuICAgIERhdGVuIHp1LlxyXG4gIDwvbWF0LWNoZWNrYm94PlxyXG48L2Rpdj5cclxuPGRpdiBtYXQtZGlhbG9nLWFjdGlvbnM+XHJcbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPjwvZGl2PlxyXG4gIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIChjbGljayk9XCJvbkNhbmNlbENsaWNrKClcIiBtYXQtYnV0dG9uPkFiYnJlY2hlbjwvYnV0dG9uPlxyXG4gIDxidXR0b25cclxuICAgIFtkaXNhYmxlZF09XCIhcHJpdmFjeUNoZWNrZWRcIlxyXG4gICAgY2xhc3M9XCJzZW5kLWJ0blwiXHJcbiAgICAoY2xpY2spPVwib25Pa0NsaWNrKClcIlxyXG4gICAgbWF0LWJ1dHRvblxyXG4gID5cclxuICAgIEFic2VuZGVuXHJcbiAgPC9idXR0b24+XHJcbjwvZGl2PlxyXG4iXX0=
