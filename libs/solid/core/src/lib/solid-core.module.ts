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

@NgModule({
  declarations: [MarkdownComponent, ImageComponent],
  imports: [CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  exports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MarkdownComponent,
    ImageComponent,
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
