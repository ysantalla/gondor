import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const changePassword = gql`
  mutation changePassword($data: UserChangePasswordInput!) {
    changePassword(data: $data) {
      firstname
    }
  }
`;


@Component({
  selector: 'app-change-password',
  template: `
      <div *ngIf="loading">
        <mat-progress-bar color="warn"></mat-progress-bar>
      </div>
      <br />
      <div class="container" fxLayout="column" fxLayoutAlign="center center">
        <div class="item" fxFlex="50%" fxFlex.xs="90%" fxFlex.md="90%">
          <form [formGroup]="changePasswordForm" #f="ngForm" (ngSubmit)="onChangePassword()" class="change-password-form">
            <mat-card class="card">

              <h1 class="mat-h1">Cambiar Contraseña</h1>
              <mat-card-content>

                <mat-form-field class="full-width">
                  <input matInput required #oldPassword [type]="hide ? 'password' : 'text'"
                                  placeholder="Contraseña vieja" formControlName="oldPassword">
                   <mat-icon matSuffix (click)="hide = !hide">
                    {{hide ? 'visibility' : 'visibility_off'}}
                   </mat-icon>
                </mat-form-field>

                <mat-form-field class="full-width">
                  <input matInput required #newPassword type ="password" placeholder="Contraseña nueva" formControlName="newPassword">
                  <mat-hint align="end">6 / {{newPassword.value.length}}</mat-hint>
                </mat-form-field>

                <mat-form-field class="full-width">
                  <input matInput required #repeatPassword type="password" placeholder="Repetir contraseña"
                         formControlName="repeatPassword">
                  <mat-hint *ngIf="(changePasswordForm.value.newPassword != changePasswordForm.value.repeatPassword)
                    && (changePasswordForm.value.newPassword.length <= 6 || changePasswordForm.value.repeatPassword.length >= 0)">
                    <span class="mat-warn">Las contraseñas no coinciden, debe poseer un mínimo de 6 carácteres</span>
                  </mat-hint>
                  <mat-hint *ngIf="(changePasswordForm.value.newPassword == changePasswordForm.value.repeatPassword)
                   && (changePasswordForm.value.newPassword.length > 6)">
                    <span class="mat-accent">Las contraseñas coinciden</span>
                  </mat-hint>
                </mat-form-field>

              </mat-card-content>
              <mat-card-actions>
                <button mat-raised-button color="primary" type="submit" [disabled]="(!changePasswordForm.valid) ||
                  (changePasswordForm.value.newPassword != changePasswordForm.value.repeatPassword)" aria-label="changePassword">
                  <mat-icon>edit</mat-icon>
                  <span>Cambiar contraseña</span>
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
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  loading = false;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private apollo: Apollo
  ) { }

  ngOnInit() {
    const pattern_password = '^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$';

    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.pattern(pattern_password), Validators.minLength(6)]],
      repeatPassword: ['', [Validators.required, Validators.pattern(pattern_password), Validators.minLength(6)]]
    });
  }

  onChangePassword(): void {

    this.loading = true;

    if (this.changePasswordForm.valid) {
      this.changePasswordForm.disable();
      this.apollo.mutate({
        mutation: changePassword,
        variables: {
          data: {
            'newPassword': this.changePasswordForm.value.newPassword,
            'oldPassword': this.changePasswordForm.value.oldPassword,
          }
        }
      }).subscribe(( {data} ) => {
        this.loading = false;
        this.snackBar.open(`Contraseña cambiada ${data.changePassword.firstname}`, 'X', {duration: 3000});
        this.router.navigate(['dashboard']);
      }, (error) => {
        this.changePasswordForm.enable();
        this.loading = false;
        this.snackBar.open(error, 'X', {duration: 3000});
      });

    } else {
      this.loading = false;
      console.log('Form not valid');
    }

  }

}
