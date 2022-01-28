import { AbstractControl, FormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

export function PasswordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if ( password?.pristine || confirmPassword?.pristine ){
        return null;
    }
    return password && confirmPassword && password.value !== confirmPassword.value ? { 'misMatch': true } : null;
}

export class PasswordErrorMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const password = form?.control.get('password');
        const confirmPassword = form?.control.get('confirmPassword');
        return !!(control?.dirty && (password?.value !== confirmPassword?.value)) ;
    }
}