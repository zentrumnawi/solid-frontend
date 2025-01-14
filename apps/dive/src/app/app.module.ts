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
    swipe: { enable: true, direction: Hammer.DIRECTION_HORIZONTAL },
  };
}

@NgModule({
  declarations: [AppComponent, PrivacyComponent, InfoPageContentComponent],
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
    addIcon('glossary_generic');
    addIcon('info');
    addIcon('privacy');
    addIcon('info_privacy');
    addIcon('feedback');
    addIcon('feedback_outline');
    addIcon('properties');
    addIcon('semicorrect');
  }
}
