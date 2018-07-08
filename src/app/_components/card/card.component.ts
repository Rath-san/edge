import { Component, OnInit, Input } from '@angular/core';
import { FavService } from '../../_services/fav.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() movie;

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

  get fav() {
    return true;
  }

  // set fav(v: boolean) {

  // }

  public addToFav(id: string) {
    this._favService.set(id);
  }

}
