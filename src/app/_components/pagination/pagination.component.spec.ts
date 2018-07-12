import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';
import { MainService } from '../../_services/main.service';
import { of, BehaviorSubject } from 'rxjs';

class MockMainService {
  $pagesCount: BehaviorSubject<number> = new BehaviorSubject<number>(10);
  $activePage: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  $searchQuery: BehaviorSubject<string> = new BehaviorSubject<string>('search term');
}

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationComponent ],
      providers: [
        {provide: MainService, useClass: MockMainService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
