import { SolidSkeletonConfig } from '@zentrumnawi/solid-skeleton';
import { LandingBannerContentComponent } from './landing-banner-content/landing-banner-content.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { InfoPageContentComponent } from './info-page-content/info-page-content.component';
import { environment } from '../environments/environment';

export const skeletonConfig: SolidSkeletonConfig = {
  landingBannerContent: LandingBannerContentComponent,
  infoPageContent: InfoPageContentComponent,
  routingConfig: {
    landing: {
      svgIcon: 'icon',
    },
    profile: {
      svgIcon: 'profile',
    },
    quiz: {
      svgIcon: 'quiz',
    },
    slideshow: {
      svgIcon: 'assistant',
    },
    info: {},
    privacy: {
      component: PrivacyComponent,
      svgIcon: 'privacy',
    },
  },
  sentry: environment.sentry,
};
