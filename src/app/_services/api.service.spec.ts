import { TestBed, inject } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ResponseSearch, ResponseMovieByID } from '../_models/response';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService],
      imports: [
        HttpClientTestingModule
      ]
    });

    service = TestBed.get(ApiService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));

  describe('#getMovie', () => {
    it('should return an Observable<ResponseSearch>', () => {
      const dummyResult = {
        response: true,
        search: [
          {
            Poster: "https://m.media-amazon.com/images/M/MV5BZmUwNGU2ZmItMmRiNC00MjhlLTg5YWUtODMyNzkxODYzMmZlXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg",
            Title: "Batman Begins",
            Type: "movie",
            Year: "2005",
            imdbID: "tt0372784"
          }
        ],
        totalResults: 343
      }

      service.getMovie('batman', 1).subscribe((result: ResponseSearch) => {
        expect(result.Response).toBeTruthy;
        expect(result.Search.length).toEqual(10);
        expect(result.Search[0]).toEqual(dummyResult);
        expect(result.totalResults).toBeGreaterThanOrEqual(343);
      })

      const req = httpMock.expectOne(`${service.API_ROOT}&s=batman&page=1`);
      expect(req.request.method).toBe("GET");
      req.flush(dummyResult);
    });
  });

  describe('#getMovieByID', () => {
    it('should return an Observable<ResponseMovieByID>', () => {
      const dummyResult = {
        Response: true,
        Title: 'Batman Begins',
        Type: 'movie',
        Year: '2005',
        imdbID: "tt0372784"
      }

      service.getMovieByID('tt0372784').subscribe((result: ResponseMovieByID) => {
        expect(result.Response).toBeTruthy;
        expect(result.Title).toEqual(dummyResult.Title);
        expect(result.Type).toEqual(dummyResult.Type);
        expect(result.Year).toEqual(dummyResult.Year);
        expect(result.imdbID).toEqual(dummyResult.imdbID);
      })

      const req = httpMock.expectOne(`${service.API_ROOT}&i=tt0372784`);
      expect(req.request.method).toBe("GET");
      req.flush(dummyResult);
    });
  });



});
