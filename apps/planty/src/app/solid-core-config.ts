import { SolidCoreConfig } from '@zentrumnawi/solid-core';
import { environment } from '../environments/environment';
import guidedTour from '../assets/data/guidedTour.json';

export const coreConfig: SolidCoreConfig = {
  ...environment,
  markdownPlugins: [],
  appName: 'PLANTY2Learn',
  appLogo: 'assets/info/HGU_Signet.svg',
  error_report: true,
  guidedTour: guidedTour.landing,
  profileTour: guidedTour.profile,
  profileLocation: JSON.stringify(guidedTour.location[0].url),
};
