import { InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { SolidCoreConfig } from '@zentrumnawi/solid-core';
import { InternalSolidSkeletonConfig } from '../solid-skeleton-config';
export declare const SOLID_SKELETON_FEEDBACK_SERVICE: InjectionToken<FeedbackService | null>;
export declare function feedbackServiceFactory(
  http: HttpClient,
  dialog: MatDialog,
  coreConfig: SolidCoreConfig,
  skeletonConfig: InternalSolidSkeletonConfig
): FeedbackService | null;
export declare class FeedbackService {
  private _http;
  private _dialog;
  private _config;
  constructor(_http: HttpClient, _dialog: MatDialog, _config: SolidCoreConfig);
  showDialog(location?: string, title?: string): void;
  submitFeedback(value: any): Observable<boolean>;
}
