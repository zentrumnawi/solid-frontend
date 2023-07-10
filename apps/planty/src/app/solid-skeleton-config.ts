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
      url: 'profiles',
    },
    quiz: {
      svgIcon: 'quiz',
      url: 'selbsttest',
    },
    info: {
      svgIcon: 'info_news',
      title: 'Info | News',
      url: 'info',
    },
    slideshow: {
      svgIcon: 'slideshow',
      title: 'Wissensgalerie',
      url: 'wissensgalerie',
    },
  },
};
