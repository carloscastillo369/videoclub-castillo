import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MaterialModule } from './material/material.module';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { CartWidgetComponent } from './components/cart-widget/cart-widget.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { FooterComponent } from './components/footer/footer.component';
import { CardMovieComponent } from './components/card-movie/card-movie.component';
import { ButtonsFunctionComponent } from './components/buttons-function/buttons-function.component';
import { ModalTrailerComponent } from './components/modal-trailer/modal-trailer.component';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { CartTableComponent } from './components/cart-table/cart-table.component';
import { ModalRentalTimeComponent } from './components/modal-rental-time/modal-rental-time.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { OrdersTableComponent } from './components/orders-table/orders-table.component';



@NgModule({
  declarations: [
    SnackBarComponent,
    NavbarComponent,
    CartWidgetComponent,
    SidenavComponent,
    FooterComponent,
    CardMovieComponent,
    ButtonsFunctionComponent,
    ModalTrailerComponent,
    CartSummaryComponent,
    CartTableComponent,
    ModalRentalTimeComponent,
    LoadingSpinnerComponent,
    OrdersTableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FlexLayoutModule,
    FormsModule
  ],
  exports: [
    SnackBarComponent,
    NavbarComponent,
    CartWidgetComponent,
    SidenavComponent,
    FooterComponent,
    CardMovieComponent,
    ButtonsFunctionComponent,
    CartSummaryComponent,
    CartTableComponent,
    LoadingSpinnerComponent,
    OrdersTableComponent
  ]
})
export class SharedModule { }
