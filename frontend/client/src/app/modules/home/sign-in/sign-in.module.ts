import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInRoutingModule } from './sign-in-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';

import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';


@NgModule({
  declarations: [
    SignInPageComponent
  ],
  imports: [
    CommonModule,
    SignInRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class SignInModule { }
