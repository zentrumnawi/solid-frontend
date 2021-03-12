import { SolidSkeletonConfig } from '@zentrumnawi/solid-skeleton';
import { PrivacyComponent } from './privacy/privacy.component';
import { LandingBannerContentComponent } from './landing-banner-content/landing-banner-content.component';
import { InfoPageContentComponent } from './info-page-content/info-page-content.component';

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
    privacy: {
      component: PrivacyComponent,
      svgIcon: 'privacy',
    },
    slideshow: {
      svgIcon: 'properties',
      title: 'Merkmale',
    },
    info: {
      svgIcon: 'info',
    },
  },
};
