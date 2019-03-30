import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {ApiHttpClient} from '../../../shared/abstract/api-http-client';
import {GallerySetAction} from '../state/gallery.actions';
import {GalleryAppState, PhotographModel} from '../state/gallery.model';

@Injectable()
export class GalleryService extends ApiHttpClient {
  constructor(
    private _store: Store<GalleryAppState>,
    httpClient: HttpClient,
  ) {
    super(httpClient, ['api', 'gallery']);
  }

  public loadGallery(): void {
    this.list<PhotographModel>().subscribe(photographs => {
      this._store.dispatch(new GallerySetAction(photographs));
    });
  }
}
