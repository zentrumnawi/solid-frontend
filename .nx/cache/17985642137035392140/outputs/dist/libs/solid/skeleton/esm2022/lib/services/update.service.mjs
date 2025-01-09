import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MatDialog } from '@angular/material/dialog';
import { UpdateDialogComponent } from '../components/update-dialog/update-dialog.component';
import * as i0 from '@angular/core';
import * as i1 from '@angular/service-worker';
import * as i2 from '@angular/material/dialog';
export class UpdateService {
  constructor(updates, dialog) {
    updates.available.subscribe((event) => {
      dialog.open(UpdateDialogComponent, {
        disableClose: true,
        data: {
          cb: () =>
            updates.activateUpdate().then(() => document.location.reload()),
        },
      });
      console.log('current version is', event.current);
      console.log('available version is', event.available);
    });
    updates.activated.subscribe((event) => {
      console.log('old version was', event.previous);
      console.log('new version is', event.current);
    });
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: UpdateService,
    deps: [{ token: i1.SwUpdate }, { token: i2.MatDialog }],
    target: i0.ɵɵFactoryTarget.Injectable,
  });
  static ɵprov = i0.ɵɵngDeclareInjectable({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: UpdateService,
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: UpdateService,
  decorators: [
    {
      type: Injectable,
    },
  ],
  ctorParameters: function () {
    return [{ type: i1.SwUpdate }, { type: i2.MatDialog }];
  },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NvbGlkL3NrZWxldG9uL3NyYy9saWIvc2VydmljZXMvdXBkYXRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHFEQUFxRCxDQUFDOzs7O0FBRzVGLE1BQU0sT0FBTyxhQUFhO0lBQ3hCLFlBQVksT0FBaUIsRUFBRSxNQUFpQjtRQUM5QyxPQUFPLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUU7Z0JBQ2pDLFlBQVksRUFBRSxJQUFJO2dCQUNsQixJQUFJLEVBQUU7b0JBQ0osRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUNQLE9BQU8sQ0FBQyxjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztpQkFDbEU7YUFDRixDQUFDLENBQUM7WUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNqRCxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2RCxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0MsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO3VHQWpCVSxhQUFhOzJHQUFiLGFBQWE7OzJGQUFiLGFBQWE7a0JBRHpCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN3VXBkYXRlIH0gZnJvbSAnQGFuZ3VsYXIvc2VydmljZS13b3JrZXInO1xyXG5pbXBvcnQgeyBNYXREaWFsb2cgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xyXG5pbXBvcnQgeyBVcGRhdGVEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuLi9jb21wb25lbnRzL3VwZGF0ZS1kaWFsb2cvdXBkYXRlLWRpYWxvZy5jb21wb25lbnQnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVXBkYXRlU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IodXBkYXRlczogU3dVcGRhdGUsIGRpYWxvZzogTWF0RGlhbG9nKSB7XHJcbiAgICB1cGRhdGVzLmF2YWlsYWJsZS5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XHJcbiAgICAgIGRpYWxvZy5vcGVuKFVwZGF0ZURpYWxvZ0NvbXBvbmVudCwge1xyXG4gICAgICAgIGRpc2FibGVDbG9zZTogdHJ1ZSxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICBjYjogKCkgPT5cclxuICAgICAgICAgICAgdXBkYXRlcy5hY3RpdmF0ZVVwZGF0ZSgpLnRoZW4oKCkgPT4gZG9jdW1lbnQubG9jYXRpb24ucmVsb2FkKCkpLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgICBjb25zb2xlLmxvZygnY3VycmVudCB2ZXJzaW9uIGlzJywgZXZlbnQuY3VycmVudCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdhdmFpbGFibGUgdmVyc2lvbiBpcycsIGV2ZW50LmF2YWlsYWJsZSk7XHJcbiAgICB9KTtcclxuICAgIHVwZGF0ZXMuYWN0aXZhdGVkLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coJ29sZCB2ZXJzaW9uIHdhcycsIGV2ZW50LnByZXZpb3VzKTtcclxuICAgICAgY29uc29sZS5sb2coJ25ldyB2ZXJzaW9uIGlzJywgZXZlbnQuY3VycmVudCk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19
