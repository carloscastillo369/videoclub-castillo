import { Injectable } from "@angular/core";
import { filter, map, mergeMap, switchMap } from "rxjs/operators";

//Servicio api_películas
import { OrderService } from "src/app/services/order.service";

//Sevicio de autenticación
import { AuthService } from "src/app/services/auth.service";

//NgRx
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromOrdersActions from "./orders.actions";
import { RouterNavigatedAction, ROUTER_NAVIGATION } from "@ngrx/router-store";


@Injectable()
export class OrdersEffects {
    constructor(
        private actions$: Actions,
        private _ordeService: OrderService,
        private _authService: AuthService
    ) {}

    //effect Obtener Pedidos
    loadOrders$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(fromOrdersActions.loadOrders),
            mergeMap((action) => {
                return this._ordeService.getOrder().pipe(
                    map((orders) => {
                        return fromOrdersActions.loadOrdersSuccess({ orders });
                    })
                );
            })
        );
    });

    //effect realizar pedido
    addOrder$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(fromOrdersActions.addOrder), 
            mergeMap((action) => {
                return this._ordeService.saveOrder(action.user, action.order).pipe(
                    map((order) => {
                        return fromOrdersActions.addOrderSuccess({ order });
                    })
                );
            })
        );
    });

    //Obtener un pedido por id
    getSingleOrder$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ROUTER_NAVIGATION),
            filter((r: RouterNavigatedAction) => {
                return r.payload.routerState.url.startsWith('/admin/orders/orderdetail');
            }),
            map((r: any) => {
                return r.payload.routerState['params']['id'];
            }),
            switchMap((id) => {
                return this._ordeService.getOrder(id).pipe(
                    map((orders) => {
                        return fromOrdersActions.loadOrdersSuccess({ orders });
                    })
                );
            })
        );
    });

    //Obtener los pedidos de un usuario por su email
    loadMyOrders$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(fromOrdersActions.loadMyOrders),
            mergeMap((action) => {
                const dataUser = this._authService.getDataUserFromLocalStorage();
                const email = dataUser.email;
                return this._ordeService.getMyOrders(email).pipe(
                    map((orders) => {
                        const myorders = orders;
                        return fromOrdersActions.loadMyOrdersSuccess({ myorders });
                    })
                );
            })
        );
    });
}
