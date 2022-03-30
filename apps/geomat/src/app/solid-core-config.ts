import { overlinePlugin, SolidCoreConfig } from '@zentrumnawi/solid-core';
import { environment } from '../environments/environment';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as subscript from 'markdown-it-sub';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as superscript from 'markdown-it-sup';
import guidedTour from '../assets/data/guidedTour.json';

export const coreConfig: SolidCoreConfig = {
  ...environment,
  markdownPlugins: [subscript, superscript, overlinePlugin],
  appName: 'GeoMat',
  error_report: true,
  guidedTour: guidedTour.landing.steps,
  profileTour: guidedTour.profile.steps,
  profileTourLocation: guidedTour.profile.location,
};
