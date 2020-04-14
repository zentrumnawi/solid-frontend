import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MatDialog } from '@angular/material/dialog';
import { UpdateDialogComponent } from '../components/update-dialog/update-dialog.component';

@Injectable()
export class UpdateService {
  constructor(updates: SwUpdate, dialog: MatDialog) {
    updates.available.subscribe(event => {
      dialog.open(UpdateDialogComponent, {
        disableClose: true,
        data: {
          cb: () =>
            updates.activateUpdate().then(() => document.location.reload())
        }
      });
      console.log('current version is', event.current);
      console.log('available version is', event.available);
    });
    updates.activated.subscribe(event => {
      console.log('old version was', event.previous);
      console.log('new version is', event.current);
    });
  }
}
