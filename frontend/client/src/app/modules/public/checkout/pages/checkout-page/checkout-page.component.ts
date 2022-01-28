import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

//Interfaz de datos usuario y pedido
import { DataUserI } from 'src/app/core/interfaces/user.interface';
import { OrderI } from 'src/app/core/interfaces/order.interface';

//Servicios autenticación, carrito, pedido y api_películas
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { ApiMoviesService } from 'src/app/services/api-movies.service';

import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';
import Swal from 'sweetalert2';

//NgRx
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { loadUser } from 'src/app/state/user/user.actions';
import { getUser } from 'src/app/state/user/user.selector';


@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {

  public user!: Observable<DataUserI | null>;
  public orders: OrderI[] = [];
  public totalPrice: number = 0;

  duration: number = 3;
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';

  constructor(
    private _authService: AuthService,
    private _cartService: CartService,
    private _orderService: OrderService,
    private _apiMoviesService: ApiMoviesService,
    private snackBar: MatSnackBar,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.user = this.store.select(getUser);
    this.store.dispatch(loadUser());
    this.getItemsCart();
  }

  getItemsCart() {
    this._cartService.getCartMoviesList().subscribe(res => {
      let Orders: OrderI[] = [];
      res.map((i:any) => {
        const order:OrderI = {
          id: i.id, 
          title: i.title, 
          price: i.price,
          days: i.days
        }
        Orders.push(order)
      })
      this.orders = Orders;
      this.totalPrice = this._cartService.getTotalPrice();
    })
  }

  payment(user: DataUserI ) { 
    this._orderService.saveOrder(user, this.orders)
    .subscribe(res => {
      this.orders.forEach(elem => {
        this.reduceStock(elem.id);
      })
    })
    setTimeout(() => {
      this.snackBar.openFromComponent( SnackBarComponent, {
        data: 'Pedido realizado con éxito!',
        duration: this.duration*1000,
        verticalPosition: this.verticalPosition,
        horizontalPosition: this.horizontalPosition,
        panelClass: 'success'
      })
      this._cartService.removeAllCart();
      this.router.navigate(['/public/movies']);      
    }, 3000)
  }

  reduceStock(id:string) {
    this._apiMoviesService.getMovie(id).subscribe((res:any) => {
      let actualStock = res[0].stock;
      let newStock = actualStock - 1;
      this._apiMoviesService.updateMovie({stock: newStock}, id).subscribe(res => {
        this.snackBar.openFromComponent( SnackBarComponent, {
          data: 'Procesando tu compra...',
          duration: this.duration*1000,
          verticalPosition: this.verticalPosition,
          horizontalPosition: this.horizontalPosition,
          panelClass: 'error'
        })
      })
    })
  }
}
