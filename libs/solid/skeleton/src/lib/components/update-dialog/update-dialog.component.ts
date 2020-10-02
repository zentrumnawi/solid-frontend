import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'solid-skeleton-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.scss'],
})
export class UpdateDialogComponent {
  private readonly cb: () => void;
  constructor(
    private _ref: MatDialogRef<UpdateDialogComponent>,
    /** Inject the required service function to prevent a circular dependency between the Component and the service */
    // callback is defined as any to prevent ng-packagr issues
    // { cb: () => void }
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.cb = data.cb;
  }

  onCancelClick() {
    this._ref.close();
  }

  onOkClick() {
    this.cb();
    this._ref.close();
  }
}
