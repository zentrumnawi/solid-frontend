import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarkdownService } from './services/markdown.service';
import { HttpClientModule } from '@angular/common/http';
import { SOLID_CORE_CONFIG, SolidCoreConfig } from './solid-core-config';
import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteReuseStrategy } from './custom-route-reuse-strategy';
import { RouterStateSerializer } from '@ngxs/router-plugin';
import { CustomRouterStateSerializer } from './custom-router-state-serializer';
import { TitleService } from './services/title.service';
import { MarkdownComponent, MediaComponent } from './components';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacySliderModule as MatSliderModule } from '@angular/material/legacy-slider';
import { MediaDialogComponent } from './components/media-dialog/media-dialog.component';
import { MediaErrorDialogComponent } from './components/media-error-dialog/media-error-dialog.component';
import { MediaDetailComponent } from './components/media-detail/media-detail.component';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MediaToolbarComponent } from './components/media-toolbar/media-toolbar.component';
import { AudioToolbarComponent } from './components/audio-toolbar/audio-toolbar.component';
import { AudioIconComponent } from './components/audio-icon/audio-icon.component';
import { MEDIA_DIALOG_TOKEN } from './media-dialog-token';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    MarkdownComponent,
    MediaComponent,
    MediaDialogComponent,
    MediaErrorDialogComponent,
    MediaDetailComponent,
    MediaToolbarComponent,
    AudioToolbarComponent,
    AudioIconComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    OverlayModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    ScrollingModule,
    MatSliderModule,
    MatTooltipModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MarkdownComponent,
    MediaComponent,
    ScrollingModule,
    MatTooltipModule,
  ],
  providers: [MarkdownService, TitleService],
})
export class SolidCoreModule {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(title: TitleService) {}

  public static forRoot(
    config: SolidCoreConfig,
  ): ModuleWithProviders<SolidCoreModule> {
    return {
      ngModule: SolidCoreModule,
      providers: [
        {
          provide: SOLID_CORE_CONFIG,
          useValue: config,
        },
        {
          provide: RouteReuseStrategy,
          useClass: CustomRouteReuseStrategy,
        },
        {
          provide: RouterStateSerializer,
          useClass: CustomRouterStateSerializer,
        },
        {
          provide: MEDIA_DIALOG_TOKEN,
          useValue: MediaDialogComponent,
        },
      ],
    };
  }
}
