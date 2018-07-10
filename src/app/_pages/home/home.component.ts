import { Component, OnInit } from '@angular/core';
import { MainService } from '../../_services/main.service';
import { Observable } from 'rxjs';
import { Movie } from '../../_models/movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  movies: Observable<Movie[]>;
  resultsCount: Observable<number>;
  resultsPages: Observable<number>;
  searchQuery: Observable<string>;

  constructor(
    private _mainService: MainService
  ) {
    this.movies = this._mainService.$movies;
    this.resultsCount = this._mainService.$resultsCount;
    this.resultsPages = this._mainService.$pagesCount;
    this.searchQuery = this._mainService.$searchQuery;
  }

  ngOnInit() {
    this._mainService.getMovies('batman');
  }

}
