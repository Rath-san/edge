import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  _inline: boolean;

  @Input('inline')
  set setType(v: boolean) {
    this._inline = v;
  }

  constructor() { }

  ngOnInit(): void {
  }

  get inline(): boolean {
    return this._inline;
  }

}
