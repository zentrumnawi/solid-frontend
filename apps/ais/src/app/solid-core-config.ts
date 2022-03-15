import { SolidCoreConfig } from '@zentrumnawi/solid-core';
import { environment } from '../environments/environment';

export const coreConfig: SolidCoreConfig = {
  ...environment,
  markdownPlugins: [],
  appName: 'AIS',
  error_report: true,
};
