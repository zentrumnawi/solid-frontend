import { SolidCoreConfig } from '@zentrumnawi/solid-core';
import { environment } from '../environments/environment';

export const coreConfig: SolidCoreConfig = {
  ...environment,
  markdownPlugins: [],
  appName: 'Div-e',
  error_report: true,
};
