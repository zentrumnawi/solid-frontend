import { InjectionToken } from '@angular/core';
import * as MarkdownIt from 'markdown-it/lib';

export interface SolidCoreConfig {
  apiUrl: string;
  markdownPlugins?: ((md: MarkdownIt, ...params: any[]) => void)[];
  appName: string;
  appLogo?: string;
  glossaryLogo: string;
  feedbackLogo: string;
  production: boolean;
  error_report: boolean;
  guidedTour: any;
  profileTour: any;
  landingBannerContent: any;
  expandProfileTree: boolean;
  expandAllgemein: boolean;
}

export const SOLID_CORE_CONFIG = new InjectionToken<SolidCoreConfig>(
  'solid-core-config',
);
