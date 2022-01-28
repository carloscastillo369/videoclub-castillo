import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

//Servicio de carrito
import { CartService } from 'src/app/services/cart.service';


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

  constructor(private _cartService: CartService) { }

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
      this._cartService.getCartMoviesList().subscribe((res) => {
        this.totalPrice = this._cartService.getTotalPrice();
      })
    );
  }

}
