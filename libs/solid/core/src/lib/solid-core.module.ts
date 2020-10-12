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
import { MarkdownComponent, ImageComponent } from './components';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ImageDialogComponent } from './components/image-dialog/image-dialog.component';
import { ImageDetailComponent } from './components/image-detail/image-detail.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ImageToolbarComponent } from './components/image-toolbar/image-toolbar.component';

@NgModule({
  declarations: [
    MarkdownComponent,
    ImageComponent,
    ImageDialogComponent,
    ImageDetailComponent,
    ImageToolbarComponent,
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
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MarkdownComponent,
    ImageComponent,
    ScrollingModule,
  ],
  providers: [MarkdownService, TitleService],
})
export class SolidCoreModule {
  constructor(title: TitleService) {}

  public static forRoot(
    config: SolidCoreConfig
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
      ],
    };
  }
}
