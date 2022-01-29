import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap, tap } from 'rxjs/operators';

import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';

import { AuthService } from 'src/app/services/auth.service';

//NgRx
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { autoSignIn, SignOut, signInStart, signInSuccess, signUpStart, signUpSuccess } from 'src/app/state/auth/auth.actions';
import { setLoadingSpinner, setErrorMessage } from 'src/app/store/shared/shared.actions';


@Injectable()
export class AuthEffects {

    private duration: number = 2;
    private verticalPosition: MatSnackBarVerticalPosition = 'top';
    private horizontalPosition: MatSnackBarHorizontalPosition = 'center';

    constructor(
        private store: Store<AppState>,
        private actions$: Actions, 
        private _authService: AuthService,
        private router: Router,
        private snackBar: MatSnackBar,
    ) {}

    //effect de Inicio de Sesión
    singIn$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(signInStart), 
            exhaustMap((action) => {
                return this._authService.signIn(action.user).pipe(
                    map(data => {
                        this.store.dispatch(setLoadingSpinner({ status: false }));
                        this._authService.setDataUserInLocalStorage(data);
                        this.snackBar.openFromComponent( SnackBarComponent, {
                            data: `Bienvenido: ${data.name}!`,
                            duration: this.duration*1000,
                            verticalPosition: this.verticalPosition,
                            horizontalPosition: this.horizontalPosition,
                            panelClass: 'success'
                        });
                        return signInSuccess({ data, redirect: true });
                    }),
                    catchError(err => {
                        this.store.dispatch(setLoadingSpinner({ status: false }));
                        const error = err.error.msg;
                        return of(setErrorMessage({ message: error }));
                    })
                );
            })
        );
    });

    //effect navegar depués de Iniciar Sesión 
    signInRedirect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(signInSuccess), 
            tap((action) => {
                const data = action?.data;
                const isAdmin = data?.role;
                if(action.redirect) {
                    this.router.navigate(isAdmin? ['/admin/list'] : ['/public/movies']);
                }
            })
        );
    }, 
    { dispatch: false});

    //effect mantener Inicio de Sesión
    autoSignIn$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(autoSignIn), 
            mergeMap((action) => {
                const data = this._authService.getDataUserFromLocalStorage();
                return of(signInSuccess({ data, redirect: false }))
            })
        );
    })

    //effect Registro
    singUp$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(signUpStart), 
            exhaustMap((action) => {
                return this._authService.signUp(action.user).pipe(
                    map(data => {
                        this.store.dispatch(setLoadingSpinner({ status: false }));
                        this.snackBar.openFromComponent( SnackBarComponent, {
                            data: `${data.msg}`,
                            duration: this.duration*1000,
                            verticalPosition: this.verticalPosition,
                            horizontalPosition: this.horizontalPosition,
                            panelClass: 'success'
                        });
                        return signUpSuccess({ data });
                    }),
                    catchError(err => {
                        this.store.dispatch(setLoadingSpinner({ status: false }));
                        const error = err.error.msg;
                        return of(setErrorMessage({ message: error }));
                    })
                );
            })
        );
    });

    //effect navegar después de Registrarse
    signUpRedirect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(signUpSuccess), 
            map((action) => {
                this.router.navigate(['/signin']);
            })
        );
    }, 
    { dispatch: false});

    //effect Cerrar Sesión
    signOut$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(SignOut), 
            map((action) => {
                this._authService.signOut();
            })
        );
    }, {dispatch: false})
}
