import { SentryConfig } from './solid-skeleton-config';
import { init } from '@sentry/angular';

export const initSentry = (cfg?: SentryConfig) => {
  init({
    enabled: cfg !== undefined,
    dsn: cfg?.dsn,
    environment: cfg?.environment,
    //release: cfg?.version.default.semver.version,
    release: "2.4.0"
    integrations: [
      // new Integrations.BrowserTracing({
      //   tracingOrigins: ["localhost", "https://yourserver.io/api"],
      //   routingInstrumentation: Sentry.routingInstrumentation,
      // }),
    ],
  });
};
