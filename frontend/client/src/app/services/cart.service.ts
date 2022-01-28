import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

//Interfaz del carrito
import { CartI } from 'src/app/core/interfaces/cart.interface';

//Interfaz de película
import { MovieI } from 'src/app/core/interfaces/movie.interface';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartArrayMovies: CartI[] = !!localStorage.cart? JSON.parse(localStorage.cart) : [];
  private cartMoviesList = new BehaviorSubject<CartI[]>(this.cartArrayMovies);

  constructor() { }

  //Obtener items del carrito
  getCartMoviesList() {
    return this.cartMoviesList.asObservable();
  }

  //Agregar película al carrito
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

  //Obtener precio total del carrito
  getTotalPrice() {
    let total = 0;
    this.cartArrayMovies.map((i:any) => {
      total += i.price*i.days;
    })
    return total;
  }

  //Eliminar un item del carrito
  deleteCartItem(product: CartI) {
    this.cartArrayMovies.map((i:any, index:any)=>{
      if(product.id == i.id){
        this.cartArrayMovies.splice(index,1);
      }
    })
    this.cartMoviesList.next(this.cartArrayMovies);
    this.saveCartInLocalStorage();
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
    this.saveCartInLocalStorage();
  }

  //Disminuir los días de alquiler por botón (-)
  decreaseQtyMovie(id:string) {
    const result = this.cartArrayMovies.filter(i => i.id == id);
    result[0].days -= 1;
    this.cartMoviesList.next(this.cartArrayMovies);
    this.saveCartInLocalStorage();
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
    this.saveCartInLocalStorage();
  }

  //Guardar carrito en el local storage
  saveCartInLocalStorage() {
    return localStorage.setItem('cart', JSON.stringify(this.cartArrayMovies));
  }
}
