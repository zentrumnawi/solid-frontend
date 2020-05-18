import { SolidSkeletonConfig } from '@zentrumnawi/solid-skeleton';
import { LandingBannerContentComponent } from './landing-banner-content/landing-banner-content.component';
import { PrivacyComponent } from './privacy/privacy.component';

export const skeletonConfig: SolidSkeletonConfig = {
  landingBannerContent: LandingBannerContentComponent,
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
  },
};
