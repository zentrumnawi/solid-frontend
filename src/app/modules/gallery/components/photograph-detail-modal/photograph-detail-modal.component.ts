import {BreakpointObserver} from '@angular/cdk/layout';
import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {select, Store} from '@ngrx/store';
import {BaseComponent} from '../../../../shared/abstract/base.component';
import {GalleryAppState, PhotographModel} from '../../state/gallery.model';
import {selectPhotographs} from '../../state/selectors';

@Component({
  selector: 'gallery-photograph-detail-modal',
  templateUrl: './photograph-detail-modal.component.html',
  styleUrls: ['./photograph-detail-modal.component.scss'],
})
export class PhotographDetailModalComponent extends BaseComponent {
  public Entry!: PhotographModel;
  public _entryIndex!: number;
  public ImageLoaded = false;
  private _entries!: PhotographModel[];

  constructor(
    store: Store<GalleryAppState>,
    private _dialogRef: MatDialogRef<PhotographDetailModalComponent>,
    breakpointObserver: BreakpointObserver,
    @Inject(MAT_DIALOG_DATA) private _entryId: number,
  ) {
    super();
    this.addSub(store.pipe(select(selectPhotographs)).subscribe(photographs => {
        this._entries = photographs;
        this._entries.forEach((entry, index) => {
          if (entry.id === this._entryId) {
            this._entryIndex = index;
            this.Entry = entry;
          }
        });
      }),
      breakpointObserver.observe(['(min-width: 600px)']).subscribe(matcher => {
        this._dialogRef.updateSize(matcher.matches ? '80%' : '100%');
        this._dialogRef.updatePosition();
      }),
    );
  }

  /**
   * Constructs the modal.
   */
  public static CreateModal(dialog: MatDialog, photographId: number): MatDialogRef<PhotographDetailModalComponent, any> {
    return dialog.open(PhotographDetailModalComponent, {
      minHeight: '100px',
      minWidth: '80%',
      maxWidth: '100%',
      data: photographId,
    });
  }

  public imageLoaded() {
    this.ImageLoaded = true;
  }

  public onCloseClick() {
    this._dialogRef.close();
  }

  public onPrevClick() {
    this._entryIndex = this._entryIndex === 0 ? this._entries.length - 1 : this._entryIndex - 1;
    this.Entry = this._entries[this._entryIndex];
    this.ImageLoaded = false;
  }

  public onNextClick() {
    this._entryIndex = this._entryIndex === this._entries.length - 1 ? 0 : this._entryIndex + 1;
    this.Entry = this._entries[this._entryIndex];
    this.ImageLoaded = false;
  }
}
