import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

//NgRx
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { loadCart } from 'src/app/state/cart/cart.actions';
import { getQtyItemsCart } from 'src/app/state/cart/cart.selector';


@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit, OnDestroy {

  //Variable total de items en el carrito
  public totalItemsCart: number = 0;

  //Variable para suscribirse y desuscribirse a un observable
  private subscription: Subscription = new Subscription();

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.getTotalItemsCart();
  }

  //Desuscripción a un observable
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  //Obtener la cantidad total de items del carrito
  getTotalItemsCart() {
    this.subscription.add(
      this.store.select(getQtyItemsCart).subscribe(res => {
        this.totalItemsCart = res;
      })
    );
    this.store.dispatch(loadCart());
  }

}
