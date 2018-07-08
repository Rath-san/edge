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

  public set(id: string): boolean {
    const currentMovies = this.$favMovies.getValue();
    let newMovies;
    let added;

    if (currentMovies.some(s => s === id)) {
      const dupIndex = currentMovies.indexOf(id); //remove from fav
      currentMovies.splice(dupIndex, 1);
      newMovies = currentMovies;
      this.$favMovies.next(newMovies);
      added = false;
    } else {
      newMovies = [id, ...currentMovies]; //add tofav
      added = true;
    }
    this.$favMovies.next(newMovies);
    return added;
  }

  private _updateLocalStorage(x: string[]) {
    localStorage.setItem(
      'edge::favMovies', JSON.stringify(x)
    );
  }

  private _readLocalStorage() {
    return JSON.parse(localStorage.getItem('edge::favMovies'));
  }

  public checkIfFavourute(id): boolean {
    if(this._readLocalStorage().includes(id)){
      return true;
    } else {
      return false;
    }
  }

}
