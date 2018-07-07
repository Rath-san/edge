import { Component, OnInit } from '@angular/core';
import { MainService } from '../../_services/main.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  query: string = 'deadpool';

  constructor(
    private _mainService: MainService
  ) { }

  ngOnInit() {
    this.updateSearchQuery();
  }

  updateSearchQuery(): void {
    if (this.query) {
      console.log(this.query);
      this._mainService.getMovies(this.query);
    }
  }

}
