import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import gql from 'graphql-tag';


const createRole = gql`
  mutation createRole($data: RoleCreateInput!) {
    createRole(data: $data) {
      name
      description
    }
  }
`;

@Component({
  selector: 'app-role-create',
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
          <form [formGroup]="createRoleForm" #f="ngForm" (ngSubmit)="onCreateRole()" class="form">
            <mat-card class="role-card">
              <mat-card-header>
                <mat-card-title>
                  <h1>Crear Rol</h1>
                </mat-card-title>
              </mat-card-header>

              <mat-card-content>

                <mat-form-field class="full-width">
                  <input matInput required type="name" placeholder="Nombre" formControlName="name">
                </mat-form-field>

                <mat-form-field class="full-width">
                  <input matInput type="text" placeholder="Descripción" formControlName="description">
                </mat-form-field>

              </mat-card-content>
              <mat-card-actions>
                <button mat-raised-button color="primary" type="submit" [disabled]="!createRoleForm.valid" aria-label="createRole">
                  <mat-icon>add</mat-icon>
                  <span>Usuario</span>
                </button>

                <button mat-raised-button color="accent" routerLink="/admin/role" routerLinkActive type="button" aria-label="rolesList">
                  <mat-icon>list</mat-icon>
                  <span>Listado de roles</span>
                </button>
              </mat-card-actions>
            </mat-card>
          </form>
        </div>
      </div>
    </div>

  `,
  styles: [`
    .full-width {
      width: 100%;
    }
  `]
})
export class RoleCreateComponent implements OnInit {

  createRoleForm: FormGroup;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private apollo: Apollo
  ) { }

  ngOnInit() {

    this.createRoleForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  onCreateRole(): void {

    this.loading = true;

    if (this.createRoleForm.valid) {

      this.createRoleForm.disable();
      this.apollo.mutate({
        mutation: createRole,
        variables: {
          data: {
            'name': this.createRoleForm.value.name,
            'description': this.createRoleForm.value.description,
          }
        }
      }).subscribe(( {data} ) => {
        this.loading = false;
        this.createRoleForm.enable();

        if (data) {
          this.snackBar.open(`Rol ${data.createRole.name} creado correctamente`, 'X', {duration: 3000});
          this.router.navigate(['admin', 'role']);
        }
      }, (error) => {
        this.loading = false;
        this.createRoleForm.enable();
        this.snackBar.open(error, 'X', {duration: 3000});
      });

    } else {
      console.log('Form not valid');
    }
  }
}
