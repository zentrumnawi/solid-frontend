import { InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { FeedbackComponent } from '../components/feedback/feedback.component';
import { SolidCoreConfig } from '@zentrumnawi/solid-core';
import { catchError, map } from 'rxjs/operators';
import { InternalSolidSkeletonConfig } from '../solid-skeleton-config';
import { ThisReceiver } from '@angular/compiler';

export const SOLID_SKELETON_FEEDBACK_SERVICE =
  new InjectionToken<FeedbackService | null>('SOLID_SKELETON_FEEDBACK_SERVICE');

export function feedbackServiceFactory(
  http: HttpClient,
  dialog: MatDialog,
  coreConfig: SolidCoreConfig,
  skeletonConfig: InternalSolidSkeletonConfig
) {
  if (skeletonConfig.feedbackEnabled) {
    return new FeedbackService(http, dialog, coreConfig);
  }
  return null;
}

export class FeedbackService {
  /**
   * use this variable to save the value of the component's url 
   * 1. if the user open it from the toolbar => the url will be "menu"
   * 2. if the user open it from the sidebar(Menu) => the url will be the current's url 
   */
  private currentUrl : string = ""; 
  
  constructor(
    private _http: HttpClient,
    private _dialog: MatDialog,
    private _config: SolidCoreConfig
  ) {}

  public showDialog() {
    this._dialog.open(FeedbackComponent, {
      width: '80%',
      maxWidth: '600px',
      data: (data: any) => this.submitFeedback(data),
    });
  }

  private submitFeedback(value: any): Observable<boolean> {
    return this._http
      .post<unknown>(`${this._config.apiUrl}/contact`, value)
      .pipe(
        map((_) => true),
        catchError((err) => of(false))
      );
  }

  // using getter and setter to get/change the url from the components
  public getCurrentUrl() : string{
    return this.currentUrl;
  }

  public setCurrentUrl(url : string) {
    this.currentUrl = url;
  }
}
