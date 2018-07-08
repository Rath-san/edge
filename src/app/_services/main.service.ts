import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';

import { tap, take } from 'rxjs/operators';
import { Movie } from '../_models/movie';
import { FavService } from './fav.service';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  $movies: BehaviorSubject<Movie[]> = new BehaviorSubject<Movie[]>([]);

  constructor(
    private _apiService: ApiService,
    private _favService: FavService
  ) {}

  public getMovies(title?: string): void {
    this._apiService.getMovie(title)
      .pipe(

        tap((search: any) => {
          const movies = search.Search.map(y => {            
            return new Movie(y.Title, y.Year, y.imdbID, y.Type, y.Poster, this._favService.checkIfFavourute(y.imdbID));
          })
          this.$movies.next(movies);
          
        }),
        take(1)
      )
      .subscribe();
  }
}
