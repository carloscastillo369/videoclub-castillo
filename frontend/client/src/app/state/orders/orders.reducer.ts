import { createReducer, on } from "@ngrx/store";
import * as fromOrdersActions from "./orders.actions";
import { initialState } from "./orders.state";

const _ordersReducer = createReducer(
    initialState,
    on(fromOrdersActions.loadOrdersSuccess, (state, action) => {
        return {
            ...state,
            orders: action.orders
        }
    }),
    on(fromOrdersActions.addOrderSuccess, (state, action) => {
        let order = { ...action.order };

        return {
            ...state,
            orders: [...state.orders, order]
        }
    }),
    on(fromOrdersActions.loadMyOrdersSuccess, (state, action) => {
        return {
            ...state,
            myorders: action.myorders
        }
    })
);

export function OrdersReducer(state: any, action: any) {
    return _ordersReducer(state, action);
}