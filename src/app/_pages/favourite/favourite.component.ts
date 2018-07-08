import { Component, OnInit } from '@angular/core';
import { FavService } from '../../_services/fav.service';
import { MainService } from '../../_services/main.service';
import { ApiService } from '../../_services/api.service';
import { BehaviorSubject } from 'rxjs';
import { tap, take } from 'rxjs/operators';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements OnInit {

  _favMovies = [];
  $favMovies: BehaviorSubject<any> = new BehaviorSubject<any>([1, 2 ,3])

  constructor(
    private _favService: FavService,
    private _apiService: ApiService
  ) {
    this.getFavMovies();
  }

  ngOnInit() {
  }

  public addToFav(id: string) {
    this._favService.set(id);
  }

  get favouriteMoviesLength() {
    return this._favService.get().length
  }

  getFavMovies() {
    const params = this._favService.get()
    const favMovies = this._favService.$favMovies.getValue();
    favMovies.forEach(x => {
        this.seachMovie(x);
    })

  }

  public seachMovie(title) {
    // primise.all tutaj
    this._apiService.getMovieByID(title)
      .pipe(
        tap((x: any) => {
          console.log(x);
          this._favMovies.push(x)
          this.$favMovies.next(this._favMovies);
        }),
        take(1)
      )
      .subscribe();
  }

}
