import { Component } from '@angular/core';
import { MainService } from '../../_services/main.service';
import { of, Observable, BehaviorSubject, forkJoin, combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  activePage
  pagesCount

  firstPageDeactivated: boolean;
  lastPageDeactivated: boolean;

  pageInputOpen: boolean = false;

  visiblePages: BehaviorSubject<number[]> = new BehaviorSubject<number[]>(null);

  constructor(
    private _mainService: MainService
  ) {
    combineLatest(
      this._mainService.$pagesCount,
      this._mainService.$activePage
    )
      .subscribe(([y, x]) => {
        this.pagesCount = y;
        this.activePage = x;
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

  public populatePagination(pageNumber: number): void {
    const currentPage = pageNumber;
    let visiblePages = [];
    for (let index = currentPage - 3; index < currentPage + 3; index++) {
      if (index > 0 && index <= this.pagesCount) {
        visiblePages.push(index);
      }
      this.visiblePages.next(visiblePages);
    }
  }
  goPage(page: number): void {
    this._mainService.$activePage.next(page);
    this._search();
  }

  goFirst(): void {
    this._mainService.$activePage.next(1);
    this._search();
  }

  goPrev(): void {
    let page = this._mainService.$activePage.getValue();
    this._mainService.$activePage.next(page - 1);
    this._search();
  }

  goLast(): void {
    this._mainService.$activePage.next(this.pagesCount);
    this._search();
  }

  goNext(): void {
    let page = this._mainService.$activePage.getValue();
    this._mainService.$activePage.next(page + 1);
    this._search();
  }

  public openPageInput(): void {
    this.pageInputOpen = !this.pageInputOpen;
  }

  public gotoSpecificPageOnKeyUp(value: number, event?: KeyboardEvent): void {
    if (event.keyCode == 13) {
      this._mainService.$activePage.next(Number(value));
      this._search();
      this.openPageInput();
    }
  }
  public gotoSpecificPageOnBlur(value: number): void {
      this._mainService.$activePage.next(Number(value));
      this._search();
      this.openPageInput();
  }

  private _search(): void {
    this._mainService.getMovies(this._mainService.$searchQuery.getValue(), this.activePage);
  }






}
