import { Component, OnInit } from '@angular/core';

//Interfaz de película
import { MovieI } from 'src/app/core/interfaces/movie.interface';

import { CartService } from 'src/app/services/cart.service';

//NgRx
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getMovieById } from 'src/app/state/movies/movies.selector';


@Component({
  selector: 'app-detail-movie-page',
  templateUrl: './detail-movie-page.component.html',
  styleUrls: ['./detail-movie-page.component.css']
})
export class DetailMoviePageComponent implements OnInit {

  //Varible de detalle de película
  public movie!: MovieI;

  //Variable de película si ya está agregada al cart
  public addedMovie: boolean = false;

  //Variables para pasar de minutos a horas
  public hours: number = 0;
  public mins: number = 0;

  constructor(
    private store: Store<AppState>,
    private _cartService: CartService
  ) { }

  ngOnInit(): void {
    this.getMovie();
  }

  //Obtener película por Id
  getMovie(){
    this.store.select(getMovieById).subscribe(res => {
      if(res) {
        this.movie = res;
        this.isMovieInCart(this.movie);
      }
    });
  }

  //Condición si una película ya fue agregada
  isMovieInCart(product: any) {
    this._cartService.getCartMoviesList().subscribe(res => {
      const filter = res.filter((i) => i.id == product._id);
      if(filter.length == 1) {
        this.addedMovie = true;
      }
    })
  }

  //Pasar minutos a horas
  MinToHour(number: number){
    this.hours = Math.floor(number/60);
    this.mins = number % 60;
  }

}
