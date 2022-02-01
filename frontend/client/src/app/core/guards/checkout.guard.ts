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
import { CartService } from 'src/app/services/cart.service';

@Injectable({
  providedIn: 'root'
})
export class CheckOutGuard implements CanActivate {

  constructor(
    private store: Store<AppState>,
    private _authService: AuthService,
    private _cartService: CartService,
    private router: Router
  ) {}
  
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this._cartService.getCartMoviesList().pipe(
        map(data => {
            const cartMovies = data;
            if(cartMovies.length == 0) {
                this.router.navigate(['/public/movies']);
                return false;
            } 
                
            return true;
        })
    );
  }
}
