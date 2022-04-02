import { ErrorHandler, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SOLID_CORE_CONFIG, SolidCoreModule } from '@zentrumnawi/solid-core';
import { BaseLayoutComponent } from './components/base-layout/base-layout.component';
import { SolidGlossaryModule } from '@zentrumnawi/solid-glossary';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, ROUTES } from '@angular/router';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { MatListModule } from '@angular/material/list';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  feedbackServiceFactory,
  SOLID_SKELETON_FEEDBACK_SERVICE,
} from './services/feedback.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {
  defaultSkeletonConfig,
  InternalSolidSkeletonConfig,
  SentryConfig,
  SOLID_SKELETON_CONFIG,
  SolidSkeletonConfig,
} from './solid-skeleton-config';
import { UpdateService } from './services/update.service';
import { UpdateDialogComponent } from './components/update-dialog/update-dialog.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { LandingComponent } from './components/landing/landing.component';
import { MatCardModule } from '@angular/material/card';
import { NgxsModule } from '@ngxs/store';
import { MenuState } from './state/menu.state';
import { generateRoutes } from './skeleton-routing';
import { createErrorHandler } from '@sentry/angular';
import { InfoComponent } from './components/info/info.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MessageState } from './state/message.state';
import { MessageListComponent } from './components/message-list/message-list.component';
import { SOLID_PROFILE_BASE_URL } from '@zentrumnawi/solid-profile';
import { SOLID_SLIDESHOW_APP_ROUTING_CONFIG } from '@zentrumnawi/solid-slideshow';
import { MatExpansionModule } from '@angular/material/expansion';
import { deepMerge } from './utils/deep-merge';

// This workaround is required for the "old" angular compiler in production mode. Ivy library publishing is not supported until angular 10.
// https://github.com/ng-packagr/ng-packagr/issues/767
export const ngxsFeatureModule = NgxsModule.forFeature([
  MenuState,
  MessageState,
]);

export function configFactory(
  cfg: SolidSkeletonConfig
): () => () => InternalSolidSkeletonConfig {
  const fn = function () {
    return deepMerge(defaultSkeletonConfig, cfg);
  };
  return fn;
}

export function routingFactory(cfg: InternalSolidSkeletonConfig) {
  return generateRoutes(cfg.routingConfig);
}

@NgModule({
  imports: [
    CommonModule,
    SolidCoreModule,
    SolidGlossaryModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatSidenavModule,
    MatTabsModule,
    MatToolbarModule,
    ngxsFeatureModule,
    MatExpansionModule,
  ],
  declarations: [
    BaseLayoutComponent,
    FeedbackComponent,
    MainMenuComponent,
    UpdateDialogComponent,
    LandingComponent,
    InfoComponent,
    MessageListComponent,
  ],
  exports: [BaseLayoutComponent],
  providers: [UpdateService],
})
export class SolidSkeletonModule {
  public static forRoot(
    cfg: SolidSkeletonConfig
  ): ModuleWithProviders<SolidSkeletonModule> {
    const errHandler = createErrorHandler(cfg.sentry?.errorHandlerOptions);
    return {
      ngModule: SolidSkeletonModule,
      providers: [
        {
          provide: SOLID_SKELETON_CONFIG,
          useFactory: configFactory(cfg),
        },
        {
          provide: SOLID_SKELETON_FEEDBACK_SERVICE,
          useFactory: feedbackServiceFactory,
          deps: [
            HttpClient,
            MatDialog,
            SOLID_CORE_CONFIG,
            SOLID_SKELETON_CONFIG,
          ],
        },
        {
          provide: ROUTES,
          useFactory: routingFactory,
          deps: [SOLID_SKELETON_CONFIG],
          multi: true,
        },
        {
          provide: ErrorHandler,
          useValue: createErrorHandler(cfg.sentry?.errorHandlerOptions),
        },
        {
          provide: SOLID_PROFILE_BASE_URL,
          useValue: cfg.routingConfig.profile?.url ?? 'profile',
        },
        {
          provide: SOLID_SLIDESHOW_APP_ROUTING_CONFIG,
          useValue: cfg.routingConfig.slideshow,
        },
      ],
    };
  }
}
