import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';
import { PublicGuard } from './core/guards/public.guard';

const routes: Routes = [
  {
    path:'',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path:'public',
    loadChildren: () => import('./modules/public/public.module').then(m => m.PublicModule),
    data: {expectedRole: false},
    canActivate: [PublicGuard]
  },
  {
    path:'admin',
    loadChildren: () => import('./modules/admin/home/admin.module').then(m => m.AdminModule),
    data: {expectedRole: true},
    canActivate: [AdminGuard]
  },
  {
    path:'',
    redirectTo:'/',
    pathMatch: 'full'
  },
  {
    path: '**',//TODO 404 cuando no existe la ruta
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
