import { ErrorHandler, Injectable, NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer, HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlossaryComponent } from './components/glossary/glossary.component';
import { InfoComponent } from './components/info/info.component';
import { MainmenuComponent } from './components/mainmenu/mainmenu.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { GlossaryService } from './services/glossary.service';
import { TitleService } from './services/title.service';
import { SharedModule } from './shared/shared.module';
import { FeedbackDialogComponent } from './components/feedback-overlay/feedback-dialog.component';
import { FeedbackService } from './services/feedback.service';
import { SentryErrorHandler } from './services/sentry.service';
import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteReuseStrategy } from './custom-route-reuse-strategy';
import { NgxsModule } from '@ngxs/store';
import { GlossaryState } from './state/glossary.state';
import { NgxsRouterPluginModule, RouterStateSerializer } from '@ngxs/router-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { CustomRouterStateSerializer } from './custom-router-state-serializer';
import { MatIconRegistry } from '@angular/material/icon';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { SolidCoreModule } from '@zentrumnawi/solid/core';

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
  overrides = {
    pan: {
      direction: 6
    },
    'pinch': { enable: false },
    'rotate': { enable: false }
  };
}

@NgModule({
  declarations: [
    AppComponent,
    GlossaryComponent,
    MainmenuComponent,
    InfoComponent,
    PrivacyComponent,
    FeedbackDialogComponent,
    LandingPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SolidCoreModule.forRoot({
      apiUrl: environment.apiUrl
    }),
    SharedModule.forRoot(),
    BrowserAnimationsModule,
    NgxsModule.forRoot([
        GlossaryState
      ],
      {
        developmentMode: !environment.production
      }),
    NgxsLoggerPluginModule.forRoot({
      disabled: environment.production,
      collapsed: true,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production
    }),
    NgxsRouterPluginModule.forRoot(),
    NgxsDispatchPluginModule.forRoot(),
    MatGridListModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
  ],
  providers: [
    GlossaryService,
    TitleService,
    FeedbackService,
    {
      provide: ErrorHandler,
      useClass: SentryErrorHandler
    },
    {
      provide: RouteReuseStrategy,
      useClass: CustomRouteReuseStrategy,
    },
    {
      provide: RouterStateSerializer,
      useClass: CustomRouterStateSerializer
    },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(registry: MatIconRegistry, url: DomSanitizer) {
    const addIcon = (name: string) => registry.addSvgIcon(name, url.bypassSecurityTrustResourceUrl(`/assets/svg/${name}.svg`));
    addIcon('assistant');
    addIcon('camera');
    addIcon('crystalsystem');
    addIcon('feedback');
    addIcon('gallery');
    addIcon('glossary');
    addIcon('icon');
    addIcon('info');
    addIcon('info2');
    addIcon('privacy');
    addIcon('profile');
    addIcon('quiz');
    addIcon('search');
  }
}
