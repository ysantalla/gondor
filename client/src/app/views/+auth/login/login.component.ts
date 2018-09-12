import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@app/core/services/auth.service';
import { MatSnackBar } from '@angular/material';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const login = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        firstname
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
  selector: 'app-login',
  template: `
    <div *ngIf="loading">
      <mat-progress-bar color="warn"></mat-progress-bar>
    </div>
    <br />
    <div class="container" fxLayout="column" fxLayoutAlign="center center">
      <div class="item" fxFlex="50%" fxFlex.xs="90%" fxFlex.md="90%">
        <form [formGroup]="loginForm" #f="ngForm" (ngSubmit)="onLogin()" class="form">
          <mat-card class="card">
            <mat-card-header class="header-logo">
              <img mat-card-image class="logo" src="./assets/icono.svg" alt="icon">
            </mat-card-header>
            <h1 class="mat-h1">Iniciar Sesión</h1>
            <mat-card-content>
              <mat-form-field class="full-width">
                <input matInput required type="text" placeholder="Correo" formControlName="email">
              </mat-form-field>

              <mat-form-field class="full-width">
                  <input matInput required [type]="hide ? 'password' : 'text'" placeholder="Contraseña" formControlName="password">
                  <mat-icon matSuffix (click)="hide = !hide">{{hide ? 'visibility' : 'visibility_off'}}</mat-icon>
              </mat-form-field>
            </mat-card-content>
            <mat-card-actions>
              <button mat-raised-button color="primary" type="submit" [disabled]="!loginForm.valid" aria-label="login">
                <mat-icon>lock</mat-icon>
                <span>Entrar</span>
              </button>

              <button mat-raised-button color="primary" routerLink="/auth/signup" routerLinkActive type="button" aria-label="signup">
                <mat-icon>account_circle</mat-icon>
                <span>Regístrarse</span>
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

    .header-logo {
      align-items: center;
      justify-content: center;
    }

    .logo {
      width: 40%;
    }

    .card {
      max-width: 400px;
    }
  `]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
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
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {

    this.loading = true;

    if (this.loginForm.valid) {
      this.loginForm.disable();
      this.apollo.mutate({
        mutation: login,
        variables: {
          'email': this.loginForm.value.email,
          'password': this.loginForm.value.password
        }
      }).subscribe(( {data} ) => {
        this.loading = false;

        this.loginForm.enable();

        if (data) {
          this.authService.login(data.login);
          this.snackBar.open(`Bienvenido ${data.login.user.firstname}`, 'X', {duration: 3000});
          this.router.navigate(['dashboard']);
        } else {
          this.snackBar.open(`Error no hay datos`, 'X', {duration: 3000});
        }
      }, (error) => {
        this.loading = false;
        this.loginForm.enable();
        this.snackBar.open(error, 'X', {duration: 3000});
      });

    } else {
      this.loading = false;
      console.log('Form not valid');
    }

  }

}
