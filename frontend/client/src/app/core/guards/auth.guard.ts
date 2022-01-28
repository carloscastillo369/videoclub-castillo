import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import decode from 'jwt-decode';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
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
  
  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.store.select(isAuthenticated).pipe(
      map((authenticate) => {
        if(!authenticate) {
          return this.router.createUrlTree([''])
        }
        return true;
      })
    );


    /*return this._authService.isLogged().pipe(
      take(1),
      map((isLogged: boolean) => {
        if(isLogged) {
          const token: any = this._authService.getToken();
          const decodeToken: any = decode(token);
          const isAdmin = decodeToken.isadmin;
    
          this.router.navigate(isAdmin? ['/admin'] : ['/public']);
          return false;
        } else {
          return true;
        }
      })
    )*/
  }
}
