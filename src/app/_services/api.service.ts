import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // example
  // http://www.omdbapi.com/?i=tt3896198&apikey=21108c99

  apiKey: string = '21108c99';

  apiRoot: string = `http://www.omdbapi.com/?apikey=${this.apiKey}`;

  constructor(
    private _http: HttpClient
  ) { }

  getMovie(title?: string) {
    let params;
    if (title) {
      params = {
        's': title
      }
    }
    return this._http.get(this.apiRoot, { params });
  }

  getMovieByID(id: string) {
    let params
    if(id) {
      params = {
        'i': id
      }
    }
    return this._http.get(this.apiRoot, { params });
  }


}
