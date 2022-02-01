import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';

//Interfaz de datos usuario y pedido
import { DataUserI } from 'src/app/core/interfaces/user.interface';
import { OrderI } from 'src/app/core/interfaces/order.interface';

//Servicios autenticación, carrito, pedido y api_películas
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { ApiMoviesService } from 'src/app/services/api-movies.service';

//Componente SnackBar
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';

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
export class CheckoutPageComponent implements OnInit, OnDestroy {

  //Variable datos de usuario
  public user!: Observable<DataUserI | null>;

  //Variable de pedido
  public orders: OrderI[] = [];

  //Variable precio total del pedido
  public totalPrice: number = 0;

  //Variable para el SnackBar
  private duration: number = 3;
  private verticalPosition: MatSnackBarVerticalPosition = 'top';
  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';

  //Variable para suscribirse y desuscribirse a un observable
  private subscription: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    private _cartService: CartService,
    private _orderService: OrderService,
    private _apiMoviesService: ApiMoviesService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getItemsCart();
  }

  //Desuscripción a un observable
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  //Obtener datos de usuario
  getUser() {
    this.user = this.store.select(getUser);
    this.store.dispatch(loadUser());
  }

  //Obtener los items del carrito y pasarlo como pedidos
  getItemsCart() {
    this.subscription.add(
      this._cartService.getCartMoviesList().subscribe(res => {
        let orders: OrderI[] = [];
        res.map((i:any) => {
          const order: OrderI = {
            id: i.id, 
            title: i.title, 
            price: i.price,
            days: i.days
          }
          orders.push(order)
        })
        this.orders = orders;
        this.totalPrice = this._cartService.getTotalPrice();
      })
    );
  }

  //Realizar pedido de compra
  payment(user: DataUserI, orders: OrderI[]) {
    this.subscription.add(    
      this._orderService.saveOrder(user, orders).subscribe(res => {
        this.orders.forEach(elem => {
          this.reduceStock(elem.id);
        })
      })
    );
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
    }, 3000);
  }

  //Reducir el stock en la base de datos
  reduceStock(id:string) {
    this.subscription.add(
      this._apiMoviesService.getMovie(id).subscribe(res => {
        const movie = res[0];
        if(movie.stock != 0) {
          let actualStock = movie.stock;
          let newStock = actualStock - 1;
          this.upDateStock(newStock, id);
        }
      })
    );
  }

  //Actualizar el stock en la base de datos
  upDateStock(newStock: number, id: string) {
    this.subscription.add(
      this._apiMoviesService.updateMovie({stock: newStock}, id).subscribe(res => {
        this.snackBar.openFromComponent( SnackBarComponent, {
          data: 'Procesando tu compra...',
          duration: this.duration*1000,
          verticalPosition: this.verticalPosition,
          horizontalPosition: this.horizontalPosition,
          panelClass: 'processing'
        })
      })  
    );
  }
}
