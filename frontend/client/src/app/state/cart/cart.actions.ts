import { createAction, props } from "@ngrx/store";
import { CartI } from "src/app/core/interfaces/cart.interface";

export const LOAD_CART = '[Cart page] Load cart';
export const LOAD_CART_SUCCESS = '[Cart page] Load cart success';

export const ADD_CART_ACTION = '[Cart page] Add cart';
export const ADD_CART_SUCCESS = '[Cart page] Add cart success';

export const DELETE_ITEM_CART_ACTION = '[Cart page] Delete item cart';
export const DELETE_ITEM_CART_SUCCESS = '[Cart page] Delete item cart success';

export const DELETE_CART_ACTION = '[Cart page] Delete cart';
export const DELETE_CART_SUCCESS = '[Cart page] Delete cart success';

export const INCREASE_DAYS_ITEM_CART_ACTION = '[Cart page] Increase days item cart';
export const INCREASE_DAYS_ITEM_CART_SUCCESS = '[Cart page] Increase days item cart success';

export const DECREASE_DAYS_ITEM_CART_ACTION = '[Cart page] Decrease days item cart';
export const DECREASE_DAYS_ITEM_CART_SUCCESS = '[Cart page] Decrease days item cart success';

export const CHANGE_DAYS_ITEM_CART_ACTION = '[Cart page] Change days item cart';
export const CHANGE_DAYS_ITEM_CART_SUCCESS = '[Cart page] Change days item cart success';

export const loadCart = createAction(LOAD_CART);

export const loadCartSuccess = createAction(
    LOAD_CART_SUCCESS,
    props<{ cart: CartI[] }>()
);

export const addCart = createAction(
    ADD_CART_ACTION, 
    props<{ item: CartI }>()
);
export const addCartSuccess = createAction(
    ADD_CART_SUCCESS,
    props<{ item: CartI }>()
);

export const deleteItemCart = createAction(
    DELETE_ITEM_CART_ACTION, 
    props<{ id: string }>()
);

export const deleteItemCartSuccess = createAction(
    DELETE_ITEM_CART_SUCCESS,
    props<{ id: string }>()
);

export const deleteCart = createAction(DELETE_CART_ACTION);

export const deleteCartSuccess = createAction(
    DELETE_CART_SUCCESS,
    props<{ cart: CartI[] }>()
);

export const increaseDaysItemCart = createAction(
    INCREASE_DAYS_ITEM_CART_ACTION, 
    props<{ id: string }>()
);

export const increaseDaysItemCartSuccess = createAction(
    INCREASE_DAYS_ITEM_CART_SUCCESS,
    props<{ id: string }>()
);

export const decreaseDaysItemCart = createAction(
    DECREASE_DAYS_ITEM_CART_ACTION, 
    props<{ id: string }>()
);

export const decreaseDaysItemCartSuccess = createAction(
    DECREASE_DAYS_ITEM_CART_SUCCESS,
    props<{ id: string }>()
);

export const changeDaysItemCart = createAction(
    CHANGE_DAYS_ITEM_CART_ACTION, 
    props<{ id: string, days: number }>()
);

export const changeDaysItemCartSuccess = createAction(
    CHANGE_DAYS_ITEM_CART_SUCCESS,
    props<{ id: string, days: number }>()
);