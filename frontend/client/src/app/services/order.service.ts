import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//Interfaz de datos de usuario
import { DataUserI } from '../core/interfaces/user.interface';

//Interfaz de pedido
import { OrderI } from '../core/interfaces/order.interface';

//Interfaz de pedido de un usuario
import { MyOrderI } from 'src/app/core/interfaces/myorder.interface';

//Interfaz de pedido de la base de datos
import { UserOrderI } from 'src/app/core/interfaces/user-order.interface';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private URL_BASE: string = !environment.production? 'http://localhost:8080' : '';

  private urlAPI = this.URL_BASE + '/api/orders/';

  constructor(private http: HttpClient) { }

  //Obtener pedidos de la base de datos
  getOrder(id?: string|undefined): Observable<UserOrderI[]>{
    return this.http.get<UserOrderI[]>(this.urlAPI + (id||''));
  }

  //Guardar pedido en la base de datos
  saveOrder(user: DataUserI, order: OrderI[]): Observable<UserOrderI>{
    return this.http.post<UserOrderI>(this.urlAPI, { user, order });
  }

  //Obtener pedidos de un usuario por email
  getMyOrders(email: string): Observable<MyOrderI[]>{
    return this.getOrder().pipe(
      map((data: UserOrderI[]) => {
        const myorders: MyOrderI[] = [];
        data.forEach(elem => {
          if(email == elem.user.email) {
            let order = {
              total: this.CalcTotal(elem.order),
              order: elem.order
            }
            myorders.push(order);
          }
        })
        return myorders;
      })
    );
  }

  //Calcular el precio total por pedido
  CalcTotal(orders: OrderI[]) {
    let total: number = 0;
    orders.forEach((elem:any) => {
      let subtotal = elem.days*elem.price;
      total += subtotal;
    })
    return total;
  }

}
