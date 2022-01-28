import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

//Interfaz de datos de usuario
import { DataUserI } from '../core/interfaces/user.interface';

//Interfaz de pedido de compra
import { OrderI } from '../core/interfaces/order.interface';

//Interfaz de pedido de la base de datos
import { UserOrderI } from '../core/interfaces/user-order.interface';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private URL_BASE: string = !environment.production? 'http://localhost:8080' : '';

  private urlAPI = this.URL_BASE + '/api/orders/';

  constructor(private http: HttpClient) { }

  //Obtener pedidos de la base de datos
  getOrder(id?: string|undefined){
    return this.http.get<UserOrderI[]>(this.urlAPI + (id||''));
  }

  //Guardar pedido en la base de datos
  saveOrder(user: DataUserI, order: OrderI[]){
    return this.http.post<any>(this.urlAPI, { user, order });
  }

}
