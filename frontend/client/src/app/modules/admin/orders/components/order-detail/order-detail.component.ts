import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

//Interfaz de pedido de la base de datos
import { UserOrderI } from 'src/app/core/interfaces/user-order.interface';

//NgRx
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getOrderById } from 'src/app/state/orders/orders.selector';


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  //Variable pepido de la base de datos
  public orders!: UserOrderI;

  //Variable precio total del pedido
  public total: number = 0;

  //Mat-Table
  displayedColumns: string[] = ['posicion','descripcion','tipo','precio'];

  //Variable para suscribirse y desuscribirse a un observable
  private subscription: Subscription = new Subscription();

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.getOrder();
  }

  //Desuscripción a un observable
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  //Obtener detalle de un pedido
  getOrder() {
    this.subscription.add(
      this.store.select(getOrderById).subscribe(res => {
        if(res) {
          this.orders = res;
          console.log(this.orders);
          
          this.total = this.CalcTotal(this.orders.order);
        }
      })
    );
  }

  //Calcular el precio total del pedido
  CalcTotal(orders:any) {
    let total: number = 0;
    orders.forEach((elem:any) => {
      let subtotal = elem.days*elem.price;
      total += subtotal;
    })
    return total;
  }

}
