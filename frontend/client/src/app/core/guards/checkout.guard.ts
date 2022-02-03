import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

//NgRx
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getQtyItemsCart } from 'src/app/state/cart/cart.selector';

@Injectable({
  providedIn: 'root'
})
export class CheckOutGuard implements CanActivate {

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {}
  
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.store.select(getQtyItemsCart).pipe(
        map(data => {
            if(data == 0) {
                this.router.navigate(['/public/movies']);
                return false;
            } 
                
            return true;
        })
    );
  }
}
