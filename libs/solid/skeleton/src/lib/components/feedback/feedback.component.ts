import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
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

@Component({
  selector: 'solid-skeleton-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit, OnDestroy {
  private static STORAGE_KEY_1 = 'FEEDBACK';
  private static STORAGE_KEY_2 = 'ERROR_REPORT';
  private _sent = false;
  public Form: UntypedFormGroup;
  public formTitle: string;
  public privacyChecked = false;

  constructor(
    @Inject(SOLID_SKELETON_FEEDBACK_SERVICE)
    public feedback: FeedbackService,
    public fb: UntypedFormBuilder,
    private _ref: MatDialogRef<FeedbackComponent>,
    private _dialog: MatDialog,
    /** Inject the required service function to prevent a circular dependency between the Component and the service */
    /* type is defined as any to prevent ng-packagr issues
     (data: any) => Observable<boolean> */
    @Inject(MAT_DIALOG_DATA) private _submitFeedback: any,
  ) {
    this.formTitle = _submitFeedback.title;

    this.Form = fb.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      subject: [_submitFeedback.subject, Validators.required],
      message: [''],
    });
  }

  public onCancelClick() {
    this._ref.close();
  }

  public onOkClick() {
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

  public ngOnDestroy(): void {
    const key = this.getLocation()
      ? FeedbackComponent.STORAGE_KEY_2
      : FeedbackComponent.STORAGE_KEY_1;
    sessionStorage.setItem(key, JSON.stringify(this.Form.value));
    if (this._sent) {
      sessionStorage.removeItem(key);
    }
  }

  public ngOnInit(): void {
    const str = this.getLocation()
      ? sessionStorage.getItem(FeedbackComponent.STORAGE_KEY_2)
      : sessionStorage.getItem(FeedbackComponent.STORAGE_KEY_1);
    if (!str) {
      return;
    }
    const obj = JSON.parse(str);
    this.Form.setValue(obj);
  }

  public getLocation(): string {
    return this._submitFeedback.location;
  }

  public onPrivacyClick() {
    this._dialog.open(PrivacyDialogComponent, {
      maxWidth: '800px',
      panelClass: 'privacy-dialog',
    });
  }
}
