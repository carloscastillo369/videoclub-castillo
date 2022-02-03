import { Injectable } from '@angular/core';

//Interfaz de item del carrito
import { CartI } from 'src/app/core/interfaces/cart.interface';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartArrayMovies: CartI[] = this.getCartFromLocalStorage();

  constructor() { }

  //Guardar carrito en el local storage
  setCartInLocalStorage() {
    return localStorage.setItem('cart', JSON.stringify(this.cartArrayMovies));
  }

  //Obtener items del carrito desde el local storage
  getCartFromLocalStorage() {
    const dataCart = localStorage.getItem('cart');
    if(dataCart) {
      return JSON.parse(dataCart);
    }
    return [];
  }

  //Agregar película al carrito
  addMovieToCart(product: CartI) {
    this.cartArrayMovies = [ ...this.cartArrayMovies, product];
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
    const updatedCart = this.cartArrayMovies.filter((i) => i.id != id);
    this.cartArrayMovies = updatedCart;
    this.setCartInLocalStorage();
  }

  //Remover todo el carrito
  removeAllCart() {
    this.cartArrayMovies = [];
    localStorage.removeItem('cart');
  }

  //Aumentar los días de alquiler por botón (+)
  increaseQtyMovie(id:string) {
    const updatedCart = this.cartArrayMovies.map((movie) => {
      const newday = movie.days + 1;
      const updatedItemCart: CartI = {
        id: movie.id,
        title: movie.title,
        image: movie.image,
        year: movie.year,
        runtime: movie.runtime,
        price: movie.price,
        days: newday,
        stock: movie.stock
      }
      return movie.id == id? updatedItemCart : movie;
    });
    this.cartArrayMovies = updatedCart;
    this.setCartInLocalStorage();
  }

  //Disminuir los días de alquiler por botón (-)
  decreaseQtyMovie(id:string) {
    const updatedCart = this.cartArrayMovies.map((movie) => {
      const newday = movie.days - 1;
      const updatedItemCart: CartI = {
        id: movie.id,
        title: movie.title,
        image: movie.image,
        year: movie.year,
        runtime: movie.runtime,
        price: movie.price,
        days: newday,
        stock: movie.stock
      }
      return movie.id == id? updatedItemCart : movie;
    });
    this.cartArrayMovies = updatedCart;
    this.setCartInLocalStorage();
  }

  //Cambiar los días de alquiler por ingreso de dígitos
  changeQtyMovie(id: string, days: number) {
    const updatedCart = this.cartArrayMovies.map((movie) => {
      let newday = 0;
      if(days < 1) {
        newday = 1;
      } else if(days >= 1 && days <= 30) {
        newday = days;
      } else {
        newday = 30;
      }
      const updatedItemCart: CartI = {
        id: movie.id,
        title: movie.title,
        image: movie.image,
        year: movie.year,
        runtime: movie.runtime,
        price: movie.price,
        days: newday,
        stock: movie.stock
      }
      return movie.id == id? updatedItemCart : movie;
    });
    this.cartArrayMovies = updatedCart;
    this.setCartInLocalStorage();
  }

}
