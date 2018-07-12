import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavService {

  $favMovies: BehaviorSubject<any> = new BehaviorSubject<any>(
    this._readLocalStorage() ? this._readLocalStorage() : [] // read local storage for present app 
  );

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

    if (currentMovies.some((value: string) => value === id)) {

      const dupIndex = currentMovies.indexOf(id);
      currentMovies.splice(dupIndex, 1); //remove from fav
      newMovies = currentMovies;
      added = false;
    } else {
      newMovies = [id, ...currentMovies]; //add to fav
      added = true;
    }
    this.$favMovies.next(newMovies); // update fav movies value
    return added; // in card component updates fav status on card (addToFav())
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
