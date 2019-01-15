import {Component} from '@angular/core';
import {MatDialog} from '@angular/material';
import {select, Store} from '@ngrx/store';
import {BaseComponent} from '../../../../shared/abstract/base.component';
import {PhotographService} from '../../services/photograph.service';
import {GalleryAppState, PhotographModel} from '../../state/gallery.model';
import {selectPhotographs} from '../../state/selectors';
import {PhotographDetailModalComponent} from '../photograph-detail-modal/photograph-detail-modal.component';

@Component({
  selector: 'gallery-gallery-overview',
  templateUrl: './gallery-overview.component.html',
  styleUrls: ['./gallery-overview.component.scss'],
})
export class GalleryOverviewComponent extends BaseComponent {
  public Entries: PhotographModel[] = [];
  public EntriesLoaded: boolean[] = [];

  constructor(
    service: PhotographService,
    store: Store<GalleryAppState>,
    private _dialog: MatDialog,
  ) {
    super();
    service.loadGallery();
    this.addSub(store.pipe(select(selectPhotographs)).subscribe(photographs => {
      this.Entries = photographs;
      this.EntriesLoaded = photographs.map(() => false);
      // if (photographs.length > 0 && !photographs[0].image_file_loaded.small) {
      //   service.loadSmallImage(photographs[0]);
      // }
    }));
  }

  imageLoaded(e: Event, index: number) {
    this.EntriesLoaded[index] = true;
  }

  public onCardClick(entry: PhotographModel) {
    this._dialog.open(PhotographDetailModalComponent, {
      minHeight: '100px',
      minWidth: '250px',
      data: entry,
    });

  }
}
