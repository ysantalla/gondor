import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';
import { File } from '@app/core/model/file.model';

import { environment as env } from '@env/environment';

const fileQuery = gql`
  query file($id: String!) {
    file(id: $id) {
      id
      filename
      path
      encoding
      mimetype
      size
    }
  }
`;

@Component({
  selector: 'app-file-details',
  template: `
    <div class="loading">
      <mat-progress-bar *ngIf="loading" color="warn"></mat-progress-bar>
    </div>
    <br />
    <div class="container" fxLayout="row" fxLayoutAlign="center center">
      <div class="item" fxFlex="50%" fxFlex.xs="98%" fxFlex.md="70%">

        <div class="mat-elevation-z8">
          <mat-card class="file-details-card">
            <mat-card-header>
              <mat-card-title>
                <h1>Detalles Archivo</h1>
              </mat-card-title>
            </mat-card-header>

            <mat-card-content>

              <div *ngIf="fileData">

                <mat-grid-list cols="2" rowHeight="6:1">
                    <mat-grid-tile><h3>Id:</h3></mat-grid-tile>
                    <mat-grid-tile><h3> {{fileData.id}}</h3></mat-grid-tile>
                    <mat-grid-tile><h3>Nombre:</h3></mat-grid-tile>
                    <mat-grid-tile><h3> {{fileData.filename}}</h3></mat-grid-tile>
                    <mat-grid-tile><h3>Tipo:</h3></mat-grid-tile>
                    <mat-grid-tile><h3> {{fileData.mimetype}}</h3></mat-grid-tile>
                    <mat-grid-tile><h3>Codificación:</h3></mat-grid-tile>
                    <mat-grid-tile><h3> {{fileData.encoding}}</h3></mat-grid-tile>
                    <mat-grid-tile><h3>Tamaño:</h3></mat-grid-tile>
                    <mat-grid-tile><h3> {{fileData.size | size}}</h3></mat-grid-tile>
                    <mat-grid-tile><h3>Link de Descarga</h3></mat-grid-tile>
                    <mat-grid-tile>
                      <a download mat-icon-button [href]="downloadLink+'/'+fileData.id" routerLinkActive="active">
                        <mat-icon>file_download</mat-icon>
                      </a>
                    </mat-grid-tile>
                </mat-grid-list>
              </div>

            </mat-card-content>
            <mat-card-actions>
              <button mat-raised-button color="accent" routerLink="/admin/file" routerLinkActive type="button" aria-label="details">
                <mat-icon>list</mat-icon>
                <span>Listado de files</span>
              </button>
              <button *ngIf="fileData" mat-raised-button
                    color="primary" [routerLink]="['/admin','file', 'change', fileData.id]" routerLinkActive="active">
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

      mat-chip.file {
        margin: 10px;
      }
    `
  ]
})
export class FileDetailsComponent implements OnInit, OnDestroy {
  fileData: File;
  fileId: string;
  loading = false;
  fileQuerySubscription: Subscription;

  downloadLink: string = env.downloadLinkServer;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private apollo: Apollo
  ) {}

  ngOnInit() {
    this.fileId = this.activatedRoute.snapshot.params['id'];

    this.loading = true;

    this.fileQuerySubscription = this.apollo
      .watchQuery<any>({
        query: fileQuery,
        variables: {
          id: this.fileId
        }
      })
      .valueChanges.subscribe(
        ({ data, loading }) => {
          if (!loading) {
            this.fileData = data.file;
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
    this.fileQuerySubscription.unsubscribe();
  }
}
