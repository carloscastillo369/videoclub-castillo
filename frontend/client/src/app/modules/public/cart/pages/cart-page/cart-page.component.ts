import { Component, OnInit } from '@angular/core';

import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  public totalItemsCart: number = 0;

  constructor(private _cartService: CartService) { }

  ngOnInit(): void {
    this.getTotalItemsCart();
  }

  getTotalItemsCart() {
    this._cartService.getCartMoviesList().subscribe(res => {
      this.totalItemsCart = res.length;
    })
  }

}
