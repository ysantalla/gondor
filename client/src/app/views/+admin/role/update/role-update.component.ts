import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';
import { Role } from '@app/core/model/user.model';

const updateRole = gql`
  mutation updateRole($data: RoleUpdateInput!, $where: RoleWhereUniqueInput!) {
    updateRole(data: $data, where: $where) {
      id
      name
      description
    }
  }
`;

const roleQuery = gql`
  query role($id: String!) {
    role(id: $id) {
      id
      name
      description
    }
  }
`;


@Component({
  selector: 'app-role-update',
  template: `
    <div class="loading">
      <mat-progress-bar *ngIf="loading" color="warn"></mat-progress-bar>
    </div>
    <br />
    <div class="container" fxLayout="row" fxLayoutAlign="center center">
      <div class="item" fxFlex="50%" fxFlex.xs="98%" fxFlex.md="70%">

        <div class="mat-elevation-z8">
          <form [formGroup]="updateRoleForm" #f="ngForm" (ngSubmit)="onUpdateRole()" class="form">
            <mat-card class="role-card">
              <mat-card-header>
                <mat-card-title>
                  <h1>Modificar Rol</h1>
                </mat-card-title>
              </mat-card-header>

              <mat-card-content>

                <mat-form-field class="full-width">
                  <input matInput required type="text" placeholder="Nombre" formControlName="name">
                </mat-form-field>

                <mat-form-field class="full-width">
                  <input matInput type="text" placeholder="Descripción" formControlName="description">
                </mat-form-field>

              </mat-card-content>
              <mat-card-actions>
                <button mat-raised-button color="primary" type="submit" [disabled]="!updateRoleForm.valid" aria-label="updateRole">
                  <mat-icon>mode_edit</mat-icon>
                  <span>Rol</span>
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
  styles: [
    `
      .full-width {
        width: 100%;
      }
    `
  ]
})
export class RoleUpdateComponent implements OnInit, OnDestroy {
  updateRoleForm: FormGroup;
  roleData: Role;
  roleId: string;
  loading = false;
  roleQuerySubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private apollo: Apollo
  ) {}

  ngOnInit() {
    this.updateRoleForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['']
    });

    this.roleId = this.activatedRoute.snapshot.params['id'];

    this.loading = true;
    this.updateRoleForm.disable();

    this.roleQuerySubscription = this.apollo
      .watchQuery<any>({
        query: roleQuery,
        variables: {
          id: this.roleId
        }
      })
      .valueChanges.subscribe(({ data, loading }) => {
        if (!loading) {
          this.roleData = data.role;
          this.updateRoleForm.enable();
          this.loading = false;

          this.updateRoleForm.patchValue({
            name: this.roleData.name,
            description: this.roleData.description
          });
        }
      }, (error) => {
        this.loading = false;
        this.snackBar.open(error, 'X', {duration: 3000});
      });
  }

  onUpdateRole() {
    this.loading = true;

    if (this.updateRoleForm.valid) {
      this.updateRoleForm.disable();

      this.apollo
        .mutate({
          mutation: updateRole,
          variables: {
            data:  {
              'name': this.updateRoleForm.value.name,
              'description': this.updateRoleForm.value.description,
            },
            where : {
              id: this.roleId
            }
          }
        })
        .subscribe(
          ({ data }) => {
            this.loading = false;
            this.updateRoleForm.enable();

            if (data) {
              this.snackBar.open(
                `Rol ${
                  data.updateRole.name
                } editado correctamente`,
                'X',
                { duration: 3000 }
              );
              this.router.navigate(['admin', 'role']);
            }
          },
          (error) => {
            this.loading = false;
            this.updateRoleForm.enable();
            this.snackBar.open(error.graphQLErrors[0].message, 'X', { duration: 3000 });
          }
        );
    } else {
      console.log('Form not valid');
    }
  }

  ngOnDestroy(): void {
    this.roleQuerySubscription.unsubscribe();
  }
}
