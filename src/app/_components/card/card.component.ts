import { Component, OnInit, Input } from '@angular/core';
import { FavService } from '../../_services/fav.service';
import { Movie } from '../../_models/movie';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() movie:Movie;

  _inline: boolean;

  @Input('inline')
  set setType(v: boolean) {
    this._inline = v;
  }

  constructor(
    private _favService: FavService
  ) { }

  ngOnInit(): void {
  }

  get inline(): boolean {
    return this._inline;
  }

  // set fav(v: boolean) {

  // }

  public addToFav(id: string) {
    // this._favService.set(id);
    this.movie.favourites(this._favService.set(id));
  }

}
