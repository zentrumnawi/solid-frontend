import {Component} from '@angular/core';
import {BaseComponent} from '../../../../shared/abstract/base.component';
import {GalleryService} from '../../services/gallery.service';
import {PhotographModel} from '../../state/gallery.model';
import {Router} from "@angular/router";
import {Store} from "@ngxs/store";
import {GalleryState} from "../../state/gallery.state";

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
    private _router: Router,
    store: Store,
  ) {
    super();
    service.loadGallery();
    this.addSub(store.select(GalleryState.getGalleryEntries).subscribe(v => {
      this.Entries = v;
      this.EntriesLoaded = v.map((val, index) => {
        if (this.EntriesLoaded.length > index) {
          return this.EntriesLoaded[index];
        }
        return false;
      })
    }));
  }

  imageLoaded(e: Event, index: number) {
    this.EntriesLoaded[index] = true;
  }

  public onCardClick(entry: PhotographModel) {
    this._router.navigateByUrl(`/profile/img/${entry.id}`);
  }
}
