import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'solid-skeleton-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit, OnDestroy {
  private static STORAGE_KEY = 'FEEDBACK';
  public Form: FormGroup;

  constructor(
    private _ref: MatDialogRef<FeedbackComponent>,
    /** Inject the required service function to prevent a circular dependency between the Component and the service */
    @Inject(MAT_DIALOG_DATA)
    private // type is defined as any to prevent ng-packagr issues
    //  (data: any) => Observable<boolean>
    _submitFeedback: any,
    fb: FormBuilder
  ) {
    this.Form = fb.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      subject: ['Feedback', Validators.required],
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
      this._submitFeedback(this.Form.value).subscribe(() => {
        this._ref.close();
      });
    }
  }

  public ngOnDestroy(): void {
    sessionStorage.setItem(
      FeedbackComponent.STORAGE_KEY,
      JSON.stringify(this.Form.value)
    );
  }

  public ngOnInit(): void {
    const str = sessionStorage.getItem(FeedbackComponent.STORAGE_KEY);
    if (!str) {
      return;
    }
    const obj = JSON.parse(str);
    this.Form.setValue(obj);
  }
}
