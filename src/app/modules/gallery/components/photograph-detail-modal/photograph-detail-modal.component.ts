import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PhotographModel} from '../../state/gallery.model';

@Component({
  selector: 'gallery-photograph-detail-modal',
  templateUrl: './photograph-detail-modal.component.html',
  styleUrls: ['./photograph-detail-modal.component.scss'],
})
export class PhotographDetailModalComponent {
  public ImageLoaded = false;

  constructor(
    private _dialogRef: MatDialogRef<PhotographDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public Entry: PhotographModel,
  ) {

  }

  public imageLoaded() {
    this.ImageLoaded = true;
  }

  public onCloseClick() {
    this._dialogRef.close();
  }
}
