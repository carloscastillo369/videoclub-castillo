import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ListMoviesRoutingModule } from './list-movies-routing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';

import { ListMoviesPageComponent } from './pages/list-movies-page/list-movies-page.component';

//NgRx
import { EffectsModule } from '@ngrx/effects';
import { MoviesEffects } from 'src/app/state/movies/movies.effects';
import { CardMovieComponent } from './components/card-movie/card-movie.component';


@NgModule({
  declarations: [
    ListMoviesPageComponent,
    CardMovieComponent
  ],
  imports: [
    CommonModule,
    ListMoviesRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    EffectsModule.forFeature([MoviesEffects])
  ]
})
export class ListMoviesModule { }
