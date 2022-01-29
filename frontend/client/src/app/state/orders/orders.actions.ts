import { createAction, props } from "@ngrx/store";
import { UserOrderI } from "src/app/core/interfaces/user-order.interface";
import { DataUserI } from "src/app/core/interfaces/user.interface";
import { OrderI } from "src/app/core/interfaces/order.interface";

export const LOAD_ORDERS = '[MyOrders | Orders page] Load orders';
export const LOAD_ORDERS_SUCCESS = '[MyOrders | Orders page] Load orders success';

export const ADD_ORDER_ACTION = '[Checkout page] Add order';
export const ADD_ORDER_SUCCESS = '[Checkout page] Add order success';

export const loadOrders = createAction(LOAD_ORDERS);

export const loadOrdersSuccess = createAction(
    LOAD_ORDERS_SUCCESS,
    props<{ orders: UserOrderI[] }>()
);

export const addOrder = createAction(
    ADD_ORDER_ACTION, 
    props<{ user: DataUserI, order: OrderI[] }>()
);
export const addOrderSuccess = createAction(
    ADD_ORDER_SUCCESS,
    props<{ order: UserOrderI }>()
);
