import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesPageComponent } from './pages/movies-page/movies-page.component';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { UpdateMovieComponent } from './components/update-movie/update-movie.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

//NgRx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MOVIES_STATE_NAME } from 'src/app/state/movies/movies.selector';
import { MoviesReducer } from 'src/app/state/movies/movies.reducer';
import { MoviesEffects } from 'src/app/state/movies/movies.effects';


@NgModule({
  declarations: [
    MoviesPageComponent,
    AddMovieComponent,
    UpdateMovieComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    StoreModule.forFeature(MOVIES_STATE_NAME, MoviesReducer),
    EffectsModule.forFeature([MoviesEffects])
  ]
})
export class MoviesModule { }
