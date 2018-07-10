import { Component, OnInit } from '@angular/core';
import { MainService } from '../../_services/main.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  activePage
  pagesCount

  firstPageDeactivated: boolean;
  lastPageDeactivated: boolean;

  constructor(
    private _mainService: MainService
  ) {
    this.pagesCount = this._mainService.$pagesCount;
    this.activePage = this._mainService.$activePage.subscribe(x => {
      this._mainService.getMovies(this._mainService.$searchQuery.getValue(), x);
      if(x === 1) {
        this.firstPageDeactivated = true
      } else {
        this.firstPageDeactivated = false
      }

      if(x === this.pagesCount.getValue()) {
        this.lastPageDeactivated = true;
      } else {
        this.lastPageDeactivated = false;
      }
    })
    
  }

  ngOnInit() {
  }

  goPage(page: number) {
    console.log(`go to ${page}`);
  }


  goFirst() {
    console.log('first');
    this._mainService.$activePage.next(1);
  }

  goLast() {
    console.log('last');
    this._mainService.$activePage.next(this.pagesCount.getValue());
  }

  goNext() {
    let page = this._mainService.$activePage.getValue();

    this._mainService.$activePage.next(page + 1);
  }

  goPrev() {
    let page = this._mainService.$activePage.getValue();
    this._mainService.$activePage.next(page - 1);
  }



}
