import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import decode from 'jwt-decode';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

//NgRx
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { isAuthenticated } from 'src/app/state/auth/auth.selector';

@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanActivate {

  constructor(
    private store: Store<AppState>,
    private _authService: AuthService,  
    private router: Router
  ) {}
  
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.store.select(isAuthenticated).pipe(
      take(1),
      map((isAuthenticated) => {
        if(isAuthenticated) {
          const token: any = this._authService.getTokenFromLocalStorage();
          const decodeToken: any = decode(token);
          const isAdmin = decodeToken.isadmin;
          const expectedRole = route.data.expectedRole
          
          if(isAdmin !== expectedRole){
            this.router.navigate(['/admin'])
            return false;
          }
    
          return true;
          
        } else {
          this.router.navigate(['/']);
          return false;
        }
      })
    )
  }
}
