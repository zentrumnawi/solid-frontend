import * as Sentry from '@sentry/browser';
import {ErrorHandler, Injectable} from "@angular/core";
import {environment} from "../../environments/environment";

if (environment.production) {
  const version = require('../../environments/version.json');
  Sentry.init({
    dsn: environment.sentryUrl,
    release: version.hash,
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
  constructor() {}
  handleError(error: any) {
    if (environment.production) {
      Sentry.captureException(error.originalError || error);
    }
    throw error;
  }
}
