import { version } from './version';
// copy from environment.staging.ts of AIS

export const environment = {
  preview: true,
  production: true,
  apiUrl: 'https://solid-backend.uni-frankfurt.de/geomat/staging',
  sentry: {
    dsn: 'https://6772dbe6a4bb42e88711f20924eefa8e@sentry.solidelearning.de/34',
    environment: 'geomat-staging',
    version: version as any,
    errorHandlerOptions: {
      showDialog: true,
      dialogOptions: {
        lang: 'de-DE',
      },
    },
  },
};
