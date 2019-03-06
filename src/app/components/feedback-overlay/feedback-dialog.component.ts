import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-feedback-dialog',
  templateUrl: './feedback-dialog.component.html',
  styleUrls: ['./feedback-dialog.component.scss']
})
export class FeedbackDialogComponent {
  public Form: FormGroup;

  constructor(
    private _ref: MatDialogRef<FeedbackDialogComponent>,
    /** Inject the required service function to prevent a circular dependency between the Component and the service */
    @Inject(MAT_DIALOG_DATA) private _submitFeedback: (data: any) => Observable<boolean>,
    fb: FormBuilder,
  ) {
    this.Form = fb.group({
      username: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.email]],
      emailTitle: ['', Validators.required],
      emailContent: ['', Validators.required],
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
}
