import { NgModule } from '@angular/core';
import { SolidCoreModule } from '@zentrumnawi/solid-core';
import { GlossaryComponent } from './components';
import { MatListModule } from '@angular/material/list';
import { NgxsModule } from '@ngxs/store';
import { GlossaryState } from './glossary.state';
import { RefDirective } from './components/link.directive';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import * as i0 from '@angular/core';
import * as i1 from '@ngxs/store';
// This workaround is required for the "old" angular compiler in production mode. Ivy library publishing is not supported until angular 10.
// https://github.com/ng-packagr/ng-packagr/issues/767
export const ngxsFeatureModule = NgxsModule.forFeature([GlossaryState]);
export class SolidGlossaryModule {
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: SolidGlossaryModule,
    deps: [],
    target: i0.ɵɵFactoryTarget.NgModule,
  });
  static ɵmod = i0.ɵɵngDeclareNgModule({
    minVersion: '14.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: SolidGlossaryModule,
    declarations: [GlossaryComponent, RefDirective],
    imports: [
      SolidCoreModule,
      MatListModule,
      i1.ɵNgxsFeatureModule,
      MatInputModule,
      MatIconModule,
      MatButtonModule,
    ],
    exports: [GlossaryComponent],
  });
  static ɵinj = i0.ɵɵngDeclareInjector({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: SolidGlossaryModule,
    imports: [
      SolidCoreModule,
      MatListModule,
      ngxsFeatureModule,
      MatInputModule,
      MatIconModule,
      MatButtonModule,
    ],
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: SolidGlossaryModule,
  decorators: [
    {
      type: NgModule,
      args: [
        {
          declarations: [GlossaryComponent, RefDirective],
          imports: [
            SolidCoreModule,
            MatListModule,
            ngxsFeatureModule,
            MatInputModule,
            MatIconModule,
            MatButtonModule,
          ],
          exports: [GlossaryComponent],
        },
      ],
    },
  ],
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29saWQtZ2xvc3NhcnkubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zb2xpZC9nbG9zc2FyeS9zcmMvbGliL3NvbGlkLWdsb3NzYXJ5Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDakQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDekMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDekQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7O0FBRTNELDJJQUEySTtBQUMzSSxzREFBc0Q7QUFDdEQsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7QUFjeEUsTUFBTSxPQUFPLG1CQUFtQjt1R0FBbkIsbUJBQW1CO3dHQUFuQixtQkFBbUIsaUJBWGYsaUJBQWlCLEVBQUUsWUFBWSxhQUU1QyxlQUFlO1lBQ2YsYUFBYSx5QkFFYixjQUFjO1lBQ2QsYUFBYTtZQUNiLGVBQWUsYUFFUCxpQkFBaUI7d0dBRWhCLG1CQUFtQixZQVQ1QixlQUFlO1lBQ2YsYUFBYTtZQUNiLGlCQUFpQjtZQUNqQixjQUFjO1lBQ2QsYUFBYTtZQUNiLGVBQWU7OzJGQUlOLG1CQUFtQjtrQkFaL0IsUUFBUTttQkFBQztvQkFDUixZQUFZLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxZQUFZLENBQUM7b0JBQy9DLE9BQU8sRUFBRTt3QkFDUCxlQUFlO3dCQUNmLGFBQWE7d0JBQ2IsaUJBQWlCO3dCQUNqQixjQUFjO3dCQUNkLGFBQWE7d0JBQ2IsZUFBZTtxQkFDaEI7b0JBQ0QsT0FBTyxFQUFFLENBQUMsaUJBQWlCLENBQUM7aUJBQzdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU29saWRDb3JlTW9kdWxlIH0gZnJvbSAnQHplbnRydW1uYXdpL3NvbGlkLWNvcmUnO1xyXG5pbXBvcnQgeyBHbG9zc2FyeUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cyc7XHJcbmltcG9ydCB7IE1hdExpc3RNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9saXN0JztcclxuaW1wb3J0IHsgTmd4c01vZHVsZSB9IGZyb20gJ0BuZ3hzL3N0b3JlJztcclxuaW1wb3J0IHsgR2xvc3NhcnlTdGF0ZSB9IGZyb20gJy4vZ2xvc3Nhcnkuc3RhdGUnO1xyXG5pbXBvcnQgeyBSZWZEaXJlY3RpdmUgfSBmcm9tICcuL2NvbXBvbmVudHMvbGluay5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBNYXRJbnB1dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2lucHV0JztcclxuaW1wb3J0IHsgTWF0SWNvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2ljb24nO1xyXG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xyXG5cclxuLy8gVGhpcyB3b3JrYXJvdW5kIGlzIHJlcXVpcmVkIGZvciB0aGUgXCJvbGRcIiBhbmd1bGFyIGNvbXBpbGVyIGluIHByb2R1Y3Rpb24gbW9kZS4gSXZ5IGxpYnJhcnkgcHVibGlzaGluZyBpcyBub3Qgc3VwcG9ydGVkIHVudGlsIGFuZ3VsYXIgMTAuXHJcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9uZy1wYWNrYWdyL25nLXBhY2thZ3IvaXNzdWVzLzc2N1xyXG5leHBvcnQgY29uc3Qgbmd4c0ZlYXR1cmVNb2R1bGUgPSBOZ3hzTW9kdWxlLmZvckZlYXR1cmUoW0dsb3NzYXJ5U3RhdGVdKTtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgZGVjbGFyYXRpb25zOiBbR2xvc3NhcnlDb21wb25lbnQsIFJlZkRpcmVjdGl2ZV0sXHJcbiAgaW1wb3J0czogW1xyXG4gICAgU29saWRDb3JlTW9kdWxlLFxyXG4gICAgTWF0TGlzdE1vZHVsZSxcclxuICAgIG5neHNGZWF0dXJlTW9kdWxlLFxyXG4gICAgTWF0SW5wdXRNb2R1bGUsXHJcbiAgICBNYXRJY29uTW9kdWxlLFxyXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gIF0sXHJcbiAgZXhwb3J0czogW0dsb3NzYXJ5Q29tcG9uZW50XSxcclxufSlcclxuZXhwb3J0IGNsYXNzIFNvbGlkR2xvc3NhcnlNb2R1bGUge31cclxuIl19
