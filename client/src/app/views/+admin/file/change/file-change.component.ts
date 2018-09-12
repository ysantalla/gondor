import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import gql from 'graphql-tag';
import { UploadService } from '@app/core/services/upload.service';


const singleUpload = gql`
mutation changeFile($file: Upload!, $where: FileWhereUniqueInput!) {
  changeFile(file: $file, where: $where) {
    filename
  }
}
`;

@Component({
  selector: 'app-file-change',
  template: `

    <br />
    <div class="container" fxLayout="row" fxLayoutAlign="center center">
      <div class="item" fxFlex="50%" fxFlex.xs="98%" fxFlex.md="70%">

        <div class="mat-elevation-z8">
          <mat-progress-bar *ngIf="loading" color="primary" mode="buffer" [value]="percent"
          [bufferValue]="100 - percent"></mat-progress-bar>

          <form [formGroup]="fileUploadForm" #f="ngForm" (ngSubmit)="onUploadfile()" class="form">
            <mat-card class="file-card">
              <mat-card-header>
                <mat-card-title>
                  <h3>Cambiar Archivo con id {{fileId}}</h3>
                </mat-card-title>
              </mat-card-header>
              <mat-card-content>

              <div class="full-width">
                <button mat-button color="accent" mat-fab type="button" (click)="uploadFile.click()">
                <mat-icon>attachment</mat-icon></button>
                <input required hidden type="file" #uploadFile (change)="fileChange($event)"
                  placeholder="File" formControlName="file">
              </div>

              <mat-list *ngIf="file">
                <mat-list-item>{{file.name}}  {{file.size / 1024 / 1024 | number: '1.1'}} MB</mat-list-item>
              </mat-list>

              </mat-card-content>
              <mat-card-actions>
                <button mat-raised-button color="primary" type="submit" [disabled]="!fileUploadForm.valid" aria-label="singleUpload">
                  <mat-icon>add</mat-icon>
                  <span>Archivo</span>
                </button>

                <button mat-raised-button color="accent" routerLink="/admin/file" routerLinkActive type="button" aria-label="filesList">
                  <mat-icon>list</mat-icon>
                  <span>Listado de files</span>
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
export class FileChangeComponent implements OnInit {

  fileUploadForm: FormGroup;
  file: File;
  fileId: string;
  loading = false;

  percent: number;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private apollo: Apollo,
    public uploadService: UploadService
  ) { }

  ngOnInit() {
    this.fileId = this.activatedRoute.snapshot.params['id'];

    this.fileUploadForm = this.formBuilder.group({
      file: ['', Validators.required]
    });

    this.uploadService.getPercent().subscribe(data => {
      this.percent = data;
    });
  }

  onUploadfile(): void {

    this.loading = true;

    if (this.fileUploadForm.valid) {
      this.fileUploadForm.disable();

      this.apollo.mutate({
        mutation: singleUpload,
        variables: {
          'file': this.file,
          'where': {id: this.fileId}
        }
      }).subscribe(( {data} ) => {
        this.loading = false;

        if (data) {
          this.snackBar.open(
            `Archivo ${data.changeFile.filename} cambiado`,
            'X',
            { duration: 3000 }
          );
          this.router.navigate(['admin', 'file']);
        }

      }, (error) => {
        this.fileUploadForm.enable();
        this.loading = false;
        this.snackBar.open(error.message, 'X', {duration: 3000});
      });
    } else {
      console.log('Form not valid');
    }
  }

  fileChange(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }
}
