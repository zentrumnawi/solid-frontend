import * as Sentry from '@sentry/browser';
import {ErrorHandler, Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
const version = require('../../environments/version.json');

if (environment.production) {
  Sentry.init({ dsn: 'https://5485ad7838ed4a118308f88c5f4650e1@po-sentry.physikelearning.de/7', release: version.hash });
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
