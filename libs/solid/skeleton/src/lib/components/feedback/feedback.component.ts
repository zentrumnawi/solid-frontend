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
  public formTitle: string;
  public subject: string;
  public message: string;

  constructor(
    public fb: FormBuilder,
    private _ref: MatDialogRef<FeedbackComponent>,
    /** Inject the required service function to prevent a circular dependency between the Component and the service */
    /* type is defined as any to prevent ng-packagr issues
     (data: any) => Observable<boolean> */
    @Inject(MAT_DIALOG_DATA) private _submitFeedback: any
  ) {
    if (this._ref.id == 'feedback') {
      this.subject = 'Feedback';
      this.formTitle = 'Kontakt und Feedback';
      this.message = '';
    } else {
      this.subject = 'Fehler melden';
      this.formTitle = 'Fehler melden';
      this.message = 'Fehler gefunden in: ' + this._ref.id + '\n\n';
    }

    this.Form = fb.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      subject: [this.subject, Validators.required],
      message: [this.message],
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
    obj.subject = this.subject;
    obj.message = this.message;
    console.log(obj);
    this.Form.setValue(obj);
  }
}
