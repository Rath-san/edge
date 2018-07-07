import { Injectable } from '@angular/core';
import { MainService } from './main.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private _mainService: MainService
  ) {}

  public searchTitle(title?: string) {
    this._mainService.getMovies(title);
  }




}
