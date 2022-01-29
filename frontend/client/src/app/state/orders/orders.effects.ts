import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { filter, map, mergeMap, switchMap, withLatestFrom } from "rxjs/operators";
import { of } from "rxjs";
import Swal from 'sweetalert2';

//Servicio api_películas
import { OrderService } from "src/app/services/order.service";

//NgRx
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addOrder, addOrderSuccess, loadOrders, loadOrdersSuccess } from "./orders.actions";
import { RouterNavigatedAction, ROUTER_NAVIGATION } from "@ngrx/router-store";
import { getOrders } from "./orders.selector";
import { dummyAction } from "../auth/auth.actions";
import { AuthService } from "src/app/services/auth.service";


@Injectable()
export class OrdersEffects {
    constructor(
        private store: Store<AppState>,
        private actions$: Actions,
        private _ordeService: OrderService,
        private _authService: AuthService,
        private router: Router
    ) {}

    //effect Obtener Pedidos
    loadOrders$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadOrders),
            withLatestFrom(this.store.select(getOrders)), //evitar llamadas al api http si la data ya está en el store
            mergeMap(([action, orders]) => {
                if(!orders.length || orders.length === 1) {
                    return this._ordeService.getOrder().pipe(
                        map((orders) => {
                            return loadOrdersSuccess({ orders });
                        })
                    );
                }
                return of(dummyAction());
            })
        );
    });

    //effect Crear película
    addOrder$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(addOrder), 
            mergeMap((action) => {
                return this._ordeService.saveOrder(action.user, action.order).pipe(
                    map((order) => {
                        return addOrderSuccess({ order });
                    })
                );
            })
        );
    });

    /*
    //effect navegar después de Crear película
    addMovieRedirect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(addMovieSuccess), 
            map((action) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Nueva película agregada',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.router.navigate(['/admin/list']);
            })
        );
    }, 
    { dispatch: false});*/


    getSingleOrder$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ROUTER_NAVIGATION),
            filter((r: RouterNavigatedAction) => {
                return r.payload.routerState.url.startsWith('/admin/orders/orderdetail');
            }),
            map((r: any) => {
                return r.payload.routerState['params']['id'];
            }),
            withLatestFrom(this.store.select(getOrders)), //evitar llamadas al api http si la data ya está en el store
            switchMap(([id, orders]) => {
                if(!orders.length) {
                    return this._ordeService.getOrder(id).pipe(
                        map((orders) => {
                            return loadOrdersSuccess({ orders });
                        })
                    );
                }
                return of(dummyAction());
            })
        );
    });
}
