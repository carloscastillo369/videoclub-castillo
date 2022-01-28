import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyordersPageComponent } from './pages/myorders-page/myorders-page.component';

const routes: Routes = [{
  path: '',
  component: MyordersPageComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyordersRoutingModule { }
