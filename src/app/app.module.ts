import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './_pages/home/home.component';
import { FavouriteComponent } from './_pages/favourite/favourite.component';
import { BannerComponent } from './_components/banner/banner.component';
import { NavbarComponent } from './_components/navbar/navbar.component';
import { SearchComponent } from './_components/search/search.component';
import { CardComponent } from './_components/card/card.component';
import { PaginationComponent } from './_components/pagination/pagination.component';
import { PageNotFoundComponent } from './_pages/errors/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FavouriteComponent,
    BannerComponent,
    NavbarComponent,
    SearchComponent,
    CardComponent,
    PaginationComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
