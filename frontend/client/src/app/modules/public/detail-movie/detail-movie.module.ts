import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DetailMovieRoutingModule } from './detail-movie-routing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { DetailMoviePageComponent } from './pages/detail-movie-page/detail-movie-page.component';

//NgRx
import { EffectsModule } from '@ngrx/effects';
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
    EffectsModule.forFeature([MoviesEffects])
  ]
})
export class DetailMovieModule { }
