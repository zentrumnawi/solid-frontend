import { SolidSkeletonConfig } from '@zentrumnawi/solid-skeleton';
import { PrivacyComponent } from './privacy/privacy.component';
import { InfoPageContentComponent } from './info-page-content/info-page-content.component';
import { environment } from '../environments/environment';

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
    slideshow: {
      svgIcon: 'slideshow',
      title: 'Slideshows',
      url: 'slideshows',
    },
    info: {
      svgIcon: 'info_privacy',
    },
    // privacy: {
    //   component: PrivacyComponent,
    //   svgIcon: 'privacy',
    //   url: 'datenschutz',
    // },
    custom: [
      {
        enabled: true,
        showOnLandingPage: true,
        showInMenu: true,
        url: 'crystalsystem',
        title: 'Kristallsysteme',
        order: 3,
        svgIcon: 'crystalsystem',
        moduleImport: () =>
          import('./crystalsystem/crystalsystem.module').then(
            (m) => m.CrystalsystemModule
          ),
      },
    ],
  },
  sentry: environment.sentry,
};
