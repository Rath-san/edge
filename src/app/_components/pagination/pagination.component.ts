import { Component, OnInit } from '@angular/core';
import { MainService } from '../../_services/main.service';
import { of, Observable, BehaviorSubject } from 'rxjs';

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

  visiblePages: BehaviorSubject<number[]> = new BehaviorSubject<number[]>(null);

  constructor(
    private _mainService: MainService
  ) {
    this._mainService.$pagesCount.subscribe(y => {
      this.pagesCount = y;
    });    
    this.activePage = this._mainService.$activePage.subscribe(x => {
      this._mainService.getMovies(this._mainService.$searchQuery.getValue(), x);
      if (x === 1) {
        this.firstPageDeactivated = true
      } else {
        this.firstPageDeactivated = false
      }

      if (x === this.pagesCount) {
        this.lastPageDeactivated = true;
      } else {
        this.lastPageDeactivated = false;
      }
      this.populatePagination(x);
    });

  }

  ngOnInit() {
  }

  public populatePagination(pageNumber: number) {  
    const currentPage = pageNumber;
    let visiblePages = [];
    for (let index = currentPage - 3; index < currentPage + 3; index++) {      
      if (index > 0 && index <= this.pagesCount) {
        visiblePages.push(index);
      }
      this.visiblePages.next(visiblePages);
    }
  }
    goPage(page: number) {
      this._mainService.$activePage.next(page);
    }

    goFirst() {
      this._mainService.$activePage.next(1);
    }

    goPrev() {
      let page = this._mainService.$activePage.getValue();
      this._mainService.$activePage.next(page - 1);
    }

    goLast() {
      this._mainService.$activePage.next(this.pagesCount);
    }

    goNext() {
      let page = this._mainService.$activePage.getValue();
      this._mainService.$activePage.next(page + 1);
    }





  }
