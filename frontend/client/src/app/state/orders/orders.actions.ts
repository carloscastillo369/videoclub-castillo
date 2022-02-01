import { createAction, props } from "@ngrx/store";
import { UserOrderI } from "src/app/core/interfaces/user-order.interface";
import { DataUserI } from "src/app/core/interfaces/user.interface";
import { OrderI } from "src/app/core/interfaces/order.interface";
import { MyOrderI } from "src/app/core/interfaces/myorder.interface";

export const LOAD_ORDERS = '[Orders page] Load orders';
export const LOAD_ORDERS_SUCCESS = '[Orders page] Load orders success';

export const ADD_ORDER_ACTION = '[Orders page] Add order';
export const ADD_ORDER_SUCCESS = '[Orders page] Add order success';

export const LOAD_MY_ORDERS = '[MyOrders page] Load my orders';
export const LOAD_MY_ORDERS_SUCCESS = '[MyOrders page] Load my orders success';

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

export const loadMyOrders = createAction(LOAD_MY_ORDERS);

export const loadMyOrdersSuccess = createAction(
    LOAD_MY_ORDERS_SUCCESS,
    props<{ myorders: MyOrderI[] }>()
);
