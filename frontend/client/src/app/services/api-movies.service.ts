import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

//Interfaz de película
import { MovieI } from 'src/app/core/interfaces/movie.interface';


@Injectable({
  providedIn: 'root'
})
export class ApiMoviesService {

  private URL_BASE: string = !environment.production? 'http://localhost:8080' : '';
  private urlAPI = this.URL_BASE + '/api/products/';

  constructor(private http: HttpClient) { }

  //Obtener películas o película de la base de datos
  getMovie(id?: string|undefined): Observable<MovieI[]>{
    return this.http.get<MovieI[]>(this.urlAPI + (id||''));
  }

  //Guardar película en la base de datos
  saveMovie(movie: MovieI): Observable<MovieI>{
    return this.http.post<MovieI>(this.urlAPI, movie);
  }

  //Actualizar película en la base de datos
  updateMovie(movie: MovieI | any, id: string): Observable<MovieI>{
    return this.http.put<MovieI>(this.urlAPI + id, movie);
  }

  //Eliminar película de la base de datos
  deleteMovie(id: string): Observable<MovieI> {
    return this.http.delete<MovieI>(this.urlAPI + id);
  }

}
