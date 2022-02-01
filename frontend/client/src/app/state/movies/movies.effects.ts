import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { filter, map, mergeMap, switchMap } from "rxjs/operators";
import Swal from 'sweetalert2';

//Servicio api_películas
import { ApiMoviesService } from "src/app/services/api-movies.service";

//Servicio de autenticación
import { AuthService } from "src/app/services/auth.service";

//NgRx
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addMovie, loadMovies, loadMoviesSuccess, addMovieSuccess, updateMovie, updateMovieSuccess, deleteMovie, deleteMovieSuccess } from './movies.actions';
import { RouterNavigatedAction, ROUTER_NAVIGATION } from "@ngrx/router-store";



@Injectable()
export class MoviesEffects {
    constructor(
        private actions$: Actions,
        private _apiMovieService: ApiMoviesService,
        private _authService: AuthService,
        private router: Router
    ) {}

    //effect Obtener películas
    loadMovies$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadMovies),
            mergeMap((action) => {
                return this._apiMovieService.getMovie().pipe(
                    map((movies) => {
                        return loadMoviesSuccess({ movies });
                    })
                );
            })
        );
    });

    //effect Crear película
    addMovie$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(addMovie), 
            mergeMap((action) => {
                return this._apiMovieService.saveMovie(action.movie).pipe(
                    map((movie) => {
                        return addMovieSuccess({ movie });
                    })
                );
            })
        );
    });

    //effect navegar después de Crear película
    addMovieRedirect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(addMovieSuccess), 
            map((action) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Nueva película agregada',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.router.navigate(['/admin/list']);
            })
        );
    }, 
    { dispatch: false});

    //effect Actualizar película
    updateMovie$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateMovie), 
            mergeMap((action) => {
                return this._apiMovieService.updateMovie(action.movie, action.id).pipe(
                    map((movie) => {
                        return updateMovieSuccess({ movie });
                    })
                );
            })
        );
    });

    //effect navegar después de Actualizar película
    updateMovieRedirect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateMovieSuccess), 
            map((action) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Película actualizada',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.router.navigate(['/admin/list']);
            })
        );
    }, 
    { dispatch: false});

    //effect Eliminar película
    deleteMovie$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteMovie), 
            mergeMap((action) => {
                return this._apiMovieService.deleteMovie(action.id).pipe(
                    map((data) => {
                        return deleteMovieSuccess({ id: action.id });
                    })
                );
            })
        );
    });

    getSingleMovie$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ROUTER_NAVIGATION),
            filter((r: RouterNavigatedAction) => {
                const data = this._authService.getDataUserFromLocalStorage();   
                const isAdmin = data?.dataUser?.isadmin;
                return r.payload.routerState.url.startsWith(isAdmin? '/admin/list/update' : '/public/detailmovie');
            }),
            map((r: any) => {
                return r.payload.routerState['params']['id'];
            }),
            switchMap((id) => {
                return this._apiMovieService.getMovie(id).pipe(
                    map((movies) => {
                        return loadMoviesSuccess({ movies });
                    })
                );
            })
        );
    });
}
