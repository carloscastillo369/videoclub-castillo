import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

//Interfaz de nuevo usuario y usuario registrado
import { NewUserI, RegisteredUserI } from 'src/app/core/interfaces/user.interface';

//Interfaz de respuesta al signin y al signout
import { GetDataUserResponseI, SignInResponseI, SignUpResponseI } from 'src/app/core/interfaces/authResponse.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL_BASE: string = !environment.production? 'http://localhost:8080' : '';
  private urlAPI = this.URL_BASE + '/api/users/';

  constructor(
    private http: HttpClient,
    private helper: JwtHelperService
  ) {
    this.checkToken();
  }

  //Registrar usuario
  signUp(user: NewUserI): Observable<SignUpResponseI>{
    return this.http.post<SignUpResponseI>(this.urlAPI + 'signup', user);
  }

  //Iniciar sesión usuario
  signIn(user: RegisteredUserI): Observable<SignInResponseI>{
    return this.http.post<SignInResponseI>(this.urlAPI + 'signin', user);
  }

  //Obtener datos usuario
  getDataUser(): Observable<GetDataUserResponseI>{
    return this.http.get<GetDataUserResponseI>(this.urlAPI + 'getdata');
  }

  //Cerrar sesión usuario
  signOut() {
    this.removeToken();
    this.removeDataUser();
    localStorage.removeItem('cart');
  }

  //Verificar si el token a expirado
  checkToken() {
    const userToken = this.getTokenFromLocalStorage();
    if(userToken) {
      const isExpired = this.helper.isTokenExpired(userToken);
      if(isExpired) {
        this.signOut();
      }
    }
  }

  //Guardar token en el localstorage
  setTokenInLocalStorage(token:string) {
    localStorage.setItem('ACCESS_TOKEN', token);
  }

  //Obtener token guardado en el localstorage
  getTokenFromLocalStorage() {
    return localStorage.getItem('ACCESS_TOKEN');
  }

  //Eliminar token del localstorage
  removeToken() {
    localStorage.removeItem('ACCESS_TOKEN');
  }

  //Guardar datos del usuario en el localstorage
  setDataUserInLocalStorage(data: SignInResponseI) {
    localStorage.setItem('DATA_USER', JSON.stringify(data));
    const token = data.token;
    this.setTokenInLocalStorage(token);
  }

  //Obtener datos de usuario desde el localstorage
  getDataUserFromLocalStorage(){
    const dataUserString = localStorage.getItem('DATA_USER');
    if(dataUserString) {
      const dataUser = JSON.parse(dataUserString);
      return dataUser;
    }
    return null;
  }

  //Remover datos de usuario del localstorage
  removeDataUser(){
    return localStorage.removeItem('DATA_USER');
  }
  
}
