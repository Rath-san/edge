import { TestBed, inject } from '@angular/core/testing';

import { MainService } from './main.service';
import { ApiService } from './api.service';
import { ErrorsService } from './errors.service';
import { FavService } from './fav.service';

class MockApiService {

}
class MockFavService {

}
class MockErrorService {

}

describe('MainService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MainService,
        { provide: ApiService, useClass: MockApiService },
        { provide: FavService, useClass: MockFavService },
        { provide: ErrorsService, useClass: MockErrorService }
      ]
    });
  });

  it('should be created', inject([MainService], (service: MainService) => {
    expect(service).toBeTruthy();
  }));

});
