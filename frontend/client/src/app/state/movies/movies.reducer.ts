import { createReducer, on } from "@ngrx/store";
import * as fromMoviesActions from './movies.actions';
import { initialState } from "./movies.state";

const _moviesReducer = createReducer(
    initialState,
    on(fromMoviesActions.loadMoviesSuccess, (state, action) => {
        return {
            ...state,
            movies: action.movies
        }
    }),
    on(fromMoviesActions.addMovieSuccess, (state, action) => {
        let movie = { ...action.movie };

        return {
            ...state,
            movies: [...state.movies, movie]
        }
    }),
    on(fromMoviesActions.updateMovieSuccess, (state, action) => {
        let updatedMovies = state.movies.map((movie) => {
            return action.movie._id === movie._id? action.movie : movie;
        })

        return {
            ...state,
            movies: updatedMovies
        }
    }),
    on(fromMoviesActions.deleteMovieSuccess, (state, { id }) => {
        let updatedMovies = state.movies.filter((movie) => {
            return movie._id !== id;
        })

        return {
            ...state,
            movies: updatedMovies
        }
    })
);

export function MoviesReducer(state: any, action: any) {
    return _moviesReducer(state, action);
}