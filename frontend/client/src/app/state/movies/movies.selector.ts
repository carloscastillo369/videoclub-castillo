import { createFeatureSelector, createSelector, props } from '@ngrx/store';
import { MoviesState } from './movies.state';
import { getCurrentRoute } from 'src/app/store/router/router-selector';
import { RouterStateUrl } from 'src/app/store/router/custom-serializer';

export const MOVIES_STATE_NAME = 'movies';

const getMoviesState = createFeatureSelector<MoviesState>(MOVIES_STATE_NAME);

export const getMovies = createSelector(getMoviesState, (state) => {
    return state.movies;
});
 
export const getMovieById = createSelector(
    getMovies, 
    getCurrentRoute, 
    (movies, route: RouterStateUrl) => {
        return movies? movies.find((movies) => movies._id === route.params['id']) : null;
    }
);
 