import { SolidCoreConfig } from '@zentrumnawi/solid-core';
import { environment } from '../environments/environment';
import guidedTour from '../assets/data/guidedTour.json';

export const coreConfig: SolidCoreConfig = {
  ...environment,
  markdownPlugins: [],
  appName: 'WABE',
  error_report: true,
  guidedTour: guidedTour.landing,
  profileTour: guidedTour.profile,
  glossaryLogo: 'assets/svg/glossary.svg',
  feedbackLogo: 'assets/svg/feedback.svg',
};
