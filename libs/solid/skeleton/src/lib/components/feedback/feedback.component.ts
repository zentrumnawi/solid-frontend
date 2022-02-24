import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FeedbackService,
  SOLID_SKELETON_FEEDBACK_SERVICE,
} from '../../services/feedback.service';
import { Router } from '@angular/router';

@Component({
  selector: 'solid-skeleton-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit, OnDestroy {
  private static STORAGE_KEY = 'FEEDBACK';
  private title : string = "";
  public Form: FormGroup; // "strictPropertyInitialization": false in tsconfig.base.json so that we don't have to initialize the value 

  constructor(
    private _router : Router,

    @Inject(SOLID_SKELETON_FEEDBACK_SERVICE) // prevent a circular dependency ???
    public feedback: FeedbackService,
    public fb: FormBuilder,
    private _ref: MatDialogRef<FeedbackComponent>,
    /** Inject the required service function to prevent a circular dependency between the Component and the service */
    /* type is defined as any to prevent ng-packagr issues
     (data: any) => Observable<boolean> */
    @Inject(MAT_DIALOG_DATA)
    private _submitFeedback: any
  ) { 
    /**
      this.Form = fb.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: [''],
    });
    */
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
    /** 
    sessionStorage.setItem(
      FeedbackComponent.STORAGE_KEY,
      JSON.stringify(this.Form.value)
    );
    */
    // why do we need this step ?
  }

  public ngOnInit(): void {
    var betreff;
    if(this.feedback.getCurrentUrl() === "menu") {
      this.title = "Fehler melden";
      betreff = "Fehlermeldung";
    } else {
      this.title = "Kontakt und Feedback";
      betreff = "Feedback";
    }
    
    // set the value of the form after getting the needed information
    this.Form = this.fb.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      subject: [betreff, Validators.required],
      message: [''],
    });
    
    const str = sessionStorage.getItem(FeedbackComponent.STORAGE_KEY);
    if (!str) {
      return;
    }
    const obj = JSON.parse(str);
    this.Form.setValue(obj);
  
  }

  public getTitle() : string {
    return this.title;
  }
}
