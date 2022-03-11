import {
  BrowserModule,
  DomSanitizer,
  HAMMER_GESTURE_CONFIG,
  HammerGestureConfig,
  HammerModule,
} from '@angular/platform-browser';
import { Injectable, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { SolidCoreModule } from '@zentrumnawi/solid-core';
import { SolidSkeletonModule } from '@zentrumnawi/solid-skeleton';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { PrivacyComponent } from './privacy/privacy.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { LandingBannerContentComponent } from './landing-banner-content/landing-banner-content.component';
import { SOLID_PROFILE_TITLE_FORMATTER } from '@zentrumnawi/solid-profile/di';
import { coreConfig } from './solid-core-config';
import { skeletonConfig } from './solid-skeleton-config';
import { InfoPageContentComponent } from './info-page-content/info-page-content.component';

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
  overrides = {
    pan: {
      direction: 6,
    },
    pinch: { enable: false },
    rotate: { enable: false },
    swipe: { direction: Hammer.DIRECTION_HORIZONTAL },
  };
}

const regexp = /^([^(]*)(.*)/i;
function profileTitleFormatter(title: string): string {
  const match = title.match(regexp) || [];
  if (match.length !== 3) {
    throw new Error(
      `Failed to transform the profile title "${title}" with the supplied profile formatter`
    );
  }
  return `<i>${match[1]}</i>${match[2]}`;
}

@NgModule({
  declarations: [
    AppComponent,
    PrivacyComponent,
    LandingBannerContentComponent,
    InfoPageContentComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([], {
      developmentMode: !environment.production,
    }),
    NgxsDispatchPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production,
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    SolidCoreModule.forRoot(coreConfig),
    SolidSkeletonModule.forRoot(skeletonConfig),
    RouterModule.forRoot([], {
      onSameUrlNavigation: 'reload',
      relativeLinkResolution: 'legacy',
    }),
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    HammerModule,
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    },
    {
      provide: SOLID_PROFILE_TITLE_FORMATTER,
      useValue: profileTitleFormatter,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(registry: MatIconRegistry, url: DomSanitizer) {
    const addIcon = (name: string) =>
      registry.addSvgIcon(
        name,
        url.bypassSecurityTrustResourceUrl(`assets/svg/${name}.svg`)
      );
    addIcon('quiz');
    addIcon('profile');
    addIcon('icon');
    addIcon('info');
    addIcon('privacy');
    addIcon('info_privacy');
    addIcon('glossary');
    addIcon('feedback');
    addIcon('feedback_outline');
    addIcon('slideshow');
  }
}
