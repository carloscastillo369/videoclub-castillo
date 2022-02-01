import { createReducer, on } from "@ngrx/store";
import { addCartSuccess, deleteCartSuccess, deleteItemCartSuccess, loadCartSuccess } from './cart.actions';
import { initialState } from "./cart.state";

const _cartReducer = createReducer(
    initialState,
    on(loadCartSuccess, (state, action) => {
        return {
            ...state,
            cart: action.cart
        }
    }),
    on(addCartSuccess, (state, action) => {
        let item = { ...action.item };

        return {
            ...state,
            cart: [...state.cart, item]
        }
    }),
    on(deleteItemCartSuccess, (state, { id }) => {
        let updatedCart = state.cart.filter((item) => {
            return item.id !== id;
        })

        return {
            ...state,
            cart: updatedCart
        }
    }),
    on(deleteCartSuccess, (state) => {
        return {
            ...state,
            cart: []
        }
    })
);

export function CartReducer(state: any, action: any) {
    return _cartReducer(state, action);
}