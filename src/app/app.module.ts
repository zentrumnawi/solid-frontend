import {ErrorHandler, Injectable, InjectionToken, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {ActionReducerMap, StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {GlossaryComponent} from './components/glossary/glossary.component';
import {InfoComponent} from './components/info/info.component';
import {MainmenuComponent} from './components/mainmenu/mainmenu.component';
import {PrivacyComponent} from './components/privacy/privacy.component';
import {GlossaryService} from './services/glossary.service';
import {TitleService} from './services/title.service';
import {SharedModule} from './shared/shared.module';
import {AppState, reducers} from './state/app.model';
import { FeedbackDialogComponent } from './components/feedback-overlay/feedback-dialog.component';
import {FeedbackService} from "./services/feedback.service";
import {SentryErrorHandler} from "./services/sentry.service";
import {RouteReuseStrategy} from "@angular/router";
import {CustomRouteReuseStrategy} from "./CustomRouteReuseStrategy";

export const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<AppState>>('Registered reducers');

export function getReducers() {
  return reducers;
}

@NgModule({
  declarations: [
    AppComponent,
    GlossaryComponent,
    MainmenuComponent,
    InfoComponent,
    PrivacyComponent,
    FeedbackDialogComponent,
  ],
  entryComponents: [
    FeedbackDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule.forRoot(),
    BrowserAnimationsModule,
    StoreModule.forRoot(REDUCER_TOKEN),
    StoreDevtoolsModule.instrument({
      maxAge: 50,
      logOnly: environment.production,
    }),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [
    GlossaryService,
    TitleService,
    FeedbackService,
    {
      provide: REDUCER_TOKEN,
      useFactory: getReducers,
    },
    {
      provide: ErrorHandler,
      useClass: SentryErrorHandler
    },
    { provide: RouteReuseStrategy,
      useClass: CustomRouteReuseStrategy,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
