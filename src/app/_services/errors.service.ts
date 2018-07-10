import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  searchMessage: Subject<string> = new Subject<string>();
  popupMessage: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(
  ) {
  }
}
