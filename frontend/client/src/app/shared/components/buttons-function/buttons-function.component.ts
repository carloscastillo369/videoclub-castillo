import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

//Interfaz de película
import { MovieI } from 'src/app/core/interfaces/movie.interface';

//Componente modal para trailer
import { ModalTrailerComponent } from '../modal-trailer/modal-trailer.component';

//Componente modal para días de alquiler
import { ModalRentalTimeComponent } from '../modal-rental-time/modal-rental-time.component';


@Component({
  selector: 'app-buttons-function',
  templateUrl: './buttons-function.component.html',
  styleUrls: ['./buttons-function.component.css']
})
export class ButtonsFunctionComponent implements OnInit {

  //Variables proveniente del módulo detail-movie
  @Input() movie!: MovieI;
  @Input() addedMovie!: boolean;

  constructor( public dialog: MatDialog ) { }

  ngOnInit(): void {
  }

  //Abrir modal de trailer
  openModalTrailer(movie: MovieI){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose =  true;
    dialogConfig.data = movie;
    
    this.dialog.open(ModalTrailerComponent, dialogConfig);
  }

  //Abrir modal de días de alquiler
  openModalRentalTime(movie: MovieI){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose =  true;
    dialogConfig.data = movie;
    
    this.dialog.open(ModalRentalTimeComponent, dialogConfig);
  }

}
