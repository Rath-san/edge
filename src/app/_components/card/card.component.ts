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

  private _inline: boolean;

  @Input('inline')
  set setType(value: boolean) {
    this._inline = value;
  }

  constructor(
    private _favService: FavService
  ) { }

  ngOnInit(): void {
  }

  get inline(): boolean {
    return this._inline;
  }

  public addToFav(id: string) {
    this.movie.favourites(this._favService.set(id));
  }

}
