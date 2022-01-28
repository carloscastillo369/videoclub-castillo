import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { CartI } from 'src/app/core/interfaces/cart.interface';
import { MovieI } from 'src/app/core/interfaces/movie.interface';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartArrayMovies: CartI[] = !!localStorage.cart? JSON.parse(localStorage.cart) : [];
  private cartMoviesList = new BehaviorSubject<CartI[]>(this.cartArrayMovies);

  constructor() { }

  getCartMoviesList() {
    return this.cartMoviesList.asObservable();
  }

  addMovieToCart(product: MovieI, days: number) {
    const cartItem: CartI = {
      id: product._id, 
      title: product.title,
      image: product.posterimg,
      year: product.year,
      runtime: product.runtime,
      price: product.price,
      days: days,
      stock: product.stock
    }

    this.cartArrayMovies.push(cartItem);
    this.cartMoviesList.next(this.cartArrayMovies);
    this.saveCartInLocalStorage();
  }

  getTotalPrice() {
    let total = 0;
    this.cartArrayMovies.map((i:any) => {
      total += i.price*i.days;
    })
    return total;
  }

  deleteCartItem(product: CartI) {
    this.cartArrayMovies.map((i:any, index:any)=>{
      if(product.id == i.id){
        this.cartArrayMovies.splice(index,1);
      }
    })
    this.cartMoviesList.next(this.cartArrayMovies);
    this.saveCartInLocalStorage();
  }

  removeAllCart() {
    this.cartArrayMovies = [];
    this.cartMoviesList.next(this.cartArrayMovies);
    localStorage.removeItem('cart');
  }

  increaseQtyMovie(id:string) {
    const result = this.cartArrayMovies.filter(i => i.id == id);
    result[0].days += 1;
    this.cartMoviesList.next(this.cartArrayMovies);
    this.saveCartInLocalStorage();
  }

  decreaseQtyMovie(id:string) {
    const result = this.cartArrayMovies.filter(i => i.id == id);
    result[0].days -= 1;
    this.cartMoviesList.next(this.cartArrayMovies);
    this.saveCartInLocalStorage();
  }

  changeQtyMovie(id: string, days: number) {
    const result = this.cartArrayMovies.filter(i => i.id == id);

    if(days < 1) {
      result[0].days = 1;
    } else if(days >= 1 && days <= 30) {
      result[0].days = days;
    } else {
      result[0].days = 30;
    }
    
    this.cartMoviesList.next(this.cartArrayMovies);
    this.saveCartInLocalStorage();
  }

  saveCartInLocalStorage() {
    return localStorage.setItem('cart', JSON.stringify(this.cartArrayMovies));
  }
}
