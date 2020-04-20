import {
  BrowserModule,
  DomSanitizer,
  HAMMER_GESTURE_CONFIG,
  HammerGestureConfig
} from '@angular/platform-browser';
import { ErrorHandler, Injectable, NgModule } from '@angular/core';

import {
  generateAppRoutes, SolidSkeletonConfig,
  SolidSkeletonModule
} from '@zentrumnawi/solid/skeleton';
import { environment } from '../environments/environment';
import {
  overlinePlugin,
  SolidCoreConfig,
  SolidCoreModule,
  subscriptPlugin,
  superscriptPlugin
} from '@zentrumnawi/solid/core';
import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrivacyComponent } from './privacy/privacy.component';
import { RouterModule } from '@angular/router';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { LandingComponent } from './landing/landing.component';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { InfoComponent } from './info/info.component';
import { SentryErrorHandler } from './sentry.service';
import { ServiceWorkerModule } from '@angular/service-worker';

const coreConfig: SolidCoreConfig = {
  ...environment,
  markdownPlugins: [superscriptPlugin, subscriptPlugin, overlinePlugin],
  appName: 'GeoMat',
};

const skeletonConfig: SolidSkeletonConfig = {
  feedbackEnabled: true,
};

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
  overrides = {
    pan: {
      direction: 6
    },
    pinch: { enable: false },
    rotate: { enable: false }
  };
}

const routes = generateAppRoutes({
  landing: { component: LandingComponent, svgIcon: 'icon' },
  info: { component: InfoComponent, svgIcon: 'info' },
  privacy: { component: PrivacyComponent },
  profile: { svgIcon: 'profile' },
  quiz: { svgIcon: 'quiz' },
  slideshow: {
    url: 'determination',
    title: 'Bestimmungshelfer',
    svgIcon: 'assistant'
  },
  custom: [
    {
      url: 'system',
      title: 'Kristallsysteme',
      svgIcon: 'crystalsystem',
      order: 2,
      moduleImport: () =>
        import('./crystalsystem/crystalsystem.module').then(
          m => m.CrystalsystemModule
        )
    }
  ]
});

@NgModule({
  declarations: [
    AppComponent,
    PrivacyComponent,
    LandingComponent,
    InfoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([], {
      developmentMode: !environment.production
    }),
    // NgxsLoggerPluginModule.forRoot({
    //   disabled: environment.production
    // }),
    NgxsDispatchPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),
    SolidCoreModule.forRoot(coreConfig),
    SolidSkeletonModule.forRoot(skeletonConfig),
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }),
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatListModule
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: SentryErrorHandler
    },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(registry: MatIconRegistry, url: DomSanitizer) {
    const addIcon = (name: string) =>
      registry.addSvgIcon(
        name,
        url.bypassSecurityTrustResourceUrl(`/assets/svg/${name}.svg`)
      );
    addIcon('icon');
    addIcon('assistant');
    addIcon('crystalsystem');
    addIcon('profile');
    addIcon('quiz');
    addIcon('info');
    addIcon('info2');
  }
}
