import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CartRoutingModule } from './cart-routing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';

import { CartPageComponent } from './pages/cart-page/cart-page.component';

//NgRx
import { EffectsModule } from '@ngrx/effects';
import { CartEffects } from 'src/app/state/cart/cart.effects';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { CartTableComponent } from './components/cart-table/cart-table.component';


@NgModule({
  declarations: [
    CartPageComponent,
    CartSummaryComponent,
    CartTableComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    FlexLayoutModule,
    EffectsModule.forFeature([CartEffects])
  ]
})
export class CartModule { }
