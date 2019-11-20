import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ApiHttpClient} from '../../../shared/abstract/api-http-client';
import {PhotographModel} from "../state/gallery.model";
import {Observable} from "rxjs";

@Injectable()
export class GalleryService extends ApiHttpClient {
  constructor(
    httpClient: HttpClient,
  ) {
    super(httpClient, ['api', 'gallery']);
  }

  public loadGallery(): Observable<PhotographModel[]> {
    return this.list<PhotographModel>();
  }
}
