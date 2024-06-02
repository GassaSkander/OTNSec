import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscriptionRoutingModule } from './inscription-routing.module';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InscriptionComponent } from './inscription.component';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [InscriptionComponent],
  imports: [
    CommonModule,
    InscriptionRoutingModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    ReactiveFormsModule
    ,
  ]
})
export class InscriptionModule { }
