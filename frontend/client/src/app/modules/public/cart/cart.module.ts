import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CartRoutingModule } from './cart-routing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { CartPageComponent } from './pages/cart-page/cart-page.component';


@NgModule({
  declarations: [
    CartPageComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    MaterialModule,
    SharedModule,
    FlexLayoutModule
  ]
})
export class CartModule { }
