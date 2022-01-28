import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DataUserI } from '../core/interfaces/user.interface';
import { OrderI } from '../core/interfaces/order.interface';
import { UserOrderI } from '../core/interfaces/user-order.interface';

import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private URL_BASE: string = !environment.production? 'http://localhost:8080' : '';

  private urlAPI = this.URL_BASE + '/api/orders/';

  constructor(private http: HttpClient) { }

  getOrder(id?: string|undefined){
    return this.http.get<UserOrderI[]>(this.urlAPI + (id||''));
  }

  saveOrder(user: DataUserI, order: OrderI[]){
    return this.http.post<any>(this.urlAPI, { user, order });
  }

}
