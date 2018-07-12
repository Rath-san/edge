import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ResponseSearch, ResponseMovieByID } from '../_models/response';

import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public API_URL: string = environment.serverUrl;
  private _API_KEY: string = '21108c99';
  public API_ROOT: string = `${this.API_URL}?apikey=${this._API_KEY}`;

  constructor(
    private _http: HttpClient
  ) { }

  public getMovie(title: string, page: number = 1): Observable<ResponseSearch> {
    const params = {
      's': title,
      'page': `${page}`
    }
    return this._http.get<ResponseSearch>(this.API_ROOT, { params });
  }

  public getMovieByID(id: string): Observable<ResponseMovieByID> {
    const params = {
      'i': id
    }
    return this._http.get<ResponseMovieByID>(this.API_ROOT, { params });
  }

}
