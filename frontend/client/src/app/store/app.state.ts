import { SHARED_STATE_NAME } from './shared/shared.selector';
import { SharedState } from './shared/shared.state';
import { SharedReducer } from './shared/shared.reducer';

import { AUTH_STATE_NAME } from '../state/auth/auth.selector';
import { AuthState } from '../state/auth/auth.state';
import { AuthReducer } from '../state/auth/auth.reducer';

import { MOVIES_STATE_NAME } from '../state/movies/movies.selector';
import { MoviesState } from 'src/app/state/movies/movies.state';
import { MoviesReducer } from 'src/app/state/movies/movies.reducer';

import { USER_STATE_NAME } from '../state/user/user.selector';
import { UserState } from 'src/app/state/user/user.state';
import { UserReducer } from 'src/app/state/user/user.reducer';

import { ORDERS_STATE_NAME } from '../state/orders/orders.selector';
import { OrdersState } from 'src/app/state/orders/orders.state';
import { OrdersReducer } from 'src/app/state/orders/orders.reducer';

import { routerReducer, RouterReducerState } from '@ngrx/router-store';


export interface AppState {
    [SHARED_STATE_NAME]: SharedState;
    [AUTH_STATE_NAME]: AuthState;
    [MOVIES_STATE_NAME]: MoviesState;
    [USER_STATE_NAME]: UserState;
    [ORDERS_STATE_NAME]: OrdersState;
    router: RouterReducerState;
}

export const appReducer = {
    [SHARED_STATE_NAME]: SharedReducer,
    [AUTH_STATE_NAME]: AuthReducer,
    [MOVIES_STATE_NAME]: MoviesReducer,
    [USER_STATE_NAME]: UserReducer,
    [ORDERS_STATE_NAME]: OrdersReducer,
    router: routerReducer
}