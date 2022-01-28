import { createAction, props } from "@ngrx/store";
import { MovieI } from "src/app/core/interfaces/movie.interface";

export const LOAD_MOVIES = '[ListMovies page] Load movies';
export const LOAD_MOVIES_SUCCESS = '[ListMovies page] Load movies success';

export const ADD_MOVIE_ACTION = '[AddMovie page] Add movie';
export const ADD_MOVIE_SUCCESS = '[AddMovie page] Add movie success';

export const UPDATE_MOVIE_ACTION = '[UpdateMovie page] Update movie';
export const UPDATE_MOVIE_SUCCESS = '[UpdateMovie page] Update movie success';

export const DELETE_MOVIE_ACTION = '[Movies page] Delete movie';
export const DELETE_MOVIE_SUCCESS = '[Movies page] Delete movie success';

export const loadMovies = createAction(LOAD_MOVIES);

export const loadMoviesSuccess = createAction(
    LOAD_MOVIES_SUCCESS,
    props<{ movies: MovieI[] }>()
);

export const addMovie = createAction(
    ADD_MOVIE_ACTION, 
    props<{ movie: MovieI }>()
);
export const addMovieSuccess = createAction(
    ADD_MOVIE_SUCCESS,
    props<{ movie: MovieI }>()
);

export const updateMovie = createAction(
    UPDATE_MOVIE_ACTION, 
    props<{ movie: MovieI, id:string }>()
);
export const updateMovieSuccess = createAction(
    UPDATE_MOVIE_SUCCESS,
    props<{ movie: MovieI }>()
);

export const deleteMovie = createAction(
    DELETE_MOVIE_ACTION, 
    props<{ id: string }>()
);
export const deleteMovieSuccess = createAction(
    DELETE_MOVIE_SUCCESS,
    props<{ id: string }>()
);