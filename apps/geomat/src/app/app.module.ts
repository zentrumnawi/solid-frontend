import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { generateAppRoutes, SolidSkeletonConfig, SolidSkeletonModule } from '@zentrumnawi/solid/skeleton';
import { environment } from '../environments/environment';
import { overlinePlugin, SolidCoreModule, subscriptPlugin, superscriptPlugin } from '@zentrumnawi/solid/core';
import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrivacyComponent } from './privacy/privacy.component';
import { RouterModule } from '@angular/router';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

const skeletonConfig: SolidSkeletonConfig = {
  ...environment,
  markdownPlugins: [
    superscriptPlugin,
    subscriptPlugin,
    overlinePlugin
  ]
};

const routes = generateAppRoutes({
  privacy: { component: PrivacyComponent }
});

@NgModule({
  declarations: [
    AppComponent,
    PrivacyComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([], {
      developmentMode: !environment.production
    }),
    NgxsLoggerPluginModule.forRoot(),
    NgxsDispatchPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    SolidCoreModule,
    SolidSkeletonModule.forRoot(skeletonConfig),
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
