import { Component, OnInit } from '@angular/core';

//Servicio de carrito
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-cart-widget',
  templateUrl: './cart-widget.component.html',
  styleUrls: ['./cart-widget.component.css']
})
export class CartWidgetComponent implements OnInit {

  //Total de items en el carrito
  public totalItemsCart: number = 0;

  constructor(private _cartService: CartService) { }

  ngOnInit(): void {
    this.getTotalItemsCart();
  }

  //Obtener total de items del carrito
  getTotalItemsCart() {
    this._cartService.getCartMoviesList().subscribe(res => {
      this.totalItemsCart = res.length;
    })
  }

}
