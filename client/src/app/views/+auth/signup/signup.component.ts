import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@app/core/services/auth.service';
import { MatSnackBar } from '@angular/material';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const signup = gql`
  mutation signup($data: UserSignupInput!) {
    signup(data: $data) {
      user {
        firstname
        lastname
        email
        roles {
          name
        }
      }
      token
    }
  }
`;


@Component({
  selector: 'app-signup',
  template: `
      <div *ngIf="loading">
        <mat-progress-bar color="warn"></mat-progress-bar>
      </div>
      <br />
      <div class="container" fxLayout="column" fxLayoutAlign="center center">
        <div class="item" fxFlex="50%" fxFlex.xs="90%" fxFlex.md="90%">
          <form [formGroup]="signupForm" #f="ngForm" (ngSubmit)="onSignup()" class="example-form">
            <mat-card class="card">

              <h1 class="mat-h1">Registrar</h1>
              <mat-card-content>
                <mat-form-field class="full-width">
                  <input matInput required type="text" placeholder="Correo" formControlName="email">
                </mat-form-field>

                <mat-form-field class="full-width">
                  <input matInput required type="text" placeholder="Nombre" formControlName="firstname">
                </mat-form-field>

                <mat-form-field class="full-width">
                  <input matInput required type="text" placeholder="Apellidos" formControlName="lastname">
                </mat-form-field>

                <mat-form-field class="full-width">
                  <mat-select placeholder="Sexo" formControlName="sex">
                    <mat-option value="MALE">Masculino</mat-option>
                    <mat-option value="FEMALE">Femenino</mat-option>
                  </mat-select>
                </mat-form-field>

                <mat-form-field class="full-width">
                  <input matInput [matDatepicker]="picker" formControlName="birthdate" placeholder="Fecha de nacimiento">
                  <mat-datepicker-toggle matSuffix [for]="picker">
                    <mat-icon matDatepickerToggleIcon>keyboard_arrow_down</mat-icon>
                  </mat-datepicker-toggle>
                  <mat-datepicker #picker></mat-datepicker>
                </mat-form-field>

                <mat-form-field class="full-width">
                  <input matInput required #password type ="password" placeholder="Contraseña" formControlName="password">
                  <mat-hint align="end">6 / {{password.value.length}}</mat-hint>
                </mat-form-field>

                <mat-form-field class="full-width">
                  <input matInput required #repeat_password type="password" placeholder="Repetir contraseña"
                         formControlName="repeat_password">
                  <mat-hint *ngIf="(signupForm.value.password != signupForm.value.repeat_password)
                    || (signupForm.value.password.length <= 6 && signupForm.value.password.length > 1)">
                    <span class="mat-warn">Las contraseñas no coinciden, debe poseer un mínimo de 6 carácteres</span>
                  </mat-hint>
                  <mat-hint *ngIf="(signupForm.value.password == signupForm.value.repeat_password)
                   && (signupForm.value.password.length > 6)">
                    <span class="mat-accent">Las contraseñas coinciden</span>
                  </mat-hint>
                </mat-form-field>

              </mat-card-content>
              <mat-card-actions>
                <button mat-raised-button color="primary" type="submit" [disabled]="(!signupForm.valid) ||
                  (signupForm.value.password != signupForm.value.repeat_password)" aria-label="signup">
                  <mat-icon>account_circle</mat-icon>
                  <span>Registrar</span>
                </button>

                <button mat-raised-button color="primary" routerLink="/auth/login" routerLinkActive type="button" aria-label="signin">
                  <mat-icon>lock</mat-icon>
                  <span>Iniciar sesión</span>
                </button>


              </mat-card-actions>
            </mat-card>

          </form>
        </div>
      </div>
  `,
  styles: [`
    .full-width{
      width: 100%;
    }

    .mat-icon {
      cursor: pointer;
    }

    .card {
      max-width: 400px;
    }
  `]
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  loading = false;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private apollo: Apollo
  ) { }

  ngOnInit() {
    const pattern_password = '^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$';

    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      sex: ['', Validators.required],
      birthdate: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(pattern_password), Validators.minLength(6)]],
      repeat_password: ['', [Validators.required, Validators.pattern(pattern_password), Validators.minLength(6)]]
    });
  }

  onSignup(): void {

    this.loading = true;

    if (this.signupForm.valid) {
      this.signupForm.disable();
      this.apollo.mutate({
        mutation: signup,
        variables: {
          data: {
            'email': this.signupForm.value.email,
            'password': this.signupForm.value.password,
            'firstname': this.signupForm.value.firstname,
            'lastname': this.signupForm.value.lastname,
            'sex': this.signupForm.value.sex,
            'birthdate': this.signupForm.value.birthdate,
          }
        }
      }).subscribe(( {data} ) => {
        this.loading = false;
        this.authService.register(data.signup);
        this.snackBar.open(`Bienvenido ${data.signup.user.firstname}`, 'X', {duration: 3000});
        this.router.navigate(['dashboard']);
      }, (error) => {
        this.signupForm.enable();
        this.loading = false;
        this.snackBar.open(error, 'X', {duration: 3000});
      });

    } else {
      this.loading = false;
      console.log('Form not valid');
    }

  }

}

