import { Injectable } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { MatDialog } from '@angular/material/dialog';
import { UpdateDialogComponent } from '../components/update-dialog/update-dialog.component';

@Injectable()
export class UpdateService {
  constructor(updates: SwUpdate, dialog: MatDialog) {
    updates.versionUpdates.subscribe((event) => {
      if (event.type === 'VERSION_READY') {
        dialog.open(UpdateDialogComponent, {
          disableClose: true,
          data: {
            cb: () =>
              updates.activateUpdate().then(() => {
                console.log('old version was', (event as VersionReadyEvent).currentVersion);
                console.log('new version is', (event as VersionReadyEvent).latestVersion);
                document.location.reload();
              }),
          },
        });
      }
    });
  }
}
