import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

//Interfaz de pedidos de usuario
import { MyOrderI } from 'src/app/core/interfaces/myorder.interface';

//NgRx
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getMyOrders } from 'src/app/state/orders/orders.selector';
import { loadMyOrders } from 'src/app/state/orders/orders.actions';


@Component({
  selector: 'app-myorders-page',
  templateUrl: './myorders-page.component.html',
  styleUrls: ['./myorders-page.component.css']
})
export class MyordersPageComponent implements OnInit, OnDestroy {

  //Variable de pedidos de un usuario
  public myOrders!: MyOrderI[] | null;

  //Variable para suscribirse y desuscribirse a un observable
  private subscription: Subscription = new Subscription();

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.getMyOrders();
  }

  //Desuscripción a un observable
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  //Obtener pedidos de usuario
  getMyOrders(){
    this.subscription.add(
      this.store.select(getMyOrders).subscribe(res => {
        this.myOrders = res;
      })
    );
    this.store.dispatch(loadMyOrders());
  }

}
