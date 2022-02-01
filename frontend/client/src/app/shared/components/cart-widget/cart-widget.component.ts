import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

//Servicio de carrito
import { CartService } from 'src/app/services/cart.service';
import { loadCart } from 'src/app/state/cart/cart.actions';
import { getQtyItemsCart } from 'src/app/state/cart/cart.selector';
import { AppState } from 'src/app/store/app.state';


@Component({
  selector: 'app-cart-widget',
  templateUrl: './cart-widget.component.html',
  styleUrls: ['./cart-widget.component.css']
})
export class CartWidgetComponent implements OnInit, OnDestroy {

  //Total de items en el carrito
  public totalItemsCart: number = 0;

  //Variable para suscribirse y desuscribirse a un observable
  private subscription: Subscription = new Subscription();

  constructor(private _cartService: CartService, private store: Store<AppState>) { }

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
