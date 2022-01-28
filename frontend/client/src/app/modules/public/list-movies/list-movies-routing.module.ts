import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListMoviesPageComponent } from './pages/list-movies-page/list-movies-page.component';

const routes: Routes = [
  {
    path: '',
    component: ListMoviesPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListMoviesRoutingModule { }
