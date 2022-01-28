import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MovieI } from 'src/app/core/interfaces/movie.interface';

import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiMoviesService {

  private URL_BASE: string = !environment.production? 'http://localhost:8080' : '';
  private urlAPI = this.URL_BASE + '/api/products/';

  constructor(private http: HttpClient) { }

  getMovie(id?: string|undefined): Observable<MovieI[]>{
    return this.http.get<MovieI[]>(this.urlAPI + (id||'')).pipe(
      map((data: MovieI[]) => {
        const movies: MovieI[] = [];
        data.forEach(elem => {
          if(elem.stock != 0) {
            movies.push(elem);
          }
        })
        return movies;
      })
    )
    ;
  }

  saveMovie(movie: MovieI): Observable<MovieI>{
    return this.http.post<MovieI>(this.urlAPI, movie);
  }

  updateMovie(movie: any, id: string){
    return this.http.put<any>(this.urlAPI + id, movie);
  }

  deleteMovie(id: string){
    return this.http.delete<MovieI>(this.urlAPI + id);
  }

}
