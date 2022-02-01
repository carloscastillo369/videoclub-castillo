import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

//Movie interface
import { MovieI } from 'src/app/core/interfaces/movie.interface';

//NgRx
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { loadMovies } from 'src/app/state/movies/movies.actions';
import { getMovies } from 'src/app/state/movies/movies.selector';


@Component({
  selector: 'app-list-movies-page',
  templateUrl: './list-movies-page.component.html',
  styleUrls: ['./list-movies-page.component.css']
})
export class ListMoviesPageComponent implements OnInit, OnDestroy {

  //Varibable lista de películas disponibles
  public movies!: MovieI[];

  //Variable para suscribirse y desuscribirse a un observable
  private subscription: Subscription = new Subscription();

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.getAvailableMovies();
  }

  //Desuscripción a un observable
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  //Obtener películas disponibles
  getAvailableMovies() {
    this.subscription.add(
      this.store.select(getMovies).subscribe(res => {
        let availableMovies: MovieI[] = [];
        res.forEach(elem => {
          if(elem.stock != 0) {
            availableMovies.push(elem);
          }
        })
        this.movies = availableMovies;
      })
    );
    this.store.dispatch(loadMovies());    
  }

}
