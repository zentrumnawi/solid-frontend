import { SolidCoreConfig } from '@zentrumnawi/solid-core';
import { environment } from '../environments/environment';
import guidedTour from '../assets/data/guidedTour.json';
import landingContent from '../assets/data/landing-banner-content.json';

export const coreConfig: SolidCoreConfig = {
  ...environment,
  markdownPlugins: [],
  appName: 'Div-e',
  error_report: true,
  guidedTour: guidedTour.landing,
  profileTour: guidedTour.profile,
  glossaryLogo: 'assets/svg/glossary.svg',
  feedbackLogo: 'assets/svg/feedback.svg',
  landingContent: landingContent,
};
