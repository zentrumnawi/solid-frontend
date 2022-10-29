import { version } from './version';

export const environment = {
  preview: false,
  production: true,
  apiUrl: 'https://solid-backend.uni-frankfurt.de/geomat/production',
  sentry: {
    dsn: 'https://6772dbe6a4bb42e88711f20924eefa8e@sentry.solidelearning.de/34',
    environment: 'geomat-production',
    version: version as any,
    errorHandlerOptions: {
      showDialog: true,
      dialogOptions: {
        lang: 'de-DE',
      },
    },
  },
};
