import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

//Interfaz datos de usuario
import { SignInResponseI } from 'src/app/core/interfaces/authResponse.interface';

//Servicio de autenticación
import { AuthService } from 'src/app/services/auth.service';

//NgRx
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getDataUser, isAuthenticated } from 'src/app/state/auth/auth.selector';
import { SignOut } from 'src/app/state/auth/auth.actions';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  //Evento emite cerrar SideNav
  @Output() sidenavClose = new EventEmitter();

  //Variable datos de usuario
  public dataUser!: Observable<SignInResponseI | null>;

  //Variable si el usuario está autenticado
  public isAuthenticated!: Observable<boolean>;
 
  constructor(private _authService: AuthService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.isAuthenticated = this.store.select(isAuthenticated);
    this.dataUser = this.store.select(getDataUser);
  }

  //Cerrar SideNav
  onSidenavClose(){
    this.sidenavClose.emit();
  }

  //Cerrar sesión
  signOut(){
    Swal.fire({
      title: '¿Quieres cerrar sesión en tu cuenta?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Cerrar sesión',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        //Si se confirma, se cierra sesión
        this.store.dispatch(SignOut())
        this.onSidenavClose();
      }
    })
  }

}
