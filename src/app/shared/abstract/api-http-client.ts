import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';

export abstract class ApiHttpClient {
  protected constructor(
    private _http: HttpClient,
    private readonly _baseUrl: string,
  ) {
    this._baseUrl = `https://api.geomat.uni-frankfurt.de/api/${this._baseUrl}`;
  }

  protected get<T>(): Observable<T> {
    return this._http.get<T>(this._baseUrl).pipe(
      catchError(this.handleError),
    );
  }

  protected list<T>(): Observable<T[]> {
    return this.get<T[]>();
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) { // client side error
      console.error('[ApiHttpClient] Client error:', error.error.message);
    } else { // request error
      console.error(`[ApiHttpClient] Server error (${error.status}):`, error.error);
    }
    return throwError('Network request failed');
  }
}
