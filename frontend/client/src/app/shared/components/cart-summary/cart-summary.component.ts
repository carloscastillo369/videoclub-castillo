import { Component, Input, OnInit } from '@angular/core';

//Servicio de carrito
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {

  //Variable precio total del carrito
  public totalPrice!: number;

  constructor(private _cartService: CartService) { }

  ngOnInit(): void {
    this.getTotalPriceCart();
  }

  //Obtener el precio total del carrito
  getTotalPriceCart() {
    this._cartService.getCartMoviesList().subscribe((res) => {
      this.totalPrice = this._cartService.getTotalPrice();
    })
  }

}
