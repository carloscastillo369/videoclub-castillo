import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
export class UpdateMovieComponent implements OnInit {

  movie!: MovieI;
  formUpdateMovie!: FormGroup;

  constructor(
    private store: Store<AppState>,
    private fb:FormBuilder,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getMovie();
  }

  //Obtener película por Id
  getMovie(){
    this.store.select(getMovieById).subscribe(res => {
      if(res) {
        this.movie = res;
        this.createForm(this.movie); 
      }
    });
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
        //Se actualiza la película
        this.store.dispatch(updateMovie({ movie, id }))

      } else if (result.isDenied) {
        //Los cambios vuelven a su estado inicial
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
