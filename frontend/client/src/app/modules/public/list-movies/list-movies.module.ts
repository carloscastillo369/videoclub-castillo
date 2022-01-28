import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ListMoviesRoutingModule } from './list-movies-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { ListMoviesPageComponent } from './pages/list-movies-page/list-movies-page.component';

//NgRx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MOVIES_STATE_NAME } from 'src/app/state/movies/movies.selector';
import { MoviesReducer } from 'src/app/state/movies/movies.reducer';
import { MoviesEffects } from 'src/app/state/movies/movies.effects';


@NgModule({
  declarations: [
    ListMoviesPageComponent
  ],
  imports: [
    CommonModule,
    ListMoviesRoutingModule,
    SharedModule,
    FlexLayoutModule,
    StoreModule.forFeature(MOVIES_STATE_NAME, MoviesReducer),
    EffectsModule.forFeature([MoviesEffects])
  ]
})
export class ListMoviesModule { }
