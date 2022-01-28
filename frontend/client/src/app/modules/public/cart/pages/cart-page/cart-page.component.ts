import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

//Servicio de carrito
import { CartService } from 'src/app/services/cart.service';


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

  constructor(private _cartService: CartService) { }

  ngOnInit(): void {
    this.getTotalItemsCart();
  }

  //Desuscripción a un observable
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getTotalItemsCart() {
    this.subscription.add(
      this._cartService.getCartMoviesList().subscribe(res => {
        this.totalItemsCart = res.length;
      })
    );
  }

}
