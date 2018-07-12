import { TestBed, inject } from '@angular/core/testing';

import { SearchService } from './search.service';
import { MainService } from './main.service';

class MockMainService {

}

describe('SearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SearchService,
        {provide: MainService, useClass: MockMainService}
      ]
    });
  });

  it('should be created', inject([SearchService], (service: SearchService) => {
    expect(service).toBeTruthy();
  }));
});
