import { SolidCoreConfig } from '@zentrumnawi/solid-core';
import { environment } from '../environments/environment';
import guidedTour from '../assets/data/guidedTour.json';
import landingBannerContent from '../assets/data/landing-banner-content.json';

export const coreConfig: SolidCoreConfig = {
  ...environment,
  markdownPlugins: [],
  appName: 'PLANTY2Learn',
  appLogo: 'assets/info/HGU_Signet.svg',
  glossaryLogo: 'assets/svg/glossary2.svg',
  feedbackLogo: 'assets/svg/contact.svg',
  error_report: true,
  guidedTour: guidedTour.landing,
  profileTour: guidedTour.profile,
  landingBannerContent: landingBannerContent,
  expandProfileTree: false,
};
