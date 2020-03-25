import {MatDialog} from '@angular/material/dialog';
import {FeedbackDialogComponent} from '../components/feedback-overlay/feedback-dialog.component';
import {TitleService} from './title.service';
import {ApiHttpClient} from '../shared/abstract/api-http-client';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class FeedbackService extends ApiHttpClient {
  constructor(
    private _dialog: MatDialog,
    private _title: TitleService,
    http: HttpClient,
  ) {
    super(http, ['api', 'feedback']);
  }

  public showFeedbackDialog() {
    const dialogRef = this._dialog.open(FeedbackDialogComponent, {
      width: '80%',
      maxWidth: '600px',
      data: (data: any) => this.submitFeedback(data),
    });

    this._title.setDialogTitle(dialogRef, 'Feedback');
  }

  private submitFeedback(value: any): Observable<boolean> {
    return this.post<boolean>(value);
  }
}
