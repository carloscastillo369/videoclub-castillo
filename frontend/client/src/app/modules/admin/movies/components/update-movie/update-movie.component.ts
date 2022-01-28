import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

//Interfaz de película
import { MovieI } from 'src/app/core/interfaces/movie.interface';

//NgRx
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { updateMovie } from 'src/app/state/movies/movies.actions';
import { getMovieById } from 'src/app/state/movies/movies.selector';


@Component({
  selector: 'app-update-movie',
  templateUrl: './update-movie.component.html',
  styleUrls: ['./update-movie.component.css']
})
export class UpdateMovieComponent implements OnInit, OnDestroy {

  //Variable película a ser actualizada
  public movie!: MovieI;

  //Variable de formulario para actualizar película
  public formUpdateMovie!: FormGroup;

  //Variable para suscribirse y desuscribirse a un observable
  private subscription: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    private fb:FormBuilder
  ) { }

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
          this.createForm(this.movie); 
        }
      })
    );
  }

  //Se llena el formulario con los datos obtenidos
  createForm(movie: MovieI) {{
    this.formUpdateMovie = this.fb.group({
      title: [movie.title],
      stock: [movie.stock],
      price: [movie.price],
      year: [movie.year],
      runtime: [movie.runtime],
      plot: [movie.plot],
      rated: [movie.rated],
      released: [movie.released],
      genre: [movie.genre],
      director: [movie.director],
      writer: [movie.writer],
      actors: [movie.actors],
      language: [movie.language],
      country: [movie.country],
      awards: [movie.awards],
      cardimg: [movie.cardimg],
      posterimg: [movie.posterimg],
      bannerimg: [movie.bannerimg],
      urltrailer: [movie.urltrailer]
    })
  }}

  //Actualizar película
  updateMovie(id:string){
    const movie = this.formUpdateMovie.value;
    Swal.fire({
      title: '¿Deseas guardar los cambios?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `No guardar`,
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        //Si se confirma, se actualiza la película
        this.store.dispatch(updateMovie({ movie, id }))

      } else if (result.isDenied) {
        //Si se deniega, los cambios vuelven a su estado inicial
        this.formUpdateMovie = this.fb.group({
          title: [this.movie.title],
          stock: [this.movie.stock],
          price: [this.movie.price],
          year: [this.movie.year],
          runtime: [this.movie.runtime],
          plot: [this.movie.plot],
          rated: [this.movie.rated],
          released: [this.movie.released],
          genre: [this.movie.genre],
          director: [this.movie.director],
          writer: [this.movie.writer],
          actors: [this.movie.actors],
          language: [this.movie.language],
          country: [this.movie.country],
          awards: [this.movie.awards],
          cardimg: [this.movie.cardimg],
          posterimg: [this.movie.posterimg],
          bannerimg: [this.movie.bannerimg],
          urltrailer: [this.movie.urltrailer]
        })
        Swal.fire('No se guardaron los cambios', '', 'info')
      }
    })
  }
}
