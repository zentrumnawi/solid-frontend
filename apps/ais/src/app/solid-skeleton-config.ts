import { SolidSkeletonConfig } from '@zentrumnawi/solid-skeleton';
import { PrivacyComponent } from './privacy/privacy.component';
import { InfoPageContentComponent } from './info-page-content/info-page-content.component';

export const skeletonConfig: SolidSkeletonConfig = {
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
      title: 'Fundstücke',
      url: 'fundstuecke',
      name: 'profile',
      order: 3,
    },
    quiz: {
      svgIcon: 'quiz',
      url: 'selbsttest',
      name: 'quiz',
      order: 2,
    },
    // privacy: {
    //   component: PrivacyComponent,
    //   svgIcon: 'privacy',
    //   url: 'datenschutz',
    //   name: 'privacy',
    // },
    slideshow: {
      svgIcon: 'properties',
      title: 'Keramikwissen',
      url: 'keramikwissen',
      name: 'slideshow',
      order: 1,
    },
    info: {
      svgIcon: 'info_privacy',
      name: 'info',
    },
  },
};
