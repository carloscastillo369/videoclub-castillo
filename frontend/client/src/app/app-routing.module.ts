import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path:'',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path:'public',
    loadChildren: () => import('./modules/public/public.module').then(m => m.PublicModule),
    canActivate: [AuthGuard]
  },
  {
    path:'admin',
    loadChildren: () => import('./modules/admin/home/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
