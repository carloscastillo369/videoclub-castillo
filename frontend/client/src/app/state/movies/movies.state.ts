import { MovieI } from "src/app/core/interfaces/movie.interface";

export interface MoviesState {
    movies: MovieI[];
}

export const initialState: MoviesState = {
    movies: []
}