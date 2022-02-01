import { CartI } from "src/app/core/interfaces/cart.interface";

export interface CartState {
    cart: CartI[];
}

export const initialState: CartState = {
    cart: []
};