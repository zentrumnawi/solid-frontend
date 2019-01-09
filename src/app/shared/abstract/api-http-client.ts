import {HttpClient, HttpErrorResponse} from '@angular/common/http';

export abstract class ApiHttpClient {
  protected constructor(
    private _http: HttpClient,
    private readonly _baseUrl: string,
  ) {
    this._baseUrl = `https://api.geomat.uni-frankfurt.de/api/${this._baseUrl}`;
  }

  protected async get<T>(): Promise<T> {
    try {
      const response = await this._http.get<T>(this._baseUrl).toPromise();
      return response as T;
    } catch (ex) {
      const error = ex as HttpErrorResponse;
      throw error; // TODO: Handle errors!!!
    }
  }

  protected list<T>(): Promise<T[]> {
    return this.get<T[]>();
  }
}
