import { createReducer, on } from "@ngrx/store";
import { initialState } from './auth.state';
import { signInSuccess, signOut } from './auth.actions';

const _authReducer = createReducer(
    initialState,
    on(signInSuccess, (state, action) => {
        return {
            ...state,
            data: action.data
        }
    }),
    on(signOut, (state) => {
        return {
            ...state,
            data: null
        }
    })
);

export function AuthReducer(state: any, action: any) {
    return _authReducer(state, action);
}