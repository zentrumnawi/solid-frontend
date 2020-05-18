import { SolidSkeletonConfig } from '@zentrumnawi/solid-skeleton';
import { PrivacyComponent } from './privacy/privacy.component';
import { LandingBannerContentComponent } from './landing-banner-content/landing-banner-content.component';

// const routes = generateAppRoutes({
//   landing: { component: LandingComponent, svgIcon: 'icon' },
//   info: { component: InfoComponent, svgIcon: 'info' },
//   privacy: { component: PrivacyComponent },
//   profile: { svgIcon: 'profile' },
//   quiz: { svgIcon: 'quiz' },
//   slideshow: {
//     url: 'determination',
//     title: 'Bestimmungshelfer',
//     svgIcon: 'assistant'
//   },
//   custom: [
//     {
//       url: 'system',
//       title: 'Kristallsysteme',
//       svgIcon: 'crystalsystem',
//       order: 2,
//       moduleImport: () =>
//         import('./crystalsystem/crystalsystem.module').then(
//           m => m.CrystalsystemModule
//         )
//     }
//   ]
// });

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
