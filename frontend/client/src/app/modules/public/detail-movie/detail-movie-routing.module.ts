import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailMoviePageComponent } from './pages/detail-movie-page/detail-movie-page.component';

const routes: Routes = [
  {
    path: '',
    component: DetailMoviePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailMovieRoutingModule { }
