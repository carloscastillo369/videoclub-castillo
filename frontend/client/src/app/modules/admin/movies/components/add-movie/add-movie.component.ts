import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//NgRx
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { addMovie } from 'src/app/state/movies/movies.actions';


@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {

  public formAddMovie: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    stock: ['', [Validators.required]],
    price: ['', [Validators.required]],
    year: ['', [Validators.required]],
    runtime: ['', [Validators.required]],
    plot: ['', [Validators.required]],
    rated: ['', [Validators.required]],
    released: ['', [Validators.required]],
    genre: ['', [Validators.required]],
    director: ['', [Validators.required]],
    writer: ['', [Validators.required]],
    actors: ['', [Validators.required]],
    language: ['', [Validators.required]],
    country: ['', [Validators.required]],
    awards: ['', [Validators.required]],
    cardimg: ['', [Validators.required]],
    posterimg: ['', [Validators.required]],
    bannerimg: ['', [Validators.required]],
    urltrailer: ['', [Validators.required]]
  })

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  //Guardar película
  saveMovie(){
    const movie = this.formAddMovie.value;
    this.store.dispatch(addMovie({ movie }));
  }

}
