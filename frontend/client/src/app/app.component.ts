import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import { getLoading } from './store/shared/shared.selector';
import { isAuthenticated } from './state/auth/auth.selector';
import { autoSignIn } from './state/auth/auth.actions';
import { loadCart } from './state/cart/cart.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app-videoclub';

  public isAuthenticated!: Observable<boolean>;
  public showLoading!: Observable<boolean>

  constructor( private store: Store<AppState> ) { }

  ngOnInit(): void {
    this.showLoading = this.store.select(getLoading);
    this.isAuthenticated = this.store.select(isAuthenticated);
    this.store.dispatch(autoSignIn());
  }

}
