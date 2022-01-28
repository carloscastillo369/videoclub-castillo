import { createReducer, on } from "@ngrx/store";
import { loadUserSuccess } from './user.actions';
import { initialState } from "./user.state";

const _userReducer = createReducer(
    initialState,
    on(loadUserSuccess, (state, action) => {
        return {
            ...state,
            user: action.user
        }
    })
);

export function UserReducer(state: any, action: any) {
    return _userReducer(state, action);
}