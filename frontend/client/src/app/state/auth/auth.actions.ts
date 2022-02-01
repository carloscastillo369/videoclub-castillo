import { createAction, props } from "@ngrx/store";

import { RegisteredUserI } from 'src/app/core/interfaces/user.interface';
import { NewUserI } from 'src/app/core/interfaces/user.interface';
import { SignInResponseI } from 'src/app/core/interfaces/authResponse.interface';
import { SignUpResponseI } from 'src/app/core/interfaces/authResponse.interface';

export const SIGNIN_START = '[SignIn page] SignIn start';
export const SIGNIN_SUCCESS = '[SignIn page] SignIn success';

export const SIGNUP_START = '[SignUp page] SignUp start';
export const SIGNUP_SUCCESS = '[SignUp page] SignUp success';

export const AUTO_SIGNIN_ACTION = '[auth page] Auto signIn';
export const SIGNOUT_ACTION = '[auth page] Auto signOut';

export const signInStart = createAction(
    SIGNIN_START, 
    props<{ user: RegisteredUserI }>()
);

export const signInSuccess = createAction(
    SIGNIN_SUCCESS, 
    props<{ data: SignInResponseI, redirect: boolean }>()
);

export const signUpStart = createAction(
    SIGNUP_START, 
    props<{ user: NewUserI }>()
);

export const signUpSuccess = createAction(
    SIGNUP_SUCCESS, 
    props<{ data: SignUpResponseI }>()
);

export const autoSignIn = createAction(AUTO_SIGNIN_ACTION);

export const signOut = createAction(SIGNOUT_ACTION);
