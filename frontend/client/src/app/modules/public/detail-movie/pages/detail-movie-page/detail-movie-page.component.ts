import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

//Interfaz de película
import { MovieI } from 'src/app/core/interfaces/movie.interface';

//NgRx
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getMovieById } from 'src/app/state/movies/movies.selector';
import { getCart } from 'src/app/state/cart/cart.selector';


@Component({
  selector: 'app-detail-movie-page',
  templateUrl: './detail-movie-page.component.html',
  styleUrls: ['./detail-movie-page.component.css']
})
export class DetailMoviePageComponent implements OnInit, OnDestroy {

  //Varible de detalle de película
  public movie!: MovieI;

  //Variable de película si ya está agregada al cart
  public addedMovie: boolean = false;

  //Variables para pasar de minutos a horas
  public hours: number = 0;
  public mins: number = 0;

  //Variable para suscribirse y desuscribirse a un observable
  private subscription: Subscription = new Subscription();

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.getMovie();
  }

  //Desuscripción a un observable
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  //Obtener película por Id
  getMovie(){
    this.subscription.add(
      this.store.select(getMovieById).subscribe(res => {
        if(res) {
          this.movie = res;
          this.isMovieInCart(this.movie);
          this.MinToHour(this.movie.runtime);
        }
      })
    );
  }

  //Condición si una película ya fue agregada
  isMovieInCart(product: any) {
    this.subscription.add(
      this.store.select(getCart).subscribe(res => {
        const filter = res.filter((i) => i.id == product._id);
        if(filter.length == 1) {
          this.addedMovie = true;
        }
      })
    );
  }

  //Pasar minutos a horas
  MinToHour(number: number){
    this.hours = Math.floor(number/60);
    this.mins = number % 60;
  }

}
