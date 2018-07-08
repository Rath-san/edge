import { Component, OnInit } from '@angular/core';
import { MainService } from '../../_services/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  query: string = 'batman';

  constructor(
    private _mainService: MainService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.updateSearchQuery();
  }

  updateSearchQuery(): void {
    if (this.query) {
      console.log(this.query);
      this._mainService.getMovies(this.query);
    }
    this._goTo();
  }

  private _goTo() {
    this._router.navigateByUrl('/home')
  }

}
