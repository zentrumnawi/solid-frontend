import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-feedback-dialog',
  templateUrl: './feedback-dialog.component.html',
  styleUrls: ['./feedback-dialog.component.scss']
})
export class FeedbackDialogComponent implements OnInit, OnDestroy {
  private static STORAGE_KEY = 'FEEDBACK';
  public Form: FormGroup;

  constructor(
    private _ref: MatDialogRef<FeedbackDialogComponent>,
    /** Inject the required service function to prevent a circular dependency between the Component and the service */
    @Inject(MAT_DIALOG_DATA) private _submitFeedback: (data: any) => Observable<boolean>,
    fb: FormBuilder,
  ) {
    this.Form = fb.group({
      username: [''],
      userEmail: ['', [Validators.required, Validators.email]],
      emailTitle: ['Feedback', Validators.required],
      emailContent: [''],
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
    sessionStorage.setItem(FeedbackDialogComponent.STORAGE_KEY, JSON.stringify(this.Form.value));
  }

  public ngOnInit(): void {
    const str = sessionStorage.getItem(FeedbackDialogComponent.STORAGE_KEY);
    if (!str) { return; }
    const obj = JSON.parse(str);
    this.Form.setValue(obj);
  }
}
