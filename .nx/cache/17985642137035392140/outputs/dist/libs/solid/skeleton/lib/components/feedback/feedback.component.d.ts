import { OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FeedbackService } from '../../services/feedback.service';
import * as i0 from '@angular/core';
export declare class FeedbackComponent implements OnInit, OnDestroy {
  feedback: FeedbackService;
  fb: UntypedFormBuilder;
  private _ref;
  private _dialog;
  /** Inject the required service function to prevent a circular dependency between the Component and the service */
  private _submitFeedback;
  private static STORAGE_KEY_1;
  private static STORAGE_KEY_2;
  private _sent;
  Form: UntypedFormGroup;
  formTitle: string;
  privacyChecked: boolean;
  constructor(
    feedback: FeedbackService,
    fb: UntypedFormBuilder,
    _ref: MatDialogRef<FeedbackComponent>,
    _dialog: MatDialog,
    /** Inject the required service function to prevent a circular dependency between the Component and the service */
    _submitFeedback: any
  );
  onCancelClick(): void;
  onOkClick(): void;
  ngOnDestroy(): void;
  ngOnInit(): void;
  getLocation(): string;
  onPrivacyClick(): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<FeedbackComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    FeedbackComponent,
    'solid-skeleton-feedback',
    never,
    {},
    {},
    never,
    never,
    false,
    never
  >;
}
