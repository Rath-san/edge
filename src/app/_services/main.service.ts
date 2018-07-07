import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';

import { tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  $movies: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private _apiService: ApiService
  ) {

  }

  public getMovies(title?: string): void {
    this._apiService.getData(title)
      .pipe(

        tap((search: any) => {
          console.log(search.Search)
          this.$movies.next(search.Search);
        }),
        take(1)
      )
      .subscribe();
  }
}
