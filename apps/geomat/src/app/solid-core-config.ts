import { overlinePlugin, SolidCoreConfig } from '@zentrumnawi/solid-core';
import { environment } from '../environments/environment';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as subscript from 'markdown-it-sub';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as superscript from 'markdown-it-sup';
import guidedTour from '../assets/data/guidedTour.json';
import landingContent from '../assets/data/landing-banner-content.json';

export const coreConfig: SolidCoreConfig = {
  ...environment,
  markdownPlugins: [subscript, superscript, overlinePlugin],
  appName: 'GeoMat',
  error_report: true,
  guidedTour: guidedTour.landing,
  profileTour: guidedTour.profile,
  glossaryLogo: 'assets/svg/glossary.svg',
  feedbackLogo: 'assets/svg/feedback.svg',
  landingContent: landingContent,
};
