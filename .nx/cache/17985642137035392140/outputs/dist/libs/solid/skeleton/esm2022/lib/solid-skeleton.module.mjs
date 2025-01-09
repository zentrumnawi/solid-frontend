import { CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule } from '@angular/core';
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
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  feedbackServiceFactory,
  SOLID_SKELETON_FEEDBACK_SERVICE,
} from './services/feedback.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {
  defaultSkeletonConfig,
  SOLID_SKELETON_CONFIG,
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
import { MessageListComponent } from './components/message-list/message-list.component';
import { SOLID_PROFILE_BASE_URL } from '@zentrumnawi/solid-profile';
import { SOLID_SLIDESHOW_APP_ROUTING_CONFIG } from '@zentrumnawi/solid-slideshow';
import { MatExpansionModule } from '@angular/material/expansion';
import { IntroService } from './services/intro.service';
import { deepMerge } from './utils/deep-merge';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PrivacyDialogComponent } from './components/privacy-dialog/privacy-dialog.component';
import { LandingBannerDialogComponent } from './components/landing-banner-dialog/landing-banner-dialog.component';
import { MatBadgeModule } from '@angular/material/badge';
import { GridColsDirective } from './directives/grid-cols.directive';
import * as i0 from '@angular/core';
import * as i1 from '@ngxs/store';
// This workaround is required for the "old" angular compiler in production mode. Ivy library publishing is not supported until angular 10.
// https://github.com/ng-packagr/ng-packagr/issues/767
export const ngxsFeatureModule = NgxsModule.forFeature([MenuState]);
export function configFactory(cfg) {
  const fn = function () {
    return deepMerge(defaultSkeletonConfig, cfg);
  };
  return fn;
}
export function routingFactory(cfg) {
  return generateRoutes(cfg.routingConfig);
}
export class SolidSkeletonModule {
  static forRoot(cfg) {
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
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: SolidSkeletonModule,
    deps: [],
    target: i0.ɵɵFactoryTarget.NgModule,
  });
  static ɵmod = i0.ɵɵngDeclareNgModule({
    minVersion: '14.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: SolidSkeletonModule,
    declarations: [
      BaseLayoutComponent,
      FeedbackComponent,
      MainMenuComponent,
      UpdateDialogComponent,
      LandingComponent,
      InfoComponent,
      MessageListComponent,
      PrivacyDialogComponent,
      LandingBannerDialogComponent,
      GridColsDirective,
    ],
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
      MatCheckboxModule,
      MatSidenavModule,
      MatTabsModule,
      MatToolbarModule,
      i1.ɵNgxsFeatureModule,
      MatExpansionModule,
      MatSlideToggleModule,
      MatBadgeModule,
    ],
    exports: [BaseLayoutComponent],
  });
  static ɵinj = i0.ɵɵngDeclareInjector({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: SolidSkeletonModule,
    providers: [UpdateService, IntroService],
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
      MatCheckboxModule,
      MatSidenavModule,
      MatTabsModule,
      MatToolbarModule,
      ngxsFeatureModule,
      MatExpansionModule,
      MatSlideToggleModule,
      MatBadgeModule,
    ],
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: SolidSkeletonModule,
  decorators: [
    {
      type: NgModule,
      args: [
        {
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
            MatCheckboxModule,
            MatSidenavModule,
            MatTabsModule,
            MatToolbarModule,
            ngxsFeatureModule,
            MatExpansionModule,
            MatSlideToggleModule,
            MatBadgeModule,
          ],
          declarations: [
            BaseLayoutComponent,
            FeedbackComponent,
            MainMenuComponent,
            UpdateDialogComponent,
            LandingComponent,
            InfoComponent,
            MessageListComponent,
            PrivacyDialogComponent,
            LandingBannerDialogComponent,
            GridColsDirective,
          ],
          exports: [BaseLayoutComponent],
          providers: [UpdateService, IntroService],
          schemas: [CUSTOM_ELEMENTS_SCHEMA],
        },
      ],
    },
  ],
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29saWQtc2tlbGV0b24ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zb2xpZC9za2VsZXRvbi9zcmMvbGliL3NvbGlkLXNrZWxldG9uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsc0JBQXNCLEVBQ3RCLFlBQVksRUFFWixRQUFRLEdBQ1QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxlQUFlLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM3RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUNyRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzNELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDL0UsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1B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eEMsT0FBTyxFQUFFLENBQUMsc0JBQXNCLENBQUM7aUJBQ2xDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDVVNUT01fRUxFTUVOVFNfU0NIRU1BLFxyXG4gIEVycm9ySGFuZGxlcixcclxuICBNb2R1bGVXaXRoUHJvdmlkZXJzLFxyXG4gIE5nTW9kdWxlLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBTT0xJRF9DT1JFX0NPTkZJRywgU29saWRDb3JlTW9kdWxlIH0gZnJvbSAnQHplbnRydW1uYXdpL3NvbGlkLWNvcmUnO1xyXG5pbXBvcnQgeyBCYXNlTGF5b3V0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2Jhc2UtbGF5b3V0L2Jhc2UtbGF5b3V0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFNvbGlkR2xvc3NhcnlNb2R1bGUgfSBmcm9tICdAemVudHJ1bW5hd2kvc29saWQtZ2xvc3NhcnknO1xyXG5pbXBvcnQgeyBNYXRUb29sYmFyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdG9vbGJhcic7XHJcbmltcG9ydCB7IE1hdFNpZGVuYXZNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zaWRlbmF2JztcclxuaW1wb3J0IHsgTWF0SWNvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2ljb24nO1xyXG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xyXG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUsIFJPVVRFUyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IE1haW5NZW51Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL21haW4tbWVudS9tYWluLW1lbnUuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTWF0TGlzdE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2xpc3QnO1xyXG5pbXBvcnQgeyBGZWVkYmFja0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9mZWVkYmFjay9mZWVkYmFjay5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNYXRGb3JtRmllbGRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9mb3JtLWZpZWxkJztcclxuaW1wb3J0IHsgTWF0SW5wdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pbnB1dCc7XHJcbmltcG9ydCB7IE1hdFNlbGVjdE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NlbGVjdCc7XHJcbmltcG9ydCB7IE1hdENoZWNrYm94TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY2hlY2tib3gnO1xyXG5pbXBvcnQge1xyXG4gIGZlZWRiYWNrU2VydmljZUZhY3RvcnksXHJcbiAgU09MSURfU0tFTEVUT05fRkVFREJBQ0tfU0VSVklDRSxcclxufSBmcm9tICcuL3NlcnZpY2VzL2ZlZWRiYWNrLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBNYXREaWFsb2csIE1hdERpYWxvZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XHJcbmltcG9ydCB7XHJcbiAgZGVmYXVsdFNrZWxldG9uQ29uZmlnLFxyXG4gIEludGVybmFsU29saWRTa2VsZXRvbkNvbmZpZyxcclxuICBTT0xJRF9TS0VMRVRPTl9DT05GSUcsXHJcbiAgU29saWRTa2VsZXRvbkNvbmZpZyxcclxufSBmcm9tICcuL3NvbGlkLXNrZWxldG9uLWNvbmZpZyc7XHJcbmltcG9ydCB7IFVwZGF0ZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3VwZGF0ZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVXBkYXRlRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3VwZGF0ZS1kaWFsb2cvdXBkYXRlLWRpYWxvZy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNYXRHcmlkTGlzdE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2dyaWQtbGlzdCc7XHJcbmltcG9ydCB7IExhbmRpbmdDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbGFuZGluZy9sYW5kaW5nLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE1hdENhcmRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jYXJkJztcclxuaW1wb3J0IHsgTmd4c01vZHVsZSB9IGZyb20gJ0BuZ3hzL3N0b3JlJztcclxuaW1wb3J0IHsgTWVudVN0YXRlIH0gZnJvbSAnLi9zdGF0ZS9tZW51LnN0YXRlJztcclxuaW1wb3J0IHsgZ2VuZXJhdGVSb3V0ZXMgfSBmcm9tICcuL3NrZWxldG9uLXJvdXRpbmcnO1xyXG5pbXBvcnQgeyBjcmVhdGVFcnJvckhhbmRsZXIgfSBmcm9tICdAc2VudHJ5L2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBJbmZvQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2luZm8vaW5mby5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNYXRUYWJzTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdGFicyc7XHJcbmltcG9ydCB7IE1lc3NhZ2VMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL21lc3NhZ2UtbGlzdC9tZXNzYWdlLWxpc3QuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU09MSURfUFJPRklMRV9CQVNFX1VSTCB9IGZyb20gJ0B6ZW50cnVtbmF3aS9zb2xpZC1wcm9maWxlJztcclxuaW1wb3J0IHsgU09MSURfU0xJREVTSE9XX0FQUF9ST1VUSU5HX0NPTkZJRyB9IGZyb20gJ0B6ZW50cnVtbmF3aS9zb2xpZC1zbGlkZXNob3cnO1xyXG5pbXBvcnQgeyBNYXRFeHBhbnNpb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9leHBhbnNpb24nO1xyXG5pbXBvcnQgeyBJbnRyb1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2ludHJvLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBkZWVwTWVyZ2UgfSBmcm9tICcuL3V0aWxzL2RlZXAtbWVyZ2UnO1xyXG5pbXBvcnQgeyBNYXRTbGlkZVRvZ2dsZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NsaWRlLXRvZ2dsZSc7XHJcbmltcG9ydCB7IFByaXZhY3lEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvcHJpdmFjeS1kaWFsb2cvcHJpdmFjeS1kaWFsb2cuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTGFuZGluZ0Jhbm5lckRpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9sYW5kaW5nLWJhbm5lci1kaWFsb2cvbGFuZGluZy1iYW5uZXItZGlhbG9nLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE1hdEJhZGdlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYmFkZ2UnO1xyXG5pbXBvcnQgeyBHcmlkQ29sc0RpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9ncmlkLWNvbHMuZGlyZWN0aXZlJztcclxuXHJcbi8vIFRoaXMgd29ya2Fyb3VuZCBpcyByZXF1aXJlZCBmb3IgdGhlIFwib2xkXCIgYW5ndWxhciBjb21waWxlciBpbiBwcm9kdWN0aW9uIG1vZGUuIEl2eSBsaWJyYXJ5IHB1Ymxpc2hpbmcgaXMgbm90IHN1cHBvcnRlZCB1bnRpbCBhbmd1bGFyIDEwLlxyXG4vLyBodHRwczovL2dpdGh1Yi5jb20vbmctcGFja2Fnci9uZy1wYWNrYWdyL2lzc3Vlcy83NjdcclxuZXhwb3J0IGNvbnN0IG5neHNGZWF0dXJlTW9kdWxlID0gTmd4c01vZHVsZS5mb3JGZWF0dXJlKFtNZW51U3RhdGVdKTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb25maWdGYWN0b3J5KFxyXG4gIGNmZzogU29saWRTa2VsZXRvbkNvbmZpZ1xyXG4pOiAoKSA9PiAoKSA9PiBJbnRlcm5hbFNvbGlkU2tlbGV0b25Db25maWcge1xyXG4gIGNvbnN0IGZuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIGRlZXBNZXJnZShkZWZhdWx0U2tlbGV0b25Db25maWcsIGNmZyk7XHJcbiAgfTtcclxuICByZXR1cm4gZm47XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByb3V0aW5nRmFjdG9yeShjZmc6IEludGVybmFsU29saWRTa2VsZXRvbkNvbmZpZykge1xyXG4gIHJldHVybiBnZW5lcmF0ZVJvdXRlcyhjZmcucm91dGluZ0NvbmZpZyk7XHJcbn1cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgU29saWRDb3JlTW9kdWxlLFxyXG4gICAgU29saWRHbG9zc2FyeU1vZHVsZSxcclxuICAgIFJvdXRlck1vZHVsZSxcclxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcclxuICAgIE1hdENhcmRNb2R1bGUsXHJcbiAgICBNYXREaWFsb2dNb2R1bGUsXHJcbiAgICBNYXRGb3JtRmllbGRNb2R1bGUsXHJcbiAgICBNYXRHcmlkTGlzdE1vZHVsZSxcclxuICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICBNYXRJbnB1dE1vZHVsZSxcclxuICAgIE1hdExpc3RNb2R1bGUsXHJcbiAgICBNYXRTZWxlY3RNb2R1bGUsXHJcbiAgICBNYXRDaGVja2JveE1vZHVsZSxcclxuICAgIE1hdFNpZGVuYXZNb2R1bGUsXHJcbiAgICBNYXRUYWJzTW9kdWxlLFxyXG4gICAgTWF0VG9vbGJhck1vZHVsZSxcclxuICAgIG5neHNGZWF0dXJlTW9kdWxlLFxyXG4gICAgTWF0RXhwYW5zaW9uTW9kdWxlLFxyXG4gICAgTWF0U2xpZGVUb2dnbGVNb2R1bGUsXHJcbiAgICBNYXRCYWRnZU1vZHVsZSxcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgQmFzZUxheW91dENvbXBvbmVudCxcclxuICAgIEZlZWRiYWNrQ29tcG9uZW50LFxyXG4gICAgTWFpbk1lbnVDb21wb25lbnQsXHJcbiAgICBVcGRhdGVEaWFsb2dDb21wb25lbnQsXHJcbiAgICBMYW5kaW5nQ29tcG9uZW50LFxyXG4gICAgSW5mb0NvbXBvbmVudCxcclxuICAgIE1lc3NhZ2VMaXN0Q29tcG9uZW50LFxyXG4gICAgUHJpdmFjeURpYWxvZ0NvbXBvbmVudCxcclxuICAgIExhbmRpbmdCYW5uZXJEaWFsb2dDb21wb25lbnQsXHJcbiAgICBHcmlkQ29sc0RpcmVjdGl2ZSxcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtCYXNlTGF5b3V0Q29tcG9uZW50XSxcclxuICBwcm92aWRlcnM6IFtVcGRhdGVTZXJ2aWNlLCBJbnRyb1NlcnZpY2VdLFxyXG4gIHNjaGVtYXM6IFtDVVNUT01fRUxFTUVOVFNfU0NIRU1BXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIFNvbGlkU2tlbGV0b25Nb2R1bGUge1xyXG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdChcclxuICAgIGNmZzogU29saWRTa2VsZXRvbkNvbmZpZ1xyXG4gICk6IE1vZHVsZVdpdGhQcm92aWRlcnM8U29saWRTa2VsZXRvbk1vZHVsZT4ge1xyXG4gICAgY29uc3QgZXJySGFuZGxlciA9IGNyZWF0ZUVycm9ySGFuZGxlcihjZmcuc2VudHJ5Py5lcnJvckhhbmRsZXJPcHRpb25zKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBTb2xpZFNrZWxldG9uTW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBwcm92aWRlOiBTT0xJRF9TS0VMRVRPTl9DT05GSUcsXHJcbiAgICAgICAgICB1c2VGYWN0b3J5OiBjb25maWdGYWN0b3J5KGNmZyksXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBwcm92aWRlOiBTT0xJRF9TS0VMRVRPTl9GRUVEQkFDS19TRVJWSUNFLFxyXG4gICAgICAgICAgdXNlRmFjdG9yeTogZmVlZGJhY2tTZXJ2aWNlRmFjdG9yeSxcclxuICAgICAgICAgIGRlcHM6IFtcclxuICAgICAgICAgICAgSHR0cENsaWVudCxcclxuICAgICAgICAgICAgTWF0RGlhbG9nLFxyXG4gICAgICAgICAgICBTT0xJRF9DT1JFX0NPTkZJRyxcclxuICAgICAgICAgICAgU09MSURfU0tFTEVUT05fQ09ORklHLFxyXG4gICAgICAgICAgXSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHByb3ZpZGU6IFJPVVRFUyxcclxuICAgICAgICAgIHVzZUZhY3Rvcnk6IHJvdXRpbmdGYWN0b3J5LFxyXG4gICAgICAgICAgZGVwczogW1NPTElEX1NLRUxFVE9OX0NPTkZJR10sXHJcbiAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHByb3ZpZGU6IEVycm9ySGFuZGxlcixcclxuICAgICAgICAgIHVzZVZhbHVlOiBjcmVhdGVFcnJvckhhbmRsZXIoY2ZnLnNlbnRyeT8uZXJyb3JIYW5kbGVyT3B0aW9ucyksXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBwcm92aWRlOiBTT0xJRF9QUk9GSUxFX0JBU0VfVVJMLFxyXG4gICAgICAgICAgdXNlVmFsdWU6IGNmZy5yb3V0aW5nQ29uZmlnLnByb2ZpbGU/LnVybCA/PyAncHJvZmlsZScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBwcm92aWRlOiBTT0xJRF9TTElERVNIT1dfQVBQX1JPVVRJTkdfQ09ORklHLFxyXG4gICAgICAgICAgdXNlVmFsdWU6IGNmZy5yb3V0aW5nQ29uZmlnLnNsaWRlc2hvdyxcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19
