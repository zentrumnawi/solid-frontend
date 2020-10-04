import * as version from './version.json';

export const environment = {
  preview: true,
  production: true,
  apiUrl: 'https://dive-backend-staging.physikelearning.de',
  newApiUrl: 'https://dive-backend-staging.physikelearning.de',
  sentry: {
    dsn:
      'https://6772dbe6a4bb42e88711f20924eefa8e@po-sentry.physikelearning.de/34',
    environment: 'dive-staging',
    version: version as any,
    errorHandlerOptions: {
      showDialog: true,
      dialogOptions: {
        lang: 'de-DE',
      },
    },
  },
};
