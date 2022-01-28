import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

//Interfaz de pedido de la base de datos
import { UserOrderI } from 'src/app/core/interfaces/user-order.interface';

//Interfaz de pedidos de usuario
import { MyOrderI } from 'src/app/core/interfaces/myorder.interface';

//Interfaz de pedido
import { OrderI } from 'src/app/core/interfaces/order.interface';

//Servicio de pedidos
import { OrderService } from 'src/app/services/order.service';

//NgRx
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getUser } from 'src/app/state/user/user.selector';
import { loadUser } from 'src/app/state/user/user.actions';


@Component({
  selector: 'app-myorders-page',
  templateUrl: './myorders-page.component.html',
  styleUrls: ['./myorders-page.component.css']
})
export class MyordersPageComponent implements OnInit, OnDestroy {

  //Variable de pedidos de usuario
  public orders!: MyOrderI[];

  //Variable para suscribirse y desuscribirse a un observable
  private subscription: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    private _orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.getUserOrders();
    this.store.dispatch(loadUser());
  }

  //Desuscripción a un observable
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  //Obtener email desde el store
  getUserOrders() {
    this.subscription.add(
      this.store.select(getUser).subscribe(res => {
        if(res) {
          const userEmail = res.email;
          this.getOrders(userEmail);   
        } 
      })
    );
  }

  //Obtener pedidos de usuario por su email
  getOrders(email: string | undefined){
    this.subscription.add(
      this._orderService.getOrder().subscribe(res => { 
        let orders: MyOrderI[] = [];
        res.forEach((elem: UserOrderI) => {
          if(email == elem.user.email) {
            let order = {
              total: this.CalcTotal(elem.order),
              order: elem.order
            }
            orders.push(order);
          }
        })
        this.orders = orders; 
      })
    );
  }

  //Calcular precio total del pedido
  CalcTotal(orders: OrderI[]) {
    let total: number = 0;
    orders.forEach((elem:any) => {
      let subtotal = elem.days*elem.price;
      total += subtotal;
    })
    return total;
  }

}
