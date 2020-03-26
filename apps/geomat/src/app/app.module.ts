import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { generateAppRoutes, SolidSkeletonModule } from '@zentrumnawi/solid/skeleton';
import { environment } from '../environments/environment';
import { overlinePlugin, SolidCoreConfig, SolidCoreModule, subscriptPlugin, superscriptPlugin } from '@zentrumnawi/solid/core';
import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrivacyComponent } from './privacy/privacy.component';
import { RouterModule } from '@angular/router';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
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

const coreConfig: SolidCoreConfig = {
  ...environment,
  markdownPlugins: [
    superscriptPlugin,
    subscriptPlugin,
    overlinePlugin
  ]
};

const routes = generateAppRoutes({
  landing: { component: LandingComponent, svgIcon: 'icon' },
  info: { component: InfoComponent, svgIcon: 'info' },
  privacy: { component: PrivacyComponent },
  profile: { svgIcon: 'profile' },
  quiz: { svgIcon: 'quiz' },
  custom: [
    {
      url: 'system',
      title: 'Kristallsysteme',
      svgIcon: 'crystalsystem',
      order: 2,
      moduleImport: () => import('./crystalsystem/crystalsystem.module').then(m => m.CrystalsystemModule)
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
    NgxsLoggerPluginModule.forRoot(),
    NgxsDispatchPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    SolidCoreModule.forRoot(coreConfig),
    SolidSkeletonModule.forRoot({}),
    RouterModule.forRoot(routes),
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(registry: MatIconRegistry, url: DomSanitizer) {
    const addIcon = (name: string) => registry.addSvgIcon(name, url.bypassSecurityTrustResourceUrl(`/assets/svg/${name}.svg`));
    addIcon('icon');
    addIcon('assistant');
    addIcon('crystalsystem');
    addIcon('profile');
    addIcon('quiz');
    addIcon('info');
    addIcon('info2');
  }
}
