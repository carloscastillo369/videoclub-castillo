import { createReducer, on } from "@ngrx/store";
import { CartI } from "src/app/core/interfaces/cart.interface";
import * as fromCarActions from './cart.actions';
import { initialState } from "./cart.state";

const _cartReducer = createReducer(
    initialState,
    on(fromCarActions.loadCartSuccess, (state, action) => {
        return {
            ...state,
            cart: action.cart
        }
    }),
    on(fromCarActions.addCartSuccess, (state, action) => {
        let item = { ...action.item };

        return {
            ...state,
            cart: [...state.cart, item]
        }
    }),
    on(fromCarActions.deleteItemCartSuccess, (state, { id }) => {
        let updatedCart = state.cart.filter((item) => {
            return item.id !== id;
        })

        return {
            ...state,
            cart: updatedCart
        }
    }),
    on(fromCarActions.deleteCartSuccess, (state, action) => {
        return {
            ...state,
            cart: action.cart
        }
    }),
    on(fromCarActions.increaseDaysItemCartSuccess, (state, { id }) => {
        let updatedCart = state.cart.map((item) => {
            const newday = item.days + 1;
            const updatedItemCart: CartI = {
              id: item.id,
              title: item.title,
              image: item.image,
              year: item.year,
              runtime: item.runtime,
              price: item.price,
              days: newday,
              stock: item.stock
            }
            return item.id == id? updatedItemCart : item;
        })

        return {
            ...state,
            cart: updatedCart
        }
    }),
    on(fromCarActions.decreaseDaysItemCartSuccess, (state, { id }) => {
        let updatedCart = state.cart.map((item) => {
            const newday = item.days - 1;
            const updatedItemCart: CartI = {
              id: item.id,
              title: item.title,
              image: item.image,
              year: item.year,
              runtime: item.runtime,
              price: item.price,
              days: newday,
              stock: item.stock
            }
            return item.id == id? updatedItemCart : item;
        })

        return {
            ...state,
            cart: updatedCart
        }
    }),
    on(fromCarActions.changeDaysItemCartSuccess, (state, { id, days }) => {
        const updatedCart = state.cart.map((item) => {
            let newday = 0;
            if(days < 1) {
              newday = 1;
            } else if(days >= 1 && days <= 30) {
              newday = days;
            } else {
              newday = 30;
            }
            const updatedItemCart: CartI = {
              id: item.id,
              title: item.title,
              image: item.image,
              year: item.year,
              runtime: item.runtime,
              price: item.price,
              days: newday,
              stock: item.stock
            }
            return item.id == id? updatedItemCart : item;
          });

        return {
            ...state,
            cart: updatedCart
        }
    })
);

export function CartReducer(state: any, action: any) {
    return _cartReducer(state, action);
}