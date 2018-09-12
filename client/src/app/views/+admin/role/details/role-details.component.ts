import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';
import { Role } from '@app/core/model/user.model';

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
  selector: 'app-role-details',
  template: `
    <div class="loading">
      <mat-progress-bar *ngIf="loading" color="warn"></mat-progress-bar>
    </div>
    <br />
    <div class="container" fxLayout="row" fxLayoutAlign="center center">
      <div class="item" fxFlex="50%" fxFlex.xs="98%" fxFlex.md="70%">

        <div class="mat-elevation-z8">
          <mat-card class="role-details-card">
            <mat-card-header>
              <mat-card-title>
                <h1>Detalles Rol</h1>
              </mat-card-title>
            </mat-card-header>

            <mat-card-content>

              <div *ngIf="roleData">

                <mat-grid-list cols="2" rowHeight="6:1">
                    <mat-grid-tile><h3>Id:</h3></mat-grid-tile>
                    <mat-grid-tile><h3> {{roleData.id}}</h3></mat-grid-tile>
                    <mat-grid-tile><h3>Nombre:</h3></mat-grid-tile>
                    <mat-grid-tile><h3> {{roleData.name}}</h3></mat-grid-tile>
                    <mat-grid-tile><h3>Descripción:</h3></mat-grid-tile>
                    <mat-grid-tile><h3> {{roleData.description}}</h3></mat-grid-tile>

                </mat-grid-list>
              </div>

            </mat-card-content>
            <mat-card-actions>
              <button mat-raised-button color="accent" routerLink="/admin/role" routerLinkActive type="button" aria-label="details">
                <mat-icon>list</mat-icon>
                <span>Listado de roles</span>
              </button>
              <button *ngIf="roleData" mat-raised-button color="primary" [routerLink]="['/admin','role', 'update', roleData.id]" routerLinkActive="active">
                <mat-icon>mode_edit</mat-icon>
                <span>Editar</span>
              </button>
            </mat-card-actions>
          </mat-card>

        </div>
      </div>
    </div>

  `,
  styles: [
    `
      .full-width {
        width: 100%;
      }

      mat-chip.role {
        margin: 10px;
      }
    `
  ]
})
export class RoleDetailsComponent implements OnInit, OnDestroy {
  roleData: Role;
  roleId: string;
  loading = false;
  roleQuerySubscription: Subscription;

  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private apollo: Apollo
  ) {}

  ngOnInit() {
    this.roleId = this.activedRoute.snapshot.params['id'];

    this.loading = true;

    this.roleQuerySubscription = this.apollo
      .watchQuery<any>({
        query: roleQuery,
        variables: {
          id: this.roleId
        }
      })
      .valueChanges.subscribe(
        ({ data, loading }) => {
          if (!loading) {
            this.roleData = data.role;
            this.loading = false;
          }
        },
        error => {
          this.loading = false;
          this.snackBar.open(error, 'X', { duration: 3000 });
        }
      );
  }

  ngOnDestroy(): void {
    this.roleQuerySubscription.unsubscribe();
  }
}
