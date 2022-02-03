import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';

//NgRx
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from 'src/app/state/user/user.effects';
import { OrdersEffects } from 'src/app/state/orders/orders.effects';


@NgModule({
  declarations: [
    CheckoutPageComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    MaterialModule,
    SharedModule,
    FlexLayoutModule,
    EffectsModule.forFeature([UserEffects, OrdersEffects])
  ]
})
export class CheckoutModule { }
