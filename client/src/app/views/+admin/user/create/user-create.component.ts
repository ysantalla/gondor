import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';

const createUser = gql`
  mutation createUser($data: UserCreateInput!) {
    createUser(data: $data) {
      firstname
    }
  }
`;

const rolesQuery = gql`
  query roles {
    roles {
      id
      name
      description
    }
  }
`;

@Component({
  selector: 'app-user-create',
  template: `
    <div class="container">
      <div class="loading">
        <mat-progress-bar *ngIf="loading" color="warn"></mat-progress-bar>
      </div>
    </div>
    <br />
    <div class="container" fxLayout="row" fxLayoutAlign="center center">
      <div class="item" fxFlex="50%" fxFlex.xs="98%" fxFlex.md="70%">

        <div class="mat-elevation-z8">
          <form [formGroup]="createUserForm" #f="ngForm" (ngSubmit)="onCreateUser()" class="form">
            <mat-card class="user-card">
              <mat-card-header>
                <mat-card-title>
                  <h1>Crear Usuario</h1>
                </mat-card-title>
              </mat-card-header>

              <mat-card-content>

                <mat-form-field class="full-width">
                  <input matInput required type="email" placeholder="Correo" formControlName="email">
                </mat-form-field>

                <mat-form-field class="full-width">
                  <input matInput required type="text" placeholder="Nombre" formControlName="firstname">
                </mat-form-field>

                <mat-form-field class="full-width">
                  <input matInput required type="text" placeholder="Apellidos" formControlName="lastname">
                </mat-form-field>

                <mat-form-field class="full-width">
                  <mat-select placeholder="Roles" formControlName="roles" multiple>
                    <mat-option *ngFor="let role of roles" [value]="{id: role.id}">{{role.name}}</mat-option>
                  </mat-select>
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
                  <input matInput required type="password" #password minlength="6" placeholder="Contraseña" formControlName="password">
                  <mat-hint align="end">6 / {{password.value.length}}</mat-hint>
                </mat-form-field>

                <mat-form-field class="full-width">
                  <input matInput required type="password" minlength="6" placeholder="Repetir Contraseña" formControlName="repeat_password">
                  <mat-hint *ngIf="(createUserForm.value.password != createUserForm.value.repeat_password)
                    || (createUserForm.value.password.length <= 6 && createUserForm.value.password.length > 1)">
                    <span class="mat-warn">Las contraseñas no coinciden, debe poseer un mínimo de 6 carácteres</span>
                  </mat-hint>
                  <mat-hint *ngIf="(createUserForm.value.password == createUserForm.value.repeat_password)
                    && (createUserForm.value.password.length > 6)">
                    <span class="mat-accent">Las contraseñas coinciden</span>
                  </mat-hint>
                </mat-form-field>

              </mat-card-content>
              <mat-card-actions>
                <button mat-raised-button color="primary" type="submit" [disabled]="(!createUserForm.valid)
                || (createUserForm.value.password != createUserForm.value.repeat_password)" aria-label="createUser">
                  <mat-icon>add</mat-icon>
                  <span>Usuario</span>
                </button>

                <button mat-raised-button color="accent" routerLink="/admin/user" routerLinkActive type="button" aria-label="usersList">
                  <mat-icon>list</mat-icon>
                  <span>Listado de usuarios</span>
                </button>
              </mat-card-actions>
            </mat-card>
          </form>
        </div>
      </div>
    </div>

  `,
  styles: [
    `
      .full-width {
        width: 100%;
      }
    `
  ]
})
export class UserCreateComponent implements OnInit, OnDestroy {

  createUserForm: FormGroup;
  loading = false;
  rolesQuerySubcription: Subscription;
  roles: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private apollo: Apollo
  ) {}

  ngOnInit() {
    const pattern_password = '^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$';

    this.createUserForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      sex: ['', Validators.required],
      birthdate: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(pattern_password),
          Validators.minLength(6)
        ]
      ],
      repeat_password: [
        '',
        [
          Validators.required,
          Validators.pattern(pattern_password),
          Validators.minLength(6)
        ]
      ],
      roles: ['', Validators.required]
    });

    this.createUserForm.disable();
    this.loading = true;

    this.rolesQuerySubcription = this.apollo
      .watchQuery<any>({
        query: rolesQuery
      })
      .valueChanges.subscribe(
        ({ data, loading }) => {
          if (!loading) {
            this.loading = false;
            this.roles = data.roles;
            this.createUserForm.enable();
          }
        },
        (error) => {
          this.loading = false;
          this.snackBar.open(error.message, 'X', {
            duration: 3000
          });
        }
      );
  }

  ngOnDestroy() {
    this.rolesQuerySubcription.unsubscribe();
  }

  onCreateUser(): void {
    this.loading = true;

    if (this.createUserForm.valid) {

      this.createUserForm.disable();
      this.apollo
        .mutate({
          mutation: createUser,
          variables: {
            data: {
              email: this.createUserForm.value.email,
              password: this.createUserForm.value.password,
              firstname: this.createUserForm.value.firstname,
              lastname: this.createUserForm.value.lastname,
              sex: this.createUserForm.value.sex,
              birthdate: this.createUserForm.value.birthdate,
              roles: {
                connect: this.createUserForm.value.roles
              }
            }
          }
        })
        .subscribe(
          ({ data }) => {
            this.loading = false;
            this.createUserForm.enable();

            if (data) {
              this.snackBar.open(
                `Usuario ${data.createUser.firstname} creado correctamente`,
                'X',
                { duration: 3000 }
              );
              this.router.navigate(['admin', 'user']);
            }
          },
          (error) => {
            this.loading = false;
            this.createUserForm.enable();
            this.snackBar.open(error.graphQLErrors[0].message, 'X', {
              duration: 3000
            });
          }
        );
    } else {
      console.log('Form not valid');
    }
  }
}
