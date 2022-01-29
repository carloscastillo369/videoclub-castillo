import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'list',
    loadChildren: () => import('../movies/movies.module').then(m => m.MoviesModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('../orders/orders.module').then(m => m.OrdersModule)
  },
  {
    path:'',
    redirectTo:'/admin/list',
    pathMatch: 'full'
  },
  {
    path: '**',//TODO 404 cuando no existe la ruta
    redirectTo: '/admin/list'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
