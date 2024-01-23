import { InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { FeedbackComponent } from '../components/feedback/feedback.component';
import { SolidCoreConfig } from '@zentrumnawi/solid-core';
import { catchError, map } from 'rxjs/operators';
import { InternalSolidSkeletonConfig } from '../solid-skeleton-config';

export const SOLID_SKELETON_FEEDBACK_SERVICE =
  new InjectionToken<FeedbackService | null>('SOLID_SKELETON_FEEDBACK_SERVICE');

export function feedbackServiceFactory(
  http: HttpClient,
  dialog: MatDialog,
  coreConfig: SolidCoreConfig,
  skeletonConfig: InternalSolidSkeletonConfig,
) {
  if (skeletonConfig.feedbackEnabled) {
    return new FeedbackService(http, dialog, coreConfig);
  }
  return null;
}

export class FeedbackService {
  constructor(
    private _http: HttpClient,
    private _dialog: MatDialog,
    private _config: SolidCoreConfig,
  ) {}

  public showDialog(location?: string, title?: string) {
    const dialogConfig = new MatDialogConfig();
    const report = title == '' ? 'Fehler melden' : 'Fehler melden - ' + title;
    dialogConfig.data = {
      location: location,
      title: location ? 'Fehler melden' : 'Kontakt und Feedback',
      subject: location ? report : 'Feedback',
    };
    this._dialog.open(FeedbackComponent, {
      data: dialogConfig.data,
      maxWidth: '600px',
      panelClass: location ? 'report-dialog' : 'feedback-dialog',
    });
  }

  public submitFeedback(value: unknown): Observable<boolean> {
    return this._http
      .post<unknown>(`${this._config.apiUrl}/contact`, value)
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }
}
