import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';

import { tap, take } from 'rxjs/operators';
import { Movie } from '../_models/movie';
import { FavService } from './fav.service';
import { SearchComponent } from '../_components/search/search.component';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  $movies: BehaviorSubject<Movie[]> = new BehaviorSubject<Movie[]>([]);
  $searchQuery: BehaviorSubject<string> = new BehaviorSubject<string>('batman');


  resultsPerPage: number = 10;
  $resultsCount: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  $pagesCount: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  $activePage: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  constructor(
    private _apiService: ApiService,
    private _favService: FavService
  ) { }

  public getMovies(title?: string, page?: number): void {
    this._apiService.getMovie(title, page)
      .pipe(

        tap((search: any) => {
          this.$resultsCount.next(search.totalResults);
          // this.pagesCount(search.totalResults)
          this.$pagesCount.next(this.$resultsCount.getValue());
          const movies = search.Search.map(y => {
            return new Movie(y.Title, y.Year, y.imdbID, y.Type, y.Poster, this._favService.checkIfFavourute(y.imdbID));
          })
          this.$movies.next(movies);
        }),
        take(1)
      )
      .subscribe();
  }

  
  // pagination
    private pagesCount(input: number): number {
      const pages = input / this.resultsPerPage;
      return Math.ceil(pages)
    }

    
}
