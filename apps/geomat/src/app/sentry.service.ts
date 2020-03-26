import * as Sentry from '@sentry/browser';
import { ErrorHandler, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import * as version from '../environments/version.json';

if (environment.production) {
  Sentry.init({
    dsn: environment.sentry,
    release: !environment.preview && version.semver?.version || 'dev',
    beforeSend(event) {
      // Check if it is an exception, if so, show the report dialog
      if (event.exception) {
        Sentry.showReportDialog({
          lang: 'de'
        });
      }
      return event;
    }
  });
}

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {
  }

  handleError(error: any) {
    if (environment.production) {
      Sentry.captureException(error.originalError || error);
    }
    throw error;
  }
}
