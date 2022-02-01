import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterStateUrl } from 'src/app/store/router/custom-serializer';
import { getCurrentRoute } from 'src/app/store/router/router-selector';
import { OrdersState } from './orders.state';

export const ORDERS_STATE_NAME = 'orders';

const getOrdersState = createFeatureSelector<OrdersState>(ORDERS_STATE_NAME);

export const getOrders = createSelector(getOrdersState, (state) => {
    return state.orders;
});

export const getOrderById = createSelector(
    getOrders, 
    getCurrentRoute, 
    (orders, route: RouterStateUrl) => {
        return orders? orders.find((order) => order._id === route.params['id']) : null;
    }
);

export const getMyOrders = createSelector(getOrdersState, (state) => {
    return state.myorders;
});
