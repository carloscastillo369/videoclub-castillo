import { createFeatureSelector, createSelector, props } from '@ngrx/store';
import { UserState } from './user.state';

export const USER_STATE_NAME = 'user';

const getUserState = createFeatureSelector<UserState>(USER_STATE_NAME);

export const getUser = createSelector(getUserState, (state) => {
    return state.user
})