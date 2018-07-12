import { Component, OnInit } from '@angular/core';
import { FavService } from '../../_services/fav.service';
import { MainService } from '../../_services/main.service';
import { ApiService } from '../../_services/api.service';
import { BehaviorSubject } from 'rxjs';
import { tap, take } from 'rxjs/operators';
import { ResponseMovieByID } from '../../_models/response';
import { Movie } from '../../_models/movie';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements OnInit {

  _favMovies = [];
  $favMovies: BehaviorSubject<any> = new BehaviorSubject<any>([])

  constructor(
    private _favService: FavService,
    private _apiService: ApiService
  ) {}

  ngOnInit() {
    this._getFavMovies();
  }

  public addToFav(id: string): void {
    this._favService.set(id);
  }

  get favouriteMoviesLength(): number {
    return this._favService.get().length
  }

  private _getFavMovies(): void {
    const params = this._favService.get()
    const favMovies = this._favService.$favMovies.getValue();
    favMovies.forEach(x => {
      this.seachMovie(x);
    });
  }

  public seachMovie(id: string): void {
    this._apiService.getMovieByID(id)
      .pipe(
        tap((movie: ResponseMovieByID) => {
          const favMovie = new Movie(movie.Title, movie.Year, movie.imdbID, movie.Type, movie.Poster, true)
          this._favMovies.push(favMovie);
          this.$favMovies.next(this._favMovies);
        }),
        take(1)
      )
      .subscribe();
  }

}
