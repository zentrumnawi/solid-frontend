import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'solid-skeleton-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit, OnDestroy {
  private static STORAGE_KEY = 'FEEDBACK';
  public Form: FormGroup;

  constructor(
    private _ref: MatDialogRef<FeedbackComponent>,
    /** Inject the required service function to prevent a circular dependency between the Component and the service */
    @Inject(MAT_DIALOG_DATA)
    private _submitFeedback: (data: any) => Observable<boolean>,
    fb: FormBuilder
  ) {
    this.Form = fb.group({
      username: [''],
      userEmail: ['', [Validators.required, Validators.email]],
      emailTitle: ['Feedback', Validators.required],
      emailContent: ['']
    });
  }

  public onCancelClick() {
    this._ref.close();
  }

  public onOkClick() {
    this._submitFeedback(this.Form.value).subscribe(res => {
      this._ref.close();
    });
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
