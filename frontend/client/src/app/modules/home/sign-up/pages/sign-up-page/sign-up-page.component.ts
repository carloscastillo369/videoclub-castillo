import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

//Interfaz de nuevo usuario
import { NewUserI } from 'src/app/core/interfaces/user.interface';

//Validación de conincidencia de contraseña
import { PasswordErrorMatcher, PasswordValidator } from 'src/app/shared/validators/password-validator';

//NgRx
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { signUpStart } from 'src/app/state/auth/auth.actions';
import { setErrorMessage, setLoadingSpinner } from 'src/app/store/shared/shared.actions';
import { getErrorMessage } from 'src/app/store/shared/shared.selector';


@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent implements OnInit {

  //variables control mostrar ocultar contraseña y repetir-contraseña
  public hide1: boolean = true; 
  public hide2: boolean = true;
  
  //Mensaje de error respuesta desde el servidor
  public errorMessage!: Observable<string>; 

  //modelos de caracteres aceptados
  private patternLetters = /^[a-zA-Z ñ]+$/;
  private patternEmail = /^[0-9a-zA-Z._-]+@[a-zA-Z]+?\.[a-zA-Z]{2,3}$/;
  private patternPassword = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,15}$/;

  //modelo de formulario para registro
  public formSignUp:FormGroup = this.fb.group({
    name: ['',
      [
        Validators.required,
        Validators.minLength(3), 
        Validators.maxLength(20), 
        Validators.pattern(this.patternLetters)
      ]],
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
      ]],
    confirmPassword: ['', [Validators.required]],
    address: ['', [Validators.required]],
    phone: ['', 
      [
        Validators.required,
        Validators.min(111111111), 
        Validators.max(999999999)      
      ]],
    isadmin: [false],
    checkbox: ['', [Validators.requiredTrue]]
  }, {validators: PasswordValidator})

  //Error por no coincidencia de contraseña
  public errorMatcher = new PasswordErrorMatcher();

  constructor(
    private store: Store<AppState>,
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
    this.ServerErrorMessage();
  }

  //Mensaje de error desde el servidor
  ServerErrorMessage() {
    this.store.dispatch(setErrorMessage({ message: '' }));
    this.errorMessage = this.store.select(getErrorMessage);
  }

  //Registrarse
  signUp(){
    const user: NewUserI = this.formSignUp.value;
    this.store.dispatch(signUpStart({ user }));
    this.store.dispatch(setLoadingSpinner({ status: true }));
  }

  //Limpiar formulario
  resetForm(){
    this.formSignUp.reset();
  }

  //Condición si es un campo valído
  isValidField (field:string){
    return this.formSignUp.get(field)?.valid;
  }

  //Condición si es campo invalído
  isInvalidField (field:string) {
    if( field == 'confirmPassword' ){
      return  this.formSignUp.errors?.misMatch;
    } else {
        return (
          this.formSignUp.get(field)?.invalid && 
          (this.formSignUp.get(field)?.dirty || this.formSignUp.get(field)?.touched)
        )
    }
  }

  //Mensajes de error por campos inválidos
  getErrorMessage (field:string) {
    let message;

    if( field == 'confirmPassword' ){
      message = this.formSignUp.errors?.misMatch? 'Las contraseñas no coinciden' : null;
    } 
    
    else {
      if (this.formSignUp.get(field)?.errors?.required) {
        switch(field) {
          case 'name':
            message = 'Por favor, ingrese su nombre.';
            break;
          case 'email':
            message = 'Por favor, ingrese su dirección de correo electrónico.';
            break;
          case 'password':
            message = 'Por favor, ingrese su contraseña.';
            break;
          case 'address':
            message = 'Por favor, ingrese su dirección.';
            break;
          case 'phone':
            message = 'Por favor, ingrese su teléfono.';
            break;
          case 'checkbox':
            message = 'Debe aceptar los términos y condiciones.';
            break;
        }
      } 
      
      if (this.formSignUp.get(field)?.errors?.pattern) {
        switch(field) {
          case 'name':
            message = 'Formato incorrecto, ingrese solo letras';
            break;
          case 'email':
            message = 'Por favor, ingrese una dirección de correo electrónico válida (p.e. someone@example.com).';
            break;
          case 'password':
            message = 'Para mayor seguridad el password debe estar formado por letras mayúsculas, minúsculas y números';
            break;
        }  
      }
      
      if (this.formSignUp.get(field)?.hasError('minlength')) {
        const minLength = this.formSignUp.get(field)?.errors?.minlength.requiredLength;
        message = `Ingrese mínimo ${minLength} caracteres`;
      } 
      
      if (this.formSignUp.get(field)?.hasError('maxlength')) {
        const maxLength = this.formSignUp.get(field)?.errors?.maxlength.requiredLength;
        message = `Ingrese máximo ${maxLength} caracteres`;
      } 
      
      if (this.formSignUp.get(field)?.hasError('min') || this.formSignUp.get(field)?.hasError('max')) {
        message = 'Ingrese un número de 9 dígitos.';
      }   
    }
    return message; 
  }

}
