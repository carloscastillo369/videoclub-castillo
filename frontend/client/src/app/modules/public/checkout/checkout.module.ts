import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';

//NgRx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { USER_STATE_NAME } from 'src/app/state/user/user.selector';
import { UserReducer } from 'src/app/state/user/user.reducer';
import { UserEffects } from 'src/app/state/user/user.effects';


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
    StoreModule.forFeature(USER_STATE_NAME, UserReducer),
    EffectsModule.forFeature([UserEffects])
  ]
})
export class CheckoutModule { }
