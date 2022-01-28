import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

//Interfaz de un item del carrito
import { CartI } from 'src/app/core/interfaces/cart.interface';

//Servico de carrito
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.css']
})
export class CartTableComponent implements OnInit, OnDestroy {

  //Variable de lista del carrito
  public cartMovies: CartI[] = [];

  //Mat-Table
  public displayedColumns: string[] = ['posicion', 'descripcion', 'accion', 'cantidad', 'precio', 'subtotal'];
  @ViewChild(MatTable) table!: MatTable<any>;

  //Variable para suscribirse y desuscribirse a un observable
  private subscription: Subscription = new Subscription();
  
  constructor(private _cartService: CartService) { }

  ngOnInit(): void {
    this.getCartList();
  }

  //Desuscripción a un observable
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  //Obtener lista del carrito
  getCartList() {
    this.subscription.add(
      this._cartService.getCartMoviesList().subscribe((res: CartI[]) => {
        this.cartMovies = res;
      })
    );
  }

  //Elminar un item del carrito
  deleteCartItem(product: CartI){
    Swal.fire({
      title: '¿Estás seguro?',
      icon: 'warning',
      text: "Estas a punto de eliminar esta película de la lista de tu carrito.",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimínalo!',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this._cartService.deleteCartItem(product);
        this.table.renderRows();
        Swal.fire(
          this.cartMovies.length == 0? 'Carrito vacío!' : 'Eliminado!',
          this.cartMovies.length == 0? 'Vuelve a Películas para agregar una película a tu carrito' : 'La película ha sido eliminada del carrito.',
          'success'
        )
      }
    })
  }

  //Remover todo el carrito
  removeAllCart(){
    Swal.fire({
      title: '¿Estás seguro?',
      icon: 'warning',
      text: "Estas a punto de vaciar por completo tu carrito.",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, vaciar carrito!',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this._cartService.removeAllCart();
        Swal.fire(
          'Carrito vacío!',
          'Vuelve a Películas para agregar una película a tu carrito',
          'success'
        )
      }
    })    
  }

  //Aumentar la cantidad de días de alquiler por botón (+)
  increase( id: string ){
    this._cartService.increaseQtyMovie(id);
  }

  //Disminuir la cantidad de días de alquiler por botón (-)
  decrease( id: string ){
    this._cartService.decreaseQtyMovie(id);
  }

  //Cambiar la cantidad de días de alquiler por ingreso de dígitos
  changeQty(change: any, id: string) {
    this._cartService.changeQtyMovie(id, Number(change));
  }

  //Pasar minutos a horas
  MinToHours(number: number){
    const hours = Math.floor(number/60);
    const min = number % 60;
    if(hours > 1){
      return hours + ' ' + 'hrs' + ' ' + min + ' ' + 'min';
    } else {
      return hours + ' ' + 'hr' + ' ' + min + ' ' + 'min';
    }
  }

}
