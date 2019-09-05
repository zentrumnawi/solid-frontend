import {Component} from '@angular/core';
import {BaseComponent} from '../../../../shared/abstract/base.component';
import {GalleryService} from '../../services/gallery.service';
import {PhotographModel} from '../../state/gallery.model';
import {Store} from "@ngxs/store";
import {GalleryState} from "../../state/gallery.state";
import {Navigate} from "@ngxs/router-plugin";

@Component({
  selector: 'gallery-gallery-overview',
  templateUrl: './gallery-overview.component.html',
  styleUrls: ['./gallery-overview.component.scss'],
})
export class GalleryOverviewComponent extends BaseComponent {
  public Entries: PhotographModel[] = [];
  public EntriesLoaded: { [key: number]: boolean } = {};
  public SortAscending = false;
  private _entriesOriginal: PhotographModel[] = [];

  constructor(
    service: GalleryService,
    private _store: Store,
  ) {
    super();
    service.loadGallery();
    this.addSub(this._store.select(GalleryState.getGalleryEntries).subscribe(v => {
      this._entriesOriginal = v;
      this.Entries = v;
      v.forEach(entry => {
        if (this.EntriesLoaded[entry.id] === undefined) {
          this.EntriesLoaded[entry.id] = false;
        }
      });
    }));
  }

  imageLoaded(e: Event, entry: PhotographModel) {
    this.EntriesLoaded[entry.id] = true;
  }

  public onCardClick(entry: PhotographModel) {
    this._store.dispatch(new Navigate(['/profile/img/', entry.id]));
  }

  toggleSort() {
    this.SortAscending = !this.SortAscending;
    if (this.SortAscending) {
      console.log('first');
      this.Entries = [...this.Entries];
      this.Entries.sort((a, b) => a.handpiece.name.localeCompare(b.handpiece.name));
    } else {
      this.Entries = this._entriesOriginal;
    }
  }
}
