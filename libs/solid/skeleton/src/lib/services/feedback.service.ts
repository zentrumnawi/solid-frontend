import { InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { FeedbackComponent } from '../components/feedback/feedback.component';
import { SolidCoreConfig } from '@zentrumnawi/solid/core';
import { catchError, map } from 'rxjs/operators';

export const SOLID_SKELETON_FEEDBACK_SERVICE = new InjectionToken<FeedbackService | null>(
  'SOLID_SKELETON_FEEDBACK_SERVICE'
);

export function feedbackServiceFactory(enabled: boolean | undefined) {
  return function(
    http: HttpClient,
    dialog: MatDialog,
    coreConfig: SolidCoreConfig
  ) {
    if (enabled !== undefined && !enabled) {
      return null;
    }
    return new FeedbackService(http, dialog, coreConfig);
  };
}

export class FeedbackService {
  constructor(
    private _http: HttpClient,
    private _dialog: MatDialog,
    private _config: SolidCoreConfig
  ) {}

  public showDialog() {
    this._dialog.open(FeedbackComponent, {
      width: '80%',
      maxWidth: '600px',
      data: (data: any) => this.submitFeedback(data)
    });
  }

  private submitFeedback(value: any): Observable<boolean> {
    return this._http
      .post<{}>(`${this._config.newApiUrl}/api/contact`, value)
      .pipe(
        map(_ => true),
        catchError(err => of(false))
      );
  }
}
