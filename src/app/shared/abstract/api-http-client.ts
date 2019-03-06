import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

export abstract class ApiHttpClient {
  protected constructor(
    protected _http: HttpClient,
    private readonly _baseUrl: string,
  ) {
    this._baseUrl = `${environment.apiUrl}/${this._baseUrl}`;
  }

  private static handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) { // client side error
      console.error('[ApiHttpClient] Client error:', error.error.message);
    } else { // request error
      console.error(`[ApiHttpClient] Server error (${error.status}):`, error.error);
    }
    return throwError('Network request failed');
  }

  protected get<T>(relativeUrl?: string): Observable<T> {
    const url = relativeUrl ? `${this._baseUrl}/${relativeUrl}` : this._baseUrl;
    return this._http.get<T>(url).pipe(
      catchError(ApiHttpClient.handleError),
    );
  }

  protected list<T>(relativeUrl?: string): Observable<T[]> {
    return this.get<T[]>(relativeUrl);
  }

  protected post<T>(body: any, relativeUrl?: string): Observable<T> {
    const url = relativeUrl ? `${this._baseUrl}/${relativeUrl}` : this._baseUrl;
    return this._http.post<T>(url, body).pipe(
      catchError(ApiHttpClient.handleError)
    );
  }
}
