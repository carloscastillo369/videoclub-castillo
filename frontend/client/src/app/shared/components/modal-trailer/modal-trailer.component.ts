import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

//Interfaz de película
import { MovieI } from 'src/app/core/interfaces/movie.interface';


@Component({
  selector: 'app-modal-trailer',
  templateUrl: './modal-trailer.component.html',
  styleUrls: ['./modal-trailer.component.css']
})
export class ModalTrailerComponent implements OnInit {

  //Variable título de película
  public movieTitle: string;

  //Variable de URL seguro
  public urlTrailer: SafeResourceUrl;

  constructor( 
    private sanitizer: DomSanitizer, 
    @Inject(MAT_DIALOG_DATA) public data: MovieI 
  ) { 
    this.movieTitle = this.data.title;
    this.urlTrailer = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.urltrailer);
    }

  ngOnInit(): void {
  }

}
