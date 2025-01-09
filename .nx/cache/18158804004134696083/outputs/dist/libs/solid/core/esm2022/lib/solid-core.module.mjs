import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarkdownService } from './services/markdown.service';
import { HttpClientModule } from '@angular/common/http';
import { SOLID_CORE_CONFIG } from './solid-core-config';
import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteReuseStrategy } from './custom-route-reuse-strategy';
import { RouterStateSerializer } from '@ngxs/router-plugin';
import { CustomRouterStateSerializer } from './custom-router-state-serializer';
import { TitleService } from './services/title.service';
import { MarkdownComponent, MediaComponent } from './components';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MediaDialogComponent } from './components/media-dialog/media-dialog.component';
import { MediaErrorDialogComponent } from './components/media-error-dialog/media-error-dialog.component';
import { MediaDetailComponent } from './components/media-detail/media-detail.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MediaToolbarComponent } from './components/media-toolbar/media-toolbar.component';
import { AudioToolbarComponent } from './components/audio-toolbar/audio-toolbar.component';
import { AudioIconComponent } from './components/audio-icon/audio-icon.component';
import { MEDIA_DIALOG_TOKEN } from './media-dialog-token';
import * as i0 from '@angular/core';
import * as i1 from './services/title.service';
export class SolidCoreModule {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(title) {}
  static forRoot(config) {
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
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: SolidCoreModule,
    deps: [{ token: i1.TitleService }],
    target: i0.ɵɵFactoryTarget.NgModule,
  });
  static ɵmod = i0.ɵɵngDeclareNgModule({
    minVersion: '14.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: SolidCoreModule,
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
    ],
    exports: [
      CommonModule,
      FormsModule,
      HttpClientModule,
      ReactiveFormsModule,
      MarkdownComponent,
      MediaComponent,
      ScrollingModule,
    ],
  });
  static ɵinj = i0.ɵɵngDeclareInjector({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: SolidCoreModule,
    providers: [MarkdownService, TitleService],
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
      CommonModule,
      FormsModule,
      HttpClientModule,
      ReactiveFormsModule,
      ScrollingModule,
    ],
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: SolidCoreModule,
  decorators: [
    {
      type: NgModule,
      args: [
        {
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
          ],
          exports: [
            CommonModule,
            FormsModule,
            HttpClientModule,
            ReactiveFormsModule,
            MarkdownComponent,
            MediaComponent,
            ScrollingModule,
          ],
          providers: [MarkdownService, TitleService],
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [{ type: i1.TitleService }];
  },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29saWQtY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NvbGlkL2NvcmUvc3JjL2xpYi9zb2xpZC1jb3JlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsaUJBQWlCLEVBQW1CLE1BQU0scUJBQXFCLENBQUM7QUFDekUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDckQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDekUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDNUQsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDL0UsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxjQUFjLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDakUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzNELE9BQU8sRUFBRSxvQkFB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dGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBNYXJrZG93blNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL21hcmtkb3duLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBTT0xJRF9DT1JFX0NPTkZJRywgU29saWRDb3JlQ29uZmlnIH0gZnJvbSAnLi9zb2xpZC1jb3JlLWNvbmZpZyc7XHJcbmltcG9ydCB7IFJvdXRlUmV1c2VTdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEN1c3RvbVJvdXRlUmV1c2VTdHJhdGVneSB9IGZyb20gJy4vY3VzdG9tLXJvdXRlLXJldXNlLXN0cmF0ZWd5JztcclxuaW1wb3J0IHsgUm91dGVyU3RhdGVTZXJpYWxpemVyIH0gZnJvbSAnQG5neHMvcm91dGVyLXBsdWdpbic7XHJcbmltcG9ydCB7IEN1c3RvbVJvdXRlclN0YXRlU2VyaWFsaXplciB9IGZyb20gJy4vY3VzdG9tLXJvdXRlci1zdGF0ZS1zZXJpYWxpemVyJztcclxuaW1wb3J0IHsgVGl0bGVTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy90aXRsZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTWFya2Rvd25Db21wb25lbnQsIE1lZGlhQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzJztcclxuaW1wb3J0IHsgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcclxuaW1wb3J0IHsgTWF0SWNvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2ljb24nO1xyXG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xyXG5pbXBvcnQgeyBNYXRTbGlkZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zbGlkZXInO1xyXG5pbXBvcnQgeyBNZWRpYURpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9tZWRpYS1kaWFsb2cvbWVkaWEtZGlhbG9nLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE1lZGlhRXJyb3JEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbWVkaWEtZXJyb3ItZGlhbG9nL21lZGlhLWVycm9yLWRpYWxvZy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNZWRpYURldGFpbENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9tZWRpYS1kZXRhaWwvbWVkaWEtZGV0YWlsLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE1hdERpYWxvZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XHJcbmltcG9ydCB7IFNjcm9sbGluZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xyXG5pbXBvcnQgeyBNZWRpYVRvb2xiYXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbWVkaWEtdG9vbGJhci9tZWRpYS10b29sYmFyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEF1ZGlvVG9vbGJhckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9hdWRpby10b29sYmFyL2F1ZGlvLXRvb2xiYXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQXVkaW9JY29uQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2F1ZGlvLWljb24vYXVkaW8taWNvbi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNRURJQV9ESUFMT0dfVE9LRU4gfSBmcm9tICcuL21lZGlhLWRpYWxvZy10b2tlbic7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgTWFya2Rvd25Db21wb25lbnQsXHJcbiAgICBNZWRpYUNvbXBvbmVudCxcclxuICAgIE1lZGlhRGlhbG9nQ29tcG9uZW50LFxyXG4gICAgTWVkaWFFcnJvckRpYWxvZ0NvbXBvbmVudCxcclxuICAgIE1lZGlhRGV0YWlsQ29tcG9uZW50LFxyXG4gICAgTWVkaWFUb29sYmFyQ29tcG9uZW50LFxyXG4gICAgQXVkaW9Ub29sYmFyQ29tcG9uZW50LFxyXG4gICAgQXVkaW9JY29uQ29tcG9uZW50LFxyXG4gIF0sXHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxyXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgIE92ZXJsYXlNb2R1bGUsXHJcbiAgICBNYXRJY29uTW9kdWxlLFxyXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gICAgTWF0RGlhbG9nTW9kdWxlLFxyXG4gICAgU2Nyb2xsaW5nTW9kdWxlLFxyXG4gICAgTWF0U2xpZGVyTW9kdWxlLFxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxyXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgIE1hcmtkb3duQ29tcG9uZW50LFxyXG4gICAgTWVkaWFDb21wb25lbnQsXHJcbiAgICBTY3JvbGxpbmdNb2R1bGUsXHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtNYXJrZG93blNlcnZpY2UsIFRpdGxlU2VydmljZV0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTb2xpZENvcmVNb2R1bGUge1xyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZW1wdHktZnVuY3Rpb25cclxuICBjb25zdHJ1Y3Rvcih0aXRsZTogVGl0bGVTZXJ2aWNlKSB7fVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGZvclJvb3QoXHJcbiAgICBjb25maWc6IFNvbGlkQ29yZUNvbmZpZ1xyXG4gICk6IE1vZHVsZVdpdGhQcm92aWRlcnM8U29saWRDb3JlTW9kdWxlPiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogU29saWRDb3JlTW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBwcm92aWRlOiBTT0xJRF9DT1JFX0NPTkZJRyxcclxuICAgICAgICAgIHVzZVZhbHVlOiBjb25maWcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBwcm92aWRlOiBSb3V0ZVJldXNlU3RyYXRlZ3ksXHJcbiAgICAgICAgICB1c2VDbGFzczogQ3VzdG9tUm91dGVSZXVzZVN0cmF0ZWd5LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcHJvdmlkZTogUm91dGVyU3RhdGVTZXJpYWxpemVyLFxyXG4gICAgICAgICAgdXNlQ2xhc3M6IEN1c3RvbVJvdXRlclN0YXRlU2VyaWFsaXplcixcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHByb3ZpZGU6IE1FRElBX0RJQUxPR19UT0tFTixcclxuICAgICAgICAgIHVzZVZhbHVlOiBNZWRpYURpYWxvZ0NvbXBvbmVudCxcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19
