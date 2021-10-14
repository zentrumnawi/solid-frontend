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
      name: 'landing',
    },
    profile: {
      svgIcon: 'profile',
      url: 'steckbriefe',
      name: 'profile',
    },
    quiz: {
      svgIcon: 'quiz',
      url: 'selbsttest',
      name: 'quiz',
    },
    privacy: {
      component: PrivacyComponent,
      svgIcon: 'privacy',
      url: 'datenschutz',
      name: 'privacy',
    },
    slideshow: {
      svgIcon: 'properties',
      title: 'Keramikwissen',
      url: 'keramikwissen',
      name: 'slideshow',
    },
    info: {
      svgIcon: 'info',
      name: 'info',
    },
  },
};
