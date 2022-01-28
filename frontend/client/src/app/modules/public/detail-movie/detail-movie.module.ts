import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DetailMovieRoutingModule } from './detail-movie-routing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { DetailMoviePageComponent } from './pages/detail-movie-page/detail-movie-page.component';

//NgRx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MOVIES_STATE_NAME } from 'src/app/state/movies/movies.selector';
import { MoviesReducer } from 'src/app/state/movies/movies.reducer';
import { MoviesEffects } from 'src/app/state/movies/movies.effects';


@NgModule({
  declarations: [
    DetailMoviePageComponent
  ],
  imports: [
    CommonModule,
    DetailMovieRoutingModule,
    MaterialModule,
    SharedModule,
    FlexLayoutModule,
    StoreModule.forFeature(MOVIES_STATE_NAME, MoviesReducer),
    EffectsModule.forFeature([MoviesEffects])
  ]
})
export class DetailMovieModule { }
