import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

//Interfaz de datos de usuario
import { DataUserI } from 'src/app/core/interfaces/user.interface';

//NgRx
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getOrders } from 'src/app/state/orders/orders.selector';
import { loadOrders } from 'src/app/state/orders/orders.actions';


@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css']
})
export class OrdersPageComponent implements OnInit {

  //Variable datos de usuario
  public users!: DataUserI[];

  //Mat-Table
  displayedColumns: string[] = ['id','nombre', 'email', 'accion'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  //Variable para suscribirse y desuscribirse a un observable
  private subscription: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.getOrders();
  }

  //Desuscripción a un observable
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  //Obtener pedidos
  getOrders(){
    this.subscription.add(
      this.store.select(getOrders).subscribe(res => {
        let users: DataUserI[] = [];
        res.forEach((elem:any) => {
          let user =  {
            id: elem._id,
            ...elem.user
          }
          users.push(user)
        });
        this.users = users;
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
      })
    );
    this.store.dispatch(loadOrders());
  }
}
