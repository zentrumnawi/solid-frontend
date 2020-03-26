import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SOLID_CORE_CONFIG, SolidCoreModule } from '@zentrumnawi/solid/core';
import { BaseLayoutComponent } from './components/base-layout/base-layout.component';
import { SolidGlossaryModule } from '@zentrumnawi/solid/glossary';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { MatListModule } from '@angular/material/list';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { feedbackServiceFactory, SOLID_SKELETON_FEEDBACK_SERVICE } from './services/feedback.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SolidSkeletonConfig } from './solid-skeleton-config';

const hidden = Math.random() < 0.1;

@NgModule({
  imports: [
    CommonModule,
    SolidCoreModule,
    SolidGlossaryModule,
    RouterModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule
  ],
  declarations: [
    BaseLayoutComponent,
    FeedbackComponent,
    MainMenuComponent
  ],
  exports: [
    BaseLayoutComponent
  ]
})
export class SolidSkeletonModule {
  static isLandingHiddenEnabled = hidden;

  constructor(registry: MatIconRegistry, url: DomSanitizer) {
    const addIcon = (name: string) => registry.addSvgIcon(name, url.bypassSecurityTrustResourceUrl(`/assets/svg/${name}.svg`));
    addIcon('glossary');
    addIcon('privacy');
    addIcon('feedback');
  }

  public static forRoot(cfg: SolidSkeletonConfig): ModuleWithProviders<SolidSkeletonModule> {
    return {
      ngModule: SolidSkeletonModule,
      providers: [
        {
          provide: SOLID_SKELETON_FEEDBACK_SERVICE,
          useFactory: feedbackServiceFactory(cfg.feedbackEnabled),
          deps: [HttpClient, MatDialog, SOLID_CORE_CONFIG]
        }
      ]
    };
  }
}
