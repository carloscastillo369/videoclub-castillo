import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.state';

export const CART_STATE_NAME = 'cart';

const getCartState = createFeatureSelector<CartState>(CART_STATE_NAME);

export const getCart = createSelector(getCartState, (state) => {
    return state.cart;
});

export const getQtyItemsCart = createSelector(getCartState, (state) => {
    return state.cart.length;
});

export const getTotalPriceCart = createSelector(getCartState, (state) => {
    let total = 0;
    state.cart.map(i => total += i.price*i.days )
    return total;
});