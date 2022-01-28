import { Component, Input, OnInit } from '@angular/core';

//Interfaz de película
import { MovieI } from 'src/app/core/interfaces/movie.interface';


@Component({
  selector: 'app-card-movie',
  templateUrl: './card-movie.component.html',
  styleUrls: ['./card-movie.component.css']
})
export class CardMovieComponent implements OnInit {

  //Variable proveniente desde el módulo list-movies
  @Input() movie!:MovieI;

  constructor() { }

  ngOnInit(): void {
  }

}
