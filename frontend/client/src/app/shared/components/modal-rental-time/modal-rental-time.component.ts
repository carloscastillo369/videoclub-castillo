import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

//Componente SnackBar
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';

//Interfaz de película
import { MovieI } from 'src/app/core/interfaces/movie.interface';

//Interfaz de item del carrito
import { CartI } from 'src/app/core/interfaces/cart.interface';

//Servicio de api-películas
import { ApiMoviesService } from 'src/app/services/api-movies.service';

//Servicio de carrito
import { CartService } from 'src/app/services/cart.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { addCart, addCartSuccess } from 'src/app/state/cart/cart.actions';


@Component({
  selector: 'app-modal-rental-time',
  templateUrl: './modal-rental-time.component.html',
  styleUrls: ['./modal-rental-time.component.css']
})
export class ModalRentalTimeComponent implements OnInit {

  //Variable de datos de película que se agregará al carrito
  public movie!: MovieI;

  //Variable días de alquiler
  public days: number = 1;

  //Variable para el SnackBar
  private duration: number = 3;
  private verticalPosition: MatSnackBarVerticalPosition = 'top';
  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';

  constructor(
    private store: Store<AppState>,
    private _apiMoviesService: ApiMoviesService,
    private _cartService : CartService,
    private router: Router,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: MovieI 
  ) { 
    this.movie = this.data;
  }

  ngOnInit(): void {
  }

  //Agregar película al carrito si está disponible
  rentMovie(id: string, days: number){
    this._apiMoviesService.getMovie(id).subscribe(res => {
      const movie = res[0];
      //Si está disponible se agregará al carrito
      if(movie.stock > 0){
        const itemCart: CartI = {
          id: movie._id,
          title: movie.title,
          image: movie.posterimg,
          year: movie.year,
          runtime: movie.runtime,
          price: movie.price,
          days: days,
          stock: movie.stock
        }
        //Agregar al carrito
        this.addItemToCart(itemCart);
      } else {
          this.snackBar.openFromComponent( SnackBarComponent, {
            data: 'Esta película ya no está disponible',
            duration: this.duration*1000,
            verticalPosition: this.verticalPosition,
            horizontalPosition: this.horizontalPosition,
            panelClass: 'error'
          })
          this.router.navigate(['/public/movies']);
      }
    });
  }

  //Agregar al carrito
  addItemToCart(item: CartI) {
    this.store.dispatch(addCart({ item }));
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Película agregada!',
      showConfirmButton: false,
      timer: 2500
    });    
  }

  //Aumentar la cantidad de días de alquiler por botón (+)
  increase() {
    this.days += 1;
  }

  //Disminuir la cantidad de días de alquiler por botón (-)
  decrease() {
    this.days -= 1;
  }

  //Cambiar la cantidad de días de alquiler por ingreso de dígitos
  changeQty(change: any) {
    if(Number(change) < 1) {
      this.days = 1;
    } else if(Number(change) >= 1 && Number(change) <= 30) {
      this.days = Number(change);
    } else {
      this.days = 30;
    }
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
