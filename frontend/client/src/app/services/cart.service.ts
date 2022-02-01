import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

//Interfaz de item del carrito
import { CartI } from 'src/app/core/interfaces/cart.interface';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartArrayMovies: CartI[] = this.getCartFromLocalStorage();
  private cartMoviesList = new BehaviorSubject<CartI[]>(this.cartArrayMovies);

  constructor() { }

  //Obtener items del carrito
  getCartMoviesList() {
    return this.cartMoviesList.asObservable();
  }

  //Agregar película al carrito
  addMovieToCart(product: CartI) {
    this.cartArrayMovies = [ ...this.cartArrayMovies, product]
    this.cartMoviesList.next(this.cartArrayMovies);
    this.setCartInLocalStorage();
  }

  //Obtener precio total del carrito
  getTotalPrice() {
    let total = 0;
    this.cartArrayMovies.map((i:any) => {
      total += i.price*i.days;
    })
    return total;
  }

  //Eliminar un item del carrito
  deleteCartItem(id: string) {
    let updatedCart = this.cartArrayMovies.filter((i) => i.id != id);
    this.cartArrayMovies = updatedCart;
    this.cartMoviesList.next(this.cartArrayMovies);
    this.setCartInLocalStorage();
  }

  //Remover todo el carrito
  removeAllCart() {
    this.cartArrayMovies = [];
    this.cartMoviesList.next(this.cartArrayMovies);
    localStorage.removeItem('cart');
  }

  //Aumentar los días de alquiler por botón (+)
  increaseQtyMovie(id:string) {
    const result = this.cartArrayMovies.filter(i => i.id == id);
    result[0].days += 1;
    this.cartMoviesList.next(this.cartArrayMovies);
    this.setCartInLocalStorage();
  }

  //Disminuir los días de alquiler por botón (-)
  decreaseQtyMovie(id:string) {
    const result = this.cartArrayMovies.filter(i => i.id == id);
    result[0].days -= 1;
    this.cartMoviesList.next(this.cartArrayMovies);
    this.setCartInLocalStorage();
  }

  //Cambiar los días de alquiler por ingreso de dígitos
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
    this.setCartInLocalStorage();
  }

  //Guardar carrito en el local storage
  setCartInLocalStorage() {
    return localStorage.setItem('cart', JSON.stringify(this.cartArrayMovies));
  }

  getCartFromLocalStorage() {
    const dataCart = localStorage.getItem('cart');
    if(dataCart) {
      return JSON.parse(dataCart);
    }
    return [];
  }

}
