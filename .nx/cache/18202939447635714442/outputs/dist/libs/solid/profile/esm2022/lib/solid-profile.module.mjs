import { NgModule } from '@angular/core';
import { TreeComponent } from './components/tree/tree.component';
import { ListComponent } from './components/list/list.component';
import { DetailComponent } from './components/detail/detail.component';
import { BaseComponent } from './components/base/base.component';
import { GridComponent } from './components/grid/grid.component';
import { SolidCoreModule } from '@zentrumnawi/solid-core';
import { MatTabsModule } from '@angular/material/tabs';
import { SolidProfileRoutingModule } from './solid-profile-routing.module';
import { NgxsModule } from '@ngxs/store';
import { ProfileState } from './state/profile.state';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatTreeModule } from '@angular/material/tree';
import { DomSanitizer } from '@angular/platform-browser';
import { SelectedDirective } from './components/selected.directive';
import { ProfileDefinitionService } from './services/profile-definition.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import * as i0 from '@angular/core';
import * as i1 from '@angular/material/icon';
import * as i2 from '@angular/platform-browser';
import * as i3 from '@angular/router';
import * as i4 from '@ngxs/store';
// This workaround is required for the "old" angular compiler in production mode. Ivy library publishing is not supported until angular 10.
// https://github.com/ng-packagr/ng-packagr/issues/767
export const ngxsFeatureModule = NgxsModule.forFeature([ProfileState]);
export class SolidProfileModule {
  constructor(registry, url) {
    const addIcon = (name) =>
      registry.addSvgIcon(
        name,
        url.bypassSecurityTrustResourceUrl(`assets/svg/${name}.svg`)
      );
    addIcon('search');
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: SolidProfileModule,
    deps: [{ token: i1.MatIconRegistry }, { token: i2.DomSanitizer }],
    target: i0.ɵɵFactoryTarget.NgModule,
  });
  static ɵmod = i0.ɵɵngDeclareNgModule({
    minVersion: '14.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: SolidProfileModule,
    declarations: [
      TreeComponent,
      ListComponent,
      DetailComponent,
      BaseComponent,
      GridComponent,
      SelectedDirective,
    ],
    imports: [
      SolidCoreModule,
      SolidCoreModule,
      i3.RouterModule,
      MatTabsModule,
      i4.ɵNgxsFeatureModule,
      MatButtonModule,
      MatExpansionModule,
      MatFormFieldModule,
      MatIconModule,
      MatInputModule,
      MatListModule,
      MatProgressSpinnerModule,
      MatToolbarModule,
      MatTreeModule,
      MatCardModule,
    ],
  });
  static ɵinj = i0.ɵɵngDeclareInjector({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: SolidProfileModule,
    providers: [ProfileDefinitionService],
    imports: [
      SolidCoreModule,
      SolidCoreModule,
      SolidProfileRoutingModule,
      MatTabsModule,
      ngxsFeatureModule,
      MatButtonModule,
      MatExpansionModule,
      MatFormFieldModule,
      MatIconModule,
      MatInputModule,
      MatListModule,
      MatProgressSpinnerModule,
      MatToolbarModule,
      MatTreeModule,
      MatCardModule,
    ],
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: SolidProfileModule,
  decorators: [
    {
      type: NgModule,
      args: [
        {
          declarations: [
            TreeComponent,
            ListComponent,
            DetailComponent,
            BaseComponent,
            GridComponent,
            SelectedDirective,
          ],
          imports: [
            SolidCoreModule,
            SolidCoreModule,
            SolidProfileRoutingModule,
            MatTabsModule,
            ngxsFeatureModule,
            MatButtonModule,
            MatExpansionModule,
            MatFormFieldModule,
            MatIconModule,
            MatInputModule,
            MatListModule,
            MatProgressSpinnerModule,
            MatToolbarModule,
            MatTreeModule,
            MatCardModule,
          ],
          providers: [ProfileDefinitionService],
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [{ type: i1.MatIconRegistry }, { type: i2.DomSanitizer }];
  },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29saWQtcHJvZmlsZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NvbGlkL3Byb2ZpbGUvc3JjL2xpYi9zb2xpZC1wcm9maWxlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNqRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDakUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNqRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDakUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzFELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDekQsT0FBTyxFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN4RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0QsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDOUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDcEUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDakYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDakUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDOzs7Ozs7QUFFdkQsMklBQTJJO0FBQzNJLHNEQUFzRDtBQUN0RCxNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztBQThCdkUsTUFBTSxPQUFPLGtCQUFrQjtJQUM3QixZQUFZLFFBQXlCLEVBQUUsR0FBaUI7UUFDdEQsTUFBTSxPQUFPLEdBQUcsQ0FBQyxJQUFZLEVBQUUsRUFBRSxDQUMvQixRQUFRLENBQUMsVUFBVSxDQUNqQixJQUFJLEVBQ0osR0FBRyxDQUFDLDhCQUE4QixDQUFDLGNBQWMsSUFBSSxNQUFNLENBQUMsQ0FDN0QsQ0FBQztRQUNKLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNwQixDQUFDO3VHQVJVLGtCQUFrQjt3R0FBbEIsa0JBQWtCLGlCQTFCM0IsYUFBYTtZQUNiLGFBQWE7WUFDYixlQUFlO1lBQ2YsYUFBYTtZQUNiLGFBQWE7WUFDYixpQkFBaUIsYUFHakIsZUFBZTtZQUNmLGVBQWUsbUJBRWYsYUFBYSx5QkFFYixlQUFlO1lBQ2Ysa0JBQWtCO1lBQ2xCLGtCQUFrQjtZQUNsQixhQUFhO1lBQ2IsY0FBYztZQUNkLGFBQWE7WUFDYix3QkFBd0I7WUFDeEIsZ0JBQWdCO1lBQ2hCLGFBQWE7WUFDYixhQUFhO3dHQUlKLGtCQUFrQixhQUZsQixDQUFDLHdCQUF3QixDQUFDLFlBaEJuQyxlQUFlO1lBQ2YsZUFBZTtZQUNmLHlCQUF5QjtZQUN6QixhQUFhO1lBQ2IsaUJBQWlCO1lBQ2pCLGVBQWU7WUFDZixrQkFBa0I7WUFDbEIsa0JBQWtCO1lBQ2xCLGFBQWE7WUFDYixjQUFjO1lBQ2QsYUFBYTtZQUNiLHdCQUF3QjtZQUN4QixnQkFBZ0I7WUFDaEIsYUFBYTtZQUNiLGFBQWE7OzJGQUlKLGtCQUFrQjtrQkE1QjlCLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFO3dCQUNaLGFBQWE7d0JBQ2IsYUFBYTt3QkFDYixlQUFlO3dCQUNmLGFBQWE7d0JBQ2IsYUFBYTt3QkFDYixpQkFBaUI7cUJBQ2xCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxlQUFlO3dCQUNmLGVBQWU7d0JBQ2YseUJBQXlCO3dCQUN6QixhQUFhO3dCQUNiLGlCQUFpQjt3QkFDakIsZUFBZTt3QkFDZixrQkFBa0I7d0JBQ2xCLGtCQUFrQjt3QkFDbEIsYUFBYTt3QkFDYixjQUFjO3dCQUNkLGFBQWE7d0JBQ2Isd0JBQXdCO3dCQUN4QixnQkFBZ0I7d0JBQ2hCLGFBQWE7d0JBQ2IsYUFBYTtxQkFDZDtvQkFDRCxTQUFTLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztpQkFDdEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBUcmVlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RyZWUvdHJlZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2xpc3QvbGlzdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBEZXRhaWxDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZGV0YWlsL2RldGFpbC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2Jhc2UvYmFzZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBHcmlkQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2dyaWQvZ3JpZC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTb2xpZENvcmVNb2R1bGUgfSBmcm9tICdAemVudHJ1bW5hd2kvc29saWQtY29yZSc7XHJcbmltcG9ydCB7IE1hdFRhYnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90YWJzJztcclxuaW1wb3J0IHsgU29saWRQcm9maWxlUm91dGluZ01vZHVsZSB9IGZyb20gJy4vc29saWQtcHJvZmlsZS1yb3V0aW5nLm1vZHVsZSc7XHJcbmltcG9ydCB7IE5neHNNb2R1bGUgfSBmcm9tICdAbmd4cy9zdG9yZSc7XHJcbmltcG9ydCB7IFByb2ZpbGVTdGF0ZSB9IGZyb20gJy4vc3RhdGUvcHJvZmlsZS5zdGF0ZSc7XHJcbmltcG9ydCB7IE1hdFRvb2xiYXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90b29sYmFyJztcclxuaW1wb3J0IHsgTWF0Rm9ybUZpZWxkTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZm9ybS1maWVsZCc7XHJcbmltcG9ydCB7IE1hdElucHV0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaW5wdXQnO1xyXG5pbXBvcnQgeyBNYXRJY29uTW9kdWxlLCBNYXRJY29uUmVnaXN0cnkgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pY29uJztcclxuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uJztcclxuaW1wb3J0IHsgTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvcHJvZ3Jlc3Mtc3Bpbm5lcic7XHJcbmltcG9ydCB7IE1hdExpc3RNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9saXN0JztcclxuaW1wb3J0IHsgTWF0VHJlZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3RyZWUnO1xyXG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuaW1wb3J0IHsgU2VsZWN0ZWREaXJlY3RpdmUgfSBmcm9tICcuL2NvbXBvbmVudHMvc2VsZWN0ZWQuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgUHJvZmlsZURlZmluaXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9wcm9maWxlLWRlZmluaXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IE1hdEV4cGFuc2lvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2V4cGFuc2lvbic7XHJcbmltcG9ydCB7IE1hdENhcmRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jYXJkJztcclxuXHJcbi8vIFRoaXMgd29ya2Fyb3VuZCBpcyByZXF1aXJlZCBmb3IgdGhlIFwib2xkXCIgYW5ndWxhciBjb21waWxlciBpbiBwcm9kdWN0aW9uIG1vZGUuIEl2eSBsaWJyYXJ5IHB1Ymxpc2hpbmcgaXMgbm90IHN1cHBvcnRlZCB1bnRpbCBhbmd1bGFyIDEwLlxyXG4vLyBodHRwczovL2dpdGh1Yi5jb20vbmctcGFja2Fnci9uZy1wYWNrYWdyL2lzc3Vlcy83NjdcclxuZXhwb3J0IGNvbnN0IG5neHNGZWF0dXJlTW9kdWxlID0gTmd4c01vZHVsZS5mb3JGZWF0dXJlKFtQcm9maWxlU3RhdGVdKTtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBUcmVlQ29tcG9uZW50LFxyXG4gICAgTGlzdENvbXBvbmVudCxcclxuICAgIERldGFpbENvbXBvbmVudCxcclxuICAgIEJhc2VDb21wb25lbnQsXHJcbiAgICBHcmlkQ29tcG9uZW50LFxyXG4gICAgU2VsZWN0ZWREaXJlY3RpdmUsXHJcbiAgXSxcclxuICBpbXBvcnRzOiBbXHJcbiAgICBTb2xpZENvcmVNb2R1bGUsXHJcbiAgICBTb2xpZENvcmVNb2R1bGUsXHJcbiAgICBTb2xpZFByb2ZpbGVSb3V0aW5nTW9kdWxlLFxyXG4gICAgTWF0VGFic01vZHVsZSxcclxuICAgIG5neHNGZWF0dXJlTW9kdWxlLFxyXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gICAgTWF0RXhwYW5zaW9uTW9kdWxlLFxyXG4gICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxyXG4gICAgTWF0SWNvbk1vZHVsZSxcclxuICAgIE1hdElucHV0TW9kdWxlLFxyXG4gICAgTWF0TGlzdE1vZHVsZSxcclxuICAgIE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSxcclxuICAgIE1hdFRvb2xiYXJNb2R1bGUsXHJcbiAgICBNYXRUcmVlTW9kdWxlLFxyXG4gICAgTWF0Q2FyZE1vZHVsZSxcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW1Byb2ZpbGVEZWZpbml0aW9uU2VydmljZV0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTb2xpZFByb2ZpbGVNb2R1bGUge1xyXG4gIGNvbnN0cnVjdG9yKHJlZ2lzdHJ5OiBNYXRJY29uUmVnaXN0cnksIHVybDogRG9tU2FuaXRpemVyKSB7XHJcbiAgICBjb25zdCBhZGRJY29uID0gKG5hbWU6IHN0cmluZykgPT5cclxuICAgICAgcmVnaXN0cnkuYWRkU3ZnSWNvbihcclxuICAgICAgICBuYW1lLFxyXG4gICAgICAgIHVybC5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwoYGFzc2V0cy9zdmcvJHtuYW1lfS5zdmdgKVxyXG4gICAgICApO1xyXG4gICAgYWRkSWNvbignc2VhcmNoJyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
