import { SolidSkeletonConfig } from '@zentrumnawi/solid-skeleton';
import { PrivacyComponent } from './privacy/privacy.component';
import { InfoPageContentComponent } from './info-page-content/info-page-content.component';

export const skeletonConfig: SolidSkeletonConfig = {
  infoPageContent: InfoPageContentComponent,
  privacyContent: PrivacyComponent,
  routingConfig: {
    landing: {
      svgIcon: 'icon',
    },
    profile: {
      svgIcon: 'profile',
      url: 'steckbriefe',
    },
    quiz: {
      svgIcon: 'quiz',
      url: 'selbsttest',
    },
    info: {
      svgIcon: 'info_privacy',
    },
    // privacy: {
    //   component: PrivacyComponent,
    //   svgIcon: 'privacy',
    //   url: 'datenschutz',
    // },
    slideshow: {
      title: 'Merkmale',
      url: 'merkmale',
      svgIcon: 'properties',
    },
  },
};
