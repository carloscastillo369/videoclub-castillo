import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersRoutingModule } from './orders-routing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';

//NgRx
import { EffectsModule } from '@ngrx/effects';
import { OrdersEffects } from 'src/app/state/orders/orders.effects';


@NgModule({
  declarations: [
    OrdersPageComponent,
    OrderDetailComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    MaterialModule,
    SharedModule,
    FlexLayoutModule,
    EffectsModule.forFeature([OrdersEffects])
  ]
})
export class OrdersModule { }
