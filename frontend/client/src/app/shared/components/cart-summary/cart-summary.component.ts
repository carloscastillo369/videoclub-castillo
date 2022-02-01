import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

//NgRx
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getTotalPriceCart } from 'src/app/state/cart/cart.selector';


@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit, OnDestroy {

  //Variable precio total del carrito
  public totalPrice!: number;

  //Variable para suscribirse y desuscribirse a un observable
  private subscription: Subscription = new Subscription();

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.getTotalPriceCart();
  }

  //Desuscripción a un observable
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  //Obtener el precio total del carrito
  getTotalPriceCart() {
    this.subscription.add(
      this.store.select(getTotalPriceCart).subscribe((res) => {
        this.totalPrice = res;
      })
    );
  }

}
