import {Component, ElementRef, ViewChild} from '@angular/core';
import {BaseComponent} from '../../../../shared/abstract/base.component';
import {PhotographModel} from '../../state/gallery.model';
import {Store} from '@ngxs/store';
import {GalleryState} from '../../state/gallery.state';
import {Navigate} from '@ngxs/router-plugin';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {GalleryLoadAction} from '../../state/gallery.actions';

@Component({
  selector: 'gallery-gallery-overview',
  templateUrl: './gallery-overview.component.html',
  styleUrls: ['./gallery-overview.component.scss'],
  animations: [
    trigger('searchInOut', [
      state('false', style({width: 0})),
      state('true', style({width: '5em'})),
      transition('* => *', animate('500ms ease')),
    ]),
  ]
})
export class GalleryOverviewComponent extends BaseComponent {
  @ViewChild('searchInput', {static: false}) searchInputRef?: ElementRef;
  public Entries: PhotographModel[] = [];
  public EntriesLoaded: { [key: number]: boolean } = {};
  public LoadingCompleted = false;
  public SortAscending = false;
  public SearchValue = '';
  public SearchVisible = false;
  private _entriesUnsorted: PhotographModel[] = [];
  private _entriesSorted: PhotographModel[] = [];

  constructor(
    private _store: Store,
  ) {
    super();
    this._store.dispatch(new GalleryLoadAction());
    this.addSub(this._store.select(GalleryState.getGalleryEntries).subscribe(v => {
      if (v.length > 0) {
        this.LoadingCompleted = true;
      }
      this.Entries = v;
      this._entriesUnsorted = v;
      this._entriesSorted = [...v];
      this._entriesSorted.sort((a, b) => a.handpiece.name.localeCompare(b.handpiece.name));
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
      this.Entries = this._entriesSorted;
    } else {
      this.Entries = this._entriesUnsorted;
    }
  }

  onSearchChange(searchValue: string) {
    const toFilter = this.SortAscending ? this._entriesSorted : this._entriesUnsorted;
    const regExp = new RegExp(searchValue, 'i');
    this.Entries = toFilter.filter(e => {
      return e.handpiece.mineral_type.find(mineral => {
        if (mineral.minerals.match(regExp)) {
          return true;
        }
        if (mineral.trivial_name.match(regExp)) {
          return true;
        }
        if (mineral.variety.match(regExp)) {
          return true;
        }
        return false;
      }) !== undefined;
    });
  }

  public onSearchToggleClick() {
    this.SearchVisible = !this.SearchVisible;
    if (this.SearchVisible && this.searchInputRef && this.searchInputRef.nativeElement) {
      this.searchInputRef.nativeElement.focus();
    }
  }
}
