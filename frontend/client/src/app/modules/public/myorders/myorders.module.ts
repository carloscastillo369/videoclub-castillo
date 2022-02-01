import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyordersRoutingModule } from './myorders-routing.module';
import { MyordersPageComponent } from './pages/myorders-page/myorders-page.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

//NgRx
import { EffectsModule } from '@ngrx/effects';
import { OrdersEffects } from 'src/app/state/orders/orders.effects';


@NgModule({
  declarations: [
    MyordersPageComponent
  ],
  imports: [
    CommonModule,
    MyordersRoutingModule,
    MaterialModule,
    SharedModule,
    EffectsModule.forFeature([OrdersEffects])
  ]
})
export class MyordersModule { }
