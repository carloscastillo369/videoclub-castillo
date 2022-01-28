import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { map, mergeMap, withLatestFrom } from "rxjs/operators";

//Servicio de autenticación
import { AuthService } from "src/app/services/auth.service";

//NgRx
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loadUser, loadUserSuccess } from './user.actions';


@Injectable()
export class UserEffects {
    constructor(
        private store: Store<AppState>,
        private actions$: Actions,
        private _authService: AuthService,
        private router: Router
    ) {}

    //effect Obtener datos de usuario de una ruta protegida
    loadUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadUser),
            mergeMap((action) => {
                return this._authService.getDataUser().pipe(
                    map((data) => {
                        const user = data.dataUser;
                        return loadUserSuccess({ user });
                    })
                );
            })
        );
    });
}
