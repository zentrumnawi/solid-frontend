import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'solid-skeleton-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit, OnDestroy {
  private static STORAGE_KEY_1 = 'FEEDBACK';
  private static STORAGE_KEY_2 = 'ERRORMESSAGE';
  private _sent = false;
  public Form: FormGroup;
  public formTitle: string;

  constructor(
    public fb: FormBuilder,
    private _ref: MatDialogRef<FeedbackComponent>,
    /** Inject the required service function to prevent a circular dependency between the Component and the service */
    /* type is defined as any to prevent ng-packagr issues
     (data: any) => Observable<boolean> */
    @Inject(MAT_DIALOG_DATA) private _submitFeedback: any
  ) {
    this.formTitle = _submitFeedback.title;

    this.Form = fb.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      subject: [_submitFeedback.subject, Validators.required],
      message: [''],
      location: [_submitFeedback.location],
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
        this._sent = true;
        this._ref.close();
      });
    }
  }

  public ngOnDestroy(): void {
    if (this._sent) {
      sessionStorage.removeItem(FeedbackComponent.STORAGE_KEY_1);
      sessionStorage.removeItem(FeedbackComponent.STORAGE_KEY_2);
    } else if (!this.getLocation()) {
      sessionStorage.setItem(
        FeedbackComponent.STORAGE_KEY_1,
        JSON.stringify(this.Form.value)
      );
    } else {
      this.Form.patchValue({
        location: this._submitFeedback.location,
      });
      sessionStorage.setItem(
        FeedbackComponent.STORAGE_KEY_2,
        JSON.stringify(this.Form.value)
      );
    }
  }

  public ngOnInit(): void {
    console.log(this.Form.value['data']);
    const str_1 = sessionStorage.getItem(FeedbackComponent.STORAGE_KEY_1);
    const str_2 = sessionStorage.getItem(FeedbackComponent.STORAGE_KEY_2);
    if (!str_1 || !str_2) {
      return;
    }
    const obj_1 = JSON.parse(str_1);
    const obj_2 = JSON.parse(str_2);

    if (!this.getLocation()) {
      this.Form.setValue(obj_1);
    } else {
      this.Form.setValue(obj_2);
    }
  }

  public getLocation(): string {
    return this._submitFeedback.location;
  }
}
