import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ApiHttpClient} from '../../../shared/abstract/api-http-client';
import {GallerySetAction} from '../state/gallery.actions';
import {Store} from "@ngxs/store";
import {PhotographModel} from "../state/gallery.model";

@Injectable()
export class GalleryService extends ApiHttpClient {
  constructor(
    private _store: Store,
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
