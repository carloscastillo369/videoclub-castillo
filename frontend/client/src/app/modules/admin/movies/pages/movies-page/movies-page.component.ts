import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

//Interfaz de película
import { MovieI } from 'src/app/core/interfaces/movie.interface';

//NgRx
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getMovies } from 'src/app/state/movies/movies.selector';
import { deleteMovie, loadMovies } from 'src/app/state/movies/movies.actions';


@Component({
  selector: 'app-movies-page',
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.css']
})
export class MoviesPageComponent implements OnInit {

  public movies!: Observable<MovieI[]>;

  displayedColumns: string[] = ['id','titulo', 'accion'];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.movies = this.store.select(getMovies);
    this.store.dispatch(loadMovies());
  }

  deleteMovie(id: string){
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás recuperarlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimínalo!',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        //Elimina película por ID
        this.store.dispatch(deleteMovie({ id }));

        Swal.fire(
          'Eliminado!',
          'La película ha sido eliminada.',
          'success'
        )
      }
    })
  }

}
