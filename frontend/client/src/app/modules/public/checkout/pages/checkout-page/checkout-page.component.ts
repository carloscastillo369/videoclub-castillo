import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';

//Interfaz de datos usuario y pedido
import { DataUserI } from 'src/app/core/interfaces/user.interface';
import { OrderI } from 'src/app/core/interfaces/order.interface';

//Servicio api_películas
import { ApiMoviesService } from 'src/app/services/api-movies.service';

//Componente SnackBar
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';

//NgRx
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { loadUser } from 'src/app/state/user/user.actions';
import { getUser } from 'src/app/state/user/user.selector';
import { getCart, getTotalPriceCart } from 'src/app/state/cart/cart.selector';
import { deleteCart, deleteItemCart, loadCart } from 'src/app/state/cart/cart.actions';
import { addOrder } from 'src/app/state/orders/orders.actions';


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
  public totalPriceCart: number = 0;

  //Variable para el SnackBar
  private duration: number = 3;
  private verticalPosition: MatSnackBarVerticalPosition = 'top';
  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';

  //Variable para suscribirse y desuscribirse a un observable
  private subscription: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    private _apiMoviesService: ApiMoviesService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getItemsCart();
    this.getTotalPriceCart();
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

  //Obtener los items del carrito y pasarlo como pedido
  getItemsCart() {
    this.subscription.add(
      this.store.select(getCart).subscribe(res => {
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
      })
    );
    this.store.dispatch(loadCart());
  }

  //Obtener el precio total del pedido
  getTotalPriceCart() {
    this.store.select(getTotalPriceCart).subscribe(res => {
      this.totalPriceCart = res;
    })
  }

  //Realizar pedido de compra
  payment(user: DataUserI, orders: OrderI[]) {
    let availableMovies: OrderI[] = []; //películas disponibles del pedido
    let noAvailableMovies: OrderI[] = []; //películas no disponibles del pedido
    orders.forEach(elem => {
      this._apiMoviesService.getMovie(elem.id).subscribe(res => {
        const movie = res[0];
        if(movie.stock > 0){
          availableMovies.push(elem);          
        } else {
          noAvailableMovies.push(elem);
        }
      })
    })
    this.snackBar.openFromComponent( SnackBarComponent, {
      data: {
        title: '',
        message: 'Procesando tu compra...'
      },
      duration: this.duration*1000,
      verticalPosition: this.verticalPosition,
      horizontalPosition: this.horizontalPosition,
      panelClass: 'processing'
    })

    //Se verifica que el número de items del pedido sea igual a el número de películas disponibles
    setTimeout(() => {
      if(orders.length == availableMovies.length) {
        this.store.dispatch(addOrder({ user: user, order: orders })); //Si son iguales se procede con la compra
        
        orders.forEach(elem => {
          this.reduceStock(elem.id); //Por coda item del pedido se reduce el stock en la base de datos
        })

        setTimeout(() => {
          //Se muestra un mensaje de éxito de compra
          this.snackBar.openFromComponent( SnackBarComponent, {
            data: {
              title: '',
              message: 'Pedido realizado con éxito!'
            },
            duration: this.duration*1000,
            verticalPosition: this.verticalPosition,
            horizontalPosition: this.horizontalPosition,
            panelClass: 'success'
          })
          this.store.dispatch(deleteCart()); //Se remueve los items del carrito
          this.router.navigate(['/public/movies']); //Se navega hace la lista de películas
        }, 3000); //Tiempo para que se actualice la base de datos

      } else {
        //Se muestra un mensaje de error de pedido no completado
        this.snackBar.openFromComponent( SnackBarComponent, {
          data: {
            title: 'Pedido no completado',
            message: noAvailableMovies.length > 1? 
              'Las siguiente películas ya no están disponibles. Por favor, verifica tu carrito de compras'
              : 
              'La siguiente película ya no está disponible. Por favor, verifica tu carrito de compras',
            orders: noAvailableMovies
          },
          duration: this.duration*3000,
          verticalPosition: this.verticalPosition,
          horizontalPosition: this.horizontalPosition,
          panelClass: 'error'
        })
        noAvailableMovies.forEach(elem => {
          this.store.dispatch(deleteItemCart({ id: elem.id })); //Se elimina las películas no disponibles en el carrito
        })
        this.router.navigate(['/public/cart']); //Se navega hacia el cart, para que el usuario verifique los cambios        
      }
    }, 300); //Tiempo para que se carguen los datos en la variable availableMovies
  }

  //Reducir el stock en la base de datos
  reduceStock(id:string) {
    this.subscription.add(
      this._apiMoviesService.getMovie(id).subscribe(res => {
        const movie = res[0];
        let actualStock = movie.stock;
        let newStock = actualStock - 1;
        this.upDateStock(newStock, id);
      })
    );
  }

  //Actualizar el stock en la base de datos
  upDateStock(newStock: number, id: string) {
    this.subscription.add(
      this._apiMoviesService.updateMovie({ stock: newStock }, id).subscribe(res => {})  
    );
  }

}
