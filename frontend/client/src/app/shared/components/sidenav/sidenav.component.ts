import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

//Interfaz datos de usuario
import { DataUserI } from 'src/app/core/interfaces/user.interface';

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
  public user!: Observable<DataUserI | null>;

  //Variable si el usuario está autenticado
  public isAuthenticated!: Observable<boolean>;
 
  constructor(private _authService: AuthService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.isAuthenticated = this.store.select(isAuthenticated);
    this.user = this.store.select(getDataUser);
  }

  //Cerrar SideNav
  onSidenavClose(){
    this.sidenavClose.emit();
  }

  //Cerrar sesión
  signOut(){
    this.store.dispatch(SignOut())
    this.onSidenavClose();
  }

}
