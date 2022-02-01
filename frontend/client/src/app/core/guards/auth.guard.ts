import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

//Servicio de autenticación
import { AuthService } from 'src/app/services/auth.service';

//Para decodificar el token
import decode from 'jwt-decode';

//NgRx
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { isAuthenticated } from 'src/app/state/auth/auth.selector';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private store: Store<AppState>,
    private _authService: AuthService,
    private router: Router
  ) {}
  
  canActivate(): Observable<boolean> {
    return this.store.select(isAuthenticated).pipe(
      take(1),
      map((isAuthenticated) => {
        if(isAuthenticated) {
          const token: any = this._authService.getTokenFromLocalStorage();
          const decodeToken: any = decode(token);
          const isAdmin = decodeToken.isadmin;
    
          this.router.navigate(isAdmin? ['/admin'] : ['/public']);
          return false;
        } else {
          return true;
        }
      })
    )
  }
}
