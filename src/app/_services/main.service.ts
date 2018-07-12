import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, of } from 'rxjs';

import { tap, take, catchError } from 'rxjs/operators';
import { Movie } from '../_models/movie';
import { FavService } from './fav.service';
import { SearchComponent } from '../_components/search/search.component';
import { ErrorsService } from './errors.service';
import { ResponseSearch } from '../_models/response';

@Injectable({
  providedIn: 'root'
})

export class MainService {

  // array of movies (main content)
  $movies: BehaviorSubject<Movie[]> = new BehaviorSubject<Movie[]>([]);

  // searched phrase from search component
  $searchQuery: BehaviorSubject<string> = new BehaviorSubject<string>('batman');

  // static value 10 resultsin response batch
  resultsPerPage: number = 10;

  // total results changes with new search
  $resultsCount: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  // count of pages for pagination
  $pagesCount: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  // active page for pagination
  $activePage: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  constructor(
    private _apiService: ApiService,
    private _favService: FavService,
    private _errorsService: ErrorsService
  ) { }

  public getMovies(title: string, page: number): void {
    this._apiService.getMovie(title, page)
      .pipe(
        tap((search: ResponseSearch) => {
          if(search.Error) { // passes error string to search message
            this._errorsService.searchMessage.next(search.Error);
            this.$movies.next([]); // reset movies value
            return;
          } else {
            this._errorsService.searchMessage.next(null); // else resets search message
          }
          this.$resultsCount.next(search.totalResults); // updates totlResults
          this.$pagesCount.next(this.pagesCount(this.$resultsCount.getValue()));// updates pages
          const movies = search.Search.map(y => { // creates movie instances form response[]
            return new Movie(y.Title, y.Year, y.imdbID, y.Type, y.Poster, this._favService.checkIfFavourute(y.imdbID));
          })
          this.$movies.next(movies); //updates movies
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
