import {Component} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {BaseComponent} from '../../../../shared/abstract/base.component';
import {GalleryService} from '../../services/gallery.service';
import {GalleryAppState, PhotographModel} from '../../state/gallery.model';
import {selectPhotographs} from '../../state/selectors';
import {Router} from "@angular/router";

@Component({
  selector: 'gallery-gallery-overview',
  templateUrl: './gallery-overview.component.html',
  styleUrls: ['./gallery-overview.component.scss'],
})
export class GalleryOverviewComponent extends BaseComponent {
  public Entries: PhotographModel[] = [];
  public EntriesLoaded: boolean[] = [];

  constructor(
    service: GalleryService,
    store: Store<GalleryAppState>,
    private _router: Router,
  ) {
    super();
    service.loadGallery();
    this.addSub(store.pipe(select(selectPhotographs)).subscribe(photographs => {
      this.Entries = photographs;
      this.EntriesLoaded = photographs.map((val, index) => {
        if (this.EntriesLoaded.length > index) {
          return this.EntriesLoaded[index]
        }
        return false;
      });
    }));
  }

  imageLoaded(e: Event, index: number) {
    this.EntriesLoaded[index] = true;
  }

  public onCardClick(entry: PhotographModel) {
    this._router.navigateByUrl(`/profile/img/${entry.id}`);
  }
}
