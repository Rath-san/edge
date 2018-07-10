import { Component, OnInit } from '@angular/core';
import { MainService } from '../../_services/main.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  movies: Observable<any>;
  resultsCount: Observable<number>;

  constructor(
    private _mainService: MainService
  ) {
    this.movies = this._mainService.$movies;
    this.resultsCount = this._mainService.$resultsCount;
  }

  ngOnInit() {
    this._mainService.getMovies('batman');
  }

}
