import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckOutGuard } from 'src/app/core/guards/checkout.guard';

const routes: Routes = [
  {
    path: 'movies',
    loadChildren: () => import('./list-movies/list-movies.module').then(m => m.ListMoviesModule)
  },
  {
    path: 'detailmovie/:id/:movieTitle',
    loadChildren: () => import('./detail-movie/detail-movie.module').then(m => m.DetailMovieModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then(m => m.CartModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule),
    canActivate: [CheckOutGuard]
  },
  {
    path: 'myorders',
    loadChildren: () => import('./myorders/myorders.module').then(m => m.MyordersModule)
  },
  {
    path:'',
    redirectTo:'/public/movies',
    pathMatch: 'full'
  },
  {
    path: '**',//TODO 404 cuando no existe la ruta
    redirectTo: '/public/movies'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
