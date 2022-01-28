import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

//Interfaz de usuario registrado
import { RegisteredUserI } from 'src/app/core/interfaces/user.interface';

//NgRx
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { signInStart } from 'src/app/state/auth/auth.actions';
import { setErrorMessage, setLoadingSpinner } from 'src/app/store/shared/shared.actions';
import { getErrorMessage } from 'src/app/store/shared/shared.selector';


@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.css']
})
export class SignInPageComponent implements OnInit {

  //Varible control de mostra y ocultar constraseña
  public hide: boolean = true;

  //Mensaje de error respuesta desde el servidor
  public errorMessage!: Observable<string>;
  
  //modelos de caracteres aceptados
  private patternEmail = /^[0-9a-zA-Z._-]+@[a-zA-Z]+?\.[a-zA-Z]{2,3}$/;
  private patternPassword = /^[0-9a-zA-Zñ]+$/;

  //modelo de formulario para inicio de sesión
  public formSignIn: FormGroup = this.fb.group({
    email: ['',
      [
        Validators.required,
        Validators.pattern(this.patternEmail)
      ]],
    password: ['',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15), 
        Validators.pattern(this.patternPassword)
      ]]
  }) 

  constructor(
    private store: Store<AppState>,
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
    this.ServerErrorMessage();
  }

  //Mensaje de error desde el servidor
  ServerErrorMessage() {
    this.errorMessage = this.store.select(getErrorMessage);
    this.store.dispatch(setErrorMessage({ message: '' }));
  }

  //Iniciar sesión con email y password
  signIn(){
    const user: RegisteredUserI = this.formSignIn.value;
    this.store.dispatch(signInStart({ user }));
    this.store.dispatch(setLoadingSpinner({ status: true }));
  }
  
  //Condición si es campo válido
  isValidField (field:string){
    return this.formSignIn.get(field)?.valid;
  }

  //Condición si es campo inválido
  isInvalidField (field:string) {
    return (
      this.formSignIn.get(field)?.invalid && 
      (this.formSignIn.get(field)?.dirty || this.formSignIn.get(field)?.touched)
    )
  }

  //Mensaje de error por campos inválidos
  getErrorMessage (field:string) {
    let message;

    if (this.formSignIn.get(field)?.errors?.required) {
      switch(field) {
        case 'email':
          message = 'Por favor, ingrese su dirección de correo electrónico.';
          break;
        case 'password':
          message = 'Por favor, ingrese su contraseña.';
          break;
      }
    } else if (this.formSignIn.get(field)?.errors?.pattern) {
      switch(field) {
        case 'email':
          message = 'Por favor, ingrese una dirección de correo electrónico válida.';
          break;
        case 'password':
          message = 'Formato incorrecto, ingrese solo letras y números.';
          break;
      }
    } else if (this.formSignIn.get(field)?.hasError('minlength')) {
      const minLength = this.formSignIn.get(field)?.errors?.minlength.requiredLength;
      message = `La contraseña debe tener mínimo ${minLength} caracteres`
    } else if (this.formSignIn.get(field)?.hasError('maxlength')) {
      const maxLength = this.formSignIn.get(field)?.errors?.maxlength.requiredLength;
      message = `La contraseña no debe exceder más de ${maxLength} caracteres`
    } 

    return message;
  }

}
