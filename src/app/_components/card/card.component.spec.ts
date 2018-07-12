import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { Movie, Type } from '../../_models/movie';
import { ImageNotFoundPipe } from '../../_pipes/image-not-found.pipe';



let movie: Movie;

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  movie = new Movie('movie title', '1999', 'ttimbdID', Type.movie, 'http url', false);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CardComponent,
        ImageNotFoundPipe
      ]
      // providers: [
        
      // ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.movie = movie;
    fixture.detectChanges();
  });

  it('should create', () => {
    // component
    expect(component).toBeTruthy();
  });
});
