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
      title: 'Grundwortschatz',
      url: 'grundwortschatz',
      name: 'profile',
      order: 1,
    },
    quiz: {
      svgIcon: 'quiz',
      title: 'Selbsttest',
      url: 'selbsttest',
      name: 'quiz',
      order: 2,
    },
    slideshow: {
      svgIcon: 'properties',
      title: 'Methoden & Literatur',
      url: 'methoden',
      name: 'slideshow',
      order: 3,
    },
    info: {
      svgIcon: 'info_privacy',
      name: 'info',
    },
  },
};
