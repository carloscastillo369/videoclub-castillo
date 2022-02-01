import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

//Interfaz de película
import { MovieI } from 'src/app/core/interfaces/movie.interface';

//NgRx
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getMovies } from 'src/app/state/movies/movies.selector';
import { deleteMovie, loadMovies } from 'src/app/state/movies/movies.actions';
import { ApiMoviesService } from 'src/app/services/api-movies.service';


@Component({
  selector: 'app-movies-page',
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.css']
})
export class MoviesPageComponent implements OnInit, OnDestroy {

  //Variable lista de películas
  public movies!: MovieI[];

  //Mat-Table
  public displayedColumns: string[] = ['id','titulo', 'accion'];
  public dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  //Variable para suscribirse y desuscribirse a un observable
  private subscription: Subscription = new Subscription();

  constructor(private store: Store<AppState>, private _apimovie: ApiMoviesService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  //Desuscripción a un observable
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  //Obetner películas
  getMovies() {
    this.subscription.add(
      this.store.select(getMovies).subscribe(res => {
        this.movies = res;
        this.dataSource = new MatTableDataSource(this.movies);
        this.dataSource.paginator = this.paginator;
      })
    );
    this.store.dispatch(loadMovies());
  }

  //Eliminar película por ID
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
        //Si se confirma, se elimina la película
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
