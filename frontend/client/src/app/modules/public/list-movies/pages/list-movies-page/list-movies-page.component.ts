import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

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
export class ListMoviesPageComponent implements OnInit {

  //Varibable lista de películas
  public movies!: Observable<MovieI[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.getMovies();
  }

  //Obtener películas
  getMovies() {
    this.movies = this.store.select(getMovies);
    this.store.dispatch(loadMovies());
  }

}
