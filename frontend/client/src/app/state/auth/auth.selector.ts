import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.state";

export const AUTH_STATE_NAME = 'auth';

const getAuthState = createFeatureSelector<AuthState>(AUTH_STATE_NAME);

export const isAuthenticated = createSelector(getAuthState, (state) => {
    return state.data? true: false;
})

export const getDataUser = createSelector(getAuthState, (state) => {
    return state.data? state.data : null; 
})

export const getToken = createSelector(getAuthState, (state) => {
    return state.data? state.data.token : null; 
})
