import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@app/core/services/auth.service';
import { MatSnackBar } from '@angular/material';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';

const profile = gql`
  mutation profile($data: UserProfileInput!) {
    profile(data: $data) {
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


const meQuery = gql`
  query me {
    me {
      firstname
      lastname
      email
      sex
      birthdate
    }
  }
`;

@Component({
  selector: 'app-profile',
  template: `
      <div *ngIf="loading">
        <mat-progress-bar color="warn"></mat-progress-bar>
      </div>
      <br />
      <div class="container" fxLayout="column" fxLayoutAlign="center center">
        <div class="item" fxFlex="50%" fxFlex.xs="90%" fxFlex.md="90%">
          <form [formGroup]="profileForm" #f="ngForm" (ngSubmit)="onProfile()" class="example-form">
            <mat-card class="card">

              <h1 class="mat-h1">Pérfil</h1>
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

              </mat-card-content>
              <mat-card-actions>
                <button mat-raised-button color="primary" type="submit" [disabled]="!profileForm.valid" aria-label="profile">
                  <mat-icon>edit</mat-icon>
                  <span>Pérfil</span>
                </button>

                <button mat-raised-button color="accent" type="button"
                   routerLink="/dashboard" routerLinkActive="active"
                   aria-label="dashboard">
                  <mat-icon>home</mat-icon>
                  <span>Escritorio</span>
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
export class ProfileComponent implements OnInit, OnDestroy {

  profileForm: FormGroup;
  loading = false;
  hide = true;

  meQuerySubcription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private apollo: Apollo
  ) { }

  ngOnInit() {

    this.profileForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      sex: ['', Validators.required],
      birthdate: ['', Validators.required],
    });

    this.loading = true;
    this.profileForm.disable();

    this.meQuerySubcription = this.apollo.watchQuery<any>({
      query: meQuery
    }).valueChanges.subscribe(({data, loading}) => {
      if (data) {
        this.profileForm.patchValue({
          'email': data.me.email,
          'firstname': data.me.firstname,
          'lastname': data.me.lastname,
          'sex': data.me.sex,
          'birthdate': data.me.birthdate,
        });
        this.profileForm.enable();
      }
      this.loading = loading;
    }, (error) => {
        this.profileForm.enable();
        this.loading = false;
        this.snackBar.open(error, 'X', {duration: 3000});
    });

  }

  onProfile(): void {

    this.loading = true;

    if (this.profileForm.valid) {
      this.profileForm.disable();
      this.apollo.mutate({
        mutation: profile,
        variables: {
          data: {
            'email': this.profileForm.value.email,
            'firstname': this.profileForm.value.firstname,
            'lastname': this.profileForm.value.lastname,
            'sex': this.profileForm.value.sex,
            'birthdate': this.profileForm.value.birthdate,
          }
        }
      }).subscribe(( {data} ) => {
        this.loading = false;
        this.authService.profile(data.profile);
        this.snackBar.open(`Pérfil actualizado ${data.profile.user.firstname}`, 'X', {duration: 3000});
        this.router.navigate(['dashboard']);
      }, (error) => {
        this.profileForm.enable();
        this.loading = false;
        this.snackBar.open(error, 'X', {duration: 3000});
      });

    } else {
      this.loading = false;
      console.log('Form not valid');
    }

  }

  ngOnDestroy(): void {
    this.meQuerySubcription.unsubscribe();
  }

}
