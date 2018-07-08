import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavService {


  $favMovies: BehaviorSubject<any> = new BehaviorSubject<any>(this._readLocalStorage() ? this._readLocalStorage() : []);

  constructor() {
    this.$favMovies
      .subscribe(res => {
        this._updateLocalStorage(res);
      });
  }

  public get() {
    return this._readLocalStorage();
  }

  public set(id: string): void {
    const currentMovies = this.$favMovies.getValue();
    let newMovies;

    if (currentMovies.some(s => s === id)) {
      const dupIndex = currentMovies.indexOf(id);
      currentMovies.splice(dupIndex, 1);
      newMovies = currentMovies;
    } else {
      newMovies = [id, ...currentMovies];
    }
    this.$favMovies.next(newMovies);

  }

  private _updateLocalStorage(x: string[]) {
    localStorage.setItem(
      'edge::favMovies', JSON.stringify(x)
    );
  }

  private _readLocalStorage() {
    return JSON.parse(localStorage.getItem('edge::favMovies'));
  }

}
