import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

//Servicio de carrito
import { CartService } from 'src/app/services/cart.service';


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

  constructor(private _cartService: CartService) { }

  ngOnInit(): void {
    this.getTotalItemsCart();
  }

  //Desuscripción a un observable
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  //Obtener total de items del carrito
  getTotalItemsCart() {
    this.subscription.add(
      this._cartService.getCartMoviesList().subscribe(res => {
        this.totalItemsCart = res.length;
      })
    );
  }

}
