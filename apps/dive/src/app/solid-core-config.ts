import { SolidCoreConfig } from '@zentrumnawi/solid-core';
import { environment } from '../environments/environment';
import guidedTour from 'apps/dive/src/assets/data/guidedTour.json';

export const coreConfig: SolidCoreConfig = {
  ...environment,
  markdownPlugins: [],
  appName: 'Div-e',
  error_report: true,
  guidedTour: guidedTour.steps,
};
