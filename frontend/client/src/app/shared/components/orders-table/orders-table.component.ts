import { Component, Input, OnInit } from '@angular/core';

//Interfaz de pedido
import { OrderI } from 'src/app/core/interfaces/order.interface';


@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.css']
})
export class OrdersTableComponent implements OnInit {

  //Variable proveniente desde el módulo admin/orders, public/checkout, public/myorders
  @Input() orders!: OrderI[];

  //Mat-Table
  public displayedColumns: string[] = ['posicion','descripcion', 'días', 'precio', 'subtotal'];

  constructor() { }

  ngOnInit(): void {
  }

}
