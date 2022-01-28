import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

//Interfaz de película
import { MovieI } from 'src/app/core/interfaces/movie.interface';

//Servicio de api-películas
import { ApiMoviesService } from 'src/app/services/api-movies.service';

//Servicio de carrito
import { CartService } from 'src/app/services/cart.service';


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

  constructor(
    private _apiMoviesService: ApiMoviesService,
    private _cartService : CartService,
    @Inject(MAT_DIALOG_DATA) public data: MovieI 
  ) { 
    this.movie = this.data;
  }

  ngOnInit(): void {
  }

  //Agregar película al carrito
  rentMovie(id: string, days: number){
    this._apiMoviesService.getMovie(id).subscribe(res => {
      const movie = res[0];
      if(movie.stock > 0){
        this._cartService.addMovieToCart(movie, days);
      }
    });
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
