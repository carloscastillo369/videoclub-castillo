import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DetailMovieRoutingModule } from './detail-movie-routing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';

import { DetailMoviePageComponent } from './pages/detail-movie-page/detail-movie-page.component';
import { ButtonsFunctionComponent } from './components/buttons-function/buttons-function.component';
import { ModalRentalTimeComponent } from './components/modal-rental-time/modal-rental-time.component';
import { ModalTrailerComponent } from './components/modal-trailer/modal-trailer.component';

//NgRx
import { EffectsModule } from '@ngrx/effects';
import { MoviesEffects } from 'src/app/state/movies/movies.effects';


@NgModule({
  declarations: [
    DetailMoviePageComponent,
    ButtonsFunctionComponent,
    ModalRentalTimeComponent,
    ModalTrailerComponent
  ],
  imports: [
    CommonModule,
    DetailMovieRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    FlexLayoutModule,
    EffectsModule.forFeature([MoviesEffects])
  ]
})
export class DetailMovieModule { }
