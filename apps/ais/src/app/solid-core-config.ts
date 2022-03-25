import { SolidCoreConfig } from '@zentrumnawi/solid-core';
import { environment } from '../environments/environment';
import guidedTour from '../assets/data/guidedTour.json';

export const coreConfig: SolidCoreConfig = {
  ...environment,
  markdownPlugins: [],
  appName: 'AIS',
  error_report: true,
  guidedTour: guidedTour.landing,
  profileTour: guidedTour.profile,
};
