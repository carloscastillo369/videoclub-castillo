import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { RouterModule } from '@angular/router';

import { CartWidgetComponent } from './components/cart-widget/cart-widget.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OrdersTableComponent } from './components/orders-table/orders-table.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';

//NgRx
import { EffectsModule } from '@ngrx/effects';
import { CartEffects } from 'src/app/state/cart/cart.effects';


@NgModule({
  declarations: [
    CartWidgetComponent,
    FooterComponent,   
    LoadingSpinnerComponent,
    NavbarComponent,
    OrdersTableComponent, 
    SidenavComponent,
    SnackBarComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,    
    MaterialModule,
    RouterModule,
    EffectsModule.forFeature([CartEffects])
  ],
  exports: [
    FooterComponent,   
    LoadingSpinnerComponent,
    NavbarComponent,
    OrdersTableComponent, 
    SidenavComponent,
    SnackBarComponent
  ]
})
export class SharedModule { }
