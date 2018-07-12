import { Component } from '@angular/core';
import { MainService } from '../../_services/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  query: string;

  constructor(
    private _mainService: MainService,
    private _router: Router
  ) { }

  updateSearchQuery(): void { //todo simplification
    if (this.query) {
      this._mainService.$searchQuery.next(this.query);
      this._mainService.$activePage.next(1);
      this._mainService.getMovies(this.query, 1);
      this._goTo();
    }
  }

  updateSearchQueryOnKeyUp(event: KeyboardEvent): void { //todo simplification
    if (this.query && event.keyCode === 13) {
      this._mainService.$searchQuery.next(this.query);
      this._mainService.$activePage.next(1);
      this._mainService.getMovies(this.query, 1);
      this._goTo();
    }
  }

  private _goTo() {
    this._router.navigateByUrl('/home')
  }

}
