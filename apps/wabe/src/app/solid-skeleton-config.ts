import { SolidSkeletonConfig } from '@zentrumnawi/solid-skeleton';
import { PrivacyComponent } from './privacy/privacy.component';
import { LandingBannerContentComponent } from './landing-banner-content/landing-banner-content.component';
import { InfoPageContentComponent } from './info-page-content/info-page-content.component';

export const skeletonConfig: SolidSkeletonConfig = {
  landingBannerContent: LandingBannerContentComponent,
  infoPageContent: InfoPageContentComponent,
  privacyContent: PrivacyComponent,
  routingConfig: {
    landing: {
      svgIcon: 'icon',
      name: 'landing',
      order: 0,
    },
    profile: {
      svgIcon: 'profile',
      title: 'Profile',
      url: 'profile',
      name: 'profile',
      order: 3,
    },
    quiz: {
      svgIcon: 'quiz',
      url: 'quiz',
      name: 'quiz',
      order: 2,
    },
    slideshow: {
      svgIcon: 'properties',
      title: 'Slideshow',
      url: 'slideshow',
      name: 'slideshow',
      order: 1,
    },
    info: {
      svgIcon: 'info_privacy',
      name: 'info',
    },
  },
};
