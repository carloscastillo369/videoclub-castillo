import { createAction, props } from "@ngrx/store";
import { DataUserI } from "src/app/core/interfaces/user.interface";

export const LOAD_USER = '[Checkout page] Load user';
export const LOAD_USER_SUCCESS = '[Checkout page] Load user success';

export const loadUser = createAction(LOAD_USER);

export const loadUserSuccess = createAction(
    LOAD_USER_SUCCESS,
    props<{ user: DataUserI }>()
);