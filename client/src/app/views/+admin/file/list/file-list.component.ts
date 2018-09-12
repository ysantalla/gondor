import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  AfterViewInit
} from '@angular/core';

import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatSnackBar,
  MatDialog
} from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';
import { ConfirmComponent } from '@app/shared/confirm/confirm.component';
import { File } from '@app/core/model/file.model';

import { environment as env } from '@env/environment';

const fileList = gql`
  query files {
    files {
      id
      filename
      mimetype
      path
      size
    }
  }
`;

const deleteFile = gql`
  mutation deleteFile($where: FileWhereUniqueInput!) {
    deleteFile(where: $where) {
      filename
    }
  }
`;

const deleteManyFiles = gql`
  mutation deleteManyFiles($where: FileWhereInput!) {
    deleteManyFiles(where: $where) {
      count
    }
  }
`;

@Component({
  selector: 'app-file-list',
  template: `
    <div class="container">
      <div class="loading">
        <mat-progress-bar *ngIf="loading" color="warn"></mat-progress-bar>
      </div>
      <br />

      <div fxLayout="row" fxLayoutAlign="center center">
        <div class="item" fxFlex="98%">
          <div class="mat-elevation-z8 info loading-shade" *ngIf="this.dataSource.data.length == 0;">
            <h1 class="mat-h1">No hay registros</h1>
          </div>
        </div>
      </div>

      <div fxLayout="row" fxLayoutAlign="center center">
        <div class="item" fxFlex="98%">
          <button class="create-button" mat-raised-button color="primary" routerLink="/admin/file/upload" routerLinkActive="active">
            <mat-icon>add</mat-icon>
            <span>Archivo</span>
          </button>
        </div>
      </div>

      <br />

      <div [hidden]="!(this.dataSource.data.length > 0)">

        <div fxLayout="row" fxLayoutAlign="center center">
          <div class="item" fxFlex="98%">

            <div class="mat-elevation-z8">

              <mat-form-field class="full-width">
                <mat-icon matPrefix>search</mat-icon>
                <input matInput (keyup)="applyFilter($event.target.value)" placeholder="Filtrado por nombre, tipo y codificación">
              </mat-form-field>

              <mat-table #table class="table-container" [dataSource]="dataSource" matSort aria-label="Elements">

                <!-- Checkbox Column -->
                <ng-container matColumnDef="select">
                  <mat-header-cell fxFlex="10" *matHeaderCellDef>
                    <mat-checkbox (change)="$event ? masterToggle() : null"
                    [checked]="selection.hasValue() && isAllSelected()" [indeterminate]="selection.hasValue() && !isAllSelected()">
                    </mat-checkbox>
                  </mat-header-cell>
                  <mat-cell fxFlex="10" *matCellDef="let row">
                    <mat-checkbox (click)="$event.stopPropagation()"
                    (change)="$event ? selection.toggle(row) : null" [checked]="selection.isSelected(row)">
                    </mat-checkbox>
                  </mat-cell>
                </ng-container>

                <!-- Filename Column -->
                <ng-container matColumnDef="filename">
                  <mat-header-cell *matHeaderCellDef mat-sort-header>Nombre</mat-header-cell>
                  <mat-cell *matCellDef="let row">{{row.filename}}</mat-cell>
                </ng-container>

                <!-- Mimetype Column -->
                <ng-container matColumnDef="mimetype">
                  <mat-header-cell fxFlex="10" *matHeaderCellDef mat-sort-header>Tipo</mat-header-cell>
                  <mat-cell fxFlex="10" *matCellDef="let row">{{row.mimetype}}</mat-cell>
                </ng-container>

                <!-- Size Column -->
                <ng-container matColumnDef="size">
                  <mat-header-cell fxFlex="10" *matHeaderCellDef mat-sort-header>Tamaño</mat-header-cell>
                  <mat-cell fxFlex="10" *matCellDef="let row">{{row.size | size}}</mat-cell>
                </ng-container>

                <!-- Download Column -->
                <ng-container matColumnDef="download">
                  <mat-header-cell fxFlex="7" *matHeaderCellDef>
                    <span>Descargar</span>
                  </mat-header-cell>
                  <mat-cell fxFlex="7" *matCellDef="let row">
                    <a download mat-icon-button [href]="downloadLink+'/'+row.id" routerLinkActive="active">
                      <mat-icon>file_download</mat-icon>
                    </a>
                  </mat-cell>
                </ng-container>

                <!-- Details Column -->
                <ng-container matColumnDef="details">
                  <mat-header-cell fxFlex="7" *matHeaderCellDef>
                    <span>Detalles</span>
                  </mat-header-cell>
                  <mat-cell fxFlex="7" *matCellDef="let row">
                    <a mat-icon-button color="accent" [routerLink]="['/admin','file', 'details', row.id]" routerLinkActive="active">
                      <mat-icon>visibility</mat-icon>
                    </a>
                  </mat-cell>
                </ng-container>

                <!-- Edit Column -->
                <ng-container matColumnDef="edit">
                  <mat-header-cell fxFlex="7" *matHeaderCellDef>
                    <span>Editar</span>
                  </mat-header-cell>
                  <mat-cell fxFlex="7" *matCellDef="let row">
                    <a mat-icon-button color="primary" [routerLink]="['/admin','file', 'change', row.id]" routerLinkActive="active">
                      <mat-icon>mode_edit</mat-icon>
                    </a>
                  </mat-cell>
                </ng-container>

                <!-- delete Column -->
                <ng-container matColumnDef="delete">
                  <mat-header-cell fxFlex="7" *matHeaderCellDef>
                    <span>Eliminar</span>
                  </mat-header-cell>
                  <mat-cell fxFlex="7" *matCellDef="let row">
                    <a mat-icon-button (click)="onDelete(row)" color="warn"><mat-icon>delete_forever</mat-icon></a>
                  </mat-cell>
                </ng-container>

                <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
                <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
              </mat-table>

              <div class="table-footer" fxLayout="row" fxLayout.xs="column" fxLayoutAlign="start center">
                <div  fxFlex="10%">
                  <button  mat-raised-button color="warn" (click)="onDeleteSelected($event)"
                  [disabled]="this.selection.selected.length < 1">
                    <mat-icon>delete_forever</mat-icon>
                    <span>Todos</span>
                  </button>
                </div>
                <div fxFlex="90%">
                  <div [hidden]="dataSource.data.length <= 50">
                    <mat-paginator #paginator [length]="dataSource.data.length"
                    [pageIndex]="0" [pageSize]="50" [pageSizeOptions]="[50, 100, 200]" showFirstLastButtons>
                    </mat-paginator>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .full-width{
      width: 100%;
    }

    .table-container {
      height: auto;
    }


  `]
})
export class FileListComponent implements OnInit, AfterViewInit, OnDestroy {
  dataSource: MatTableDataSource<File>;
  selection = new SelectionModel<File>(true, []);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['select', 'filename', 'mimetype', 'size', 'download', 'details', 'edit', 'delete'];

  loading: boolean;
  downloadLink: string = env.downloadLinkServer;

  private querySubscription: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private apollo: Apollo,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.loading = true;

    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: fileList
      })
      .valueChanges.subscribe(
        ({ data, loading }) => {
          this.loading = loading;

          if (data) {
            this.dataSource.data = data.files;
          }
        },
        error => {
          this.snackBar.open(error, 'X', { duration: 3000 });
        }
      );
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  onDelete(file: File): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        message: `¿Está seguro que desea eliminar el archivo "${file.filename}"?`,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = true;
        this.apollo.mutate({
          mutation: deleteFile,
          variables: {
            where: {
              id: file.id
            }
          }
        }).subscribe(( {data} ) => {
          this.loading = false;

          if (data) {
            this.dataSource.data = this.dataSource.data.filter(files => files.id !== file.id);
            this.snackBar.open(`Archivo ${data.deleteFile.filename} eliminado correctamente`, 'X', {duration: 3000});
          }
        }, (error) => {
          this.loading = false;
          this.snackBar.open(error, 'X', {duration: 3000});
        });

      }
    });
  }

  onDeleteSelected($event): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        message: `¿Está seguro que desea eliminar los ${this.selection.selected.length} files selecionados?`,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = true;
        this.apollo.mutate({
          mutation: deleteManyFiles,
          variables: {
            where: {
              id_in: this.selection.selected.map(data => data.id)
            }
          }
        }).subscribe(( {data} ) => {
          this.loading = false;

          if (data) {
            this.dataSource.data = this.dataSource.data.filter(file => !this._fileExist(file, this.selection.selected));
            this.selection.clear();
            this.snackBar.open(`Los ${data.deleteManyFiles.count} archivos fueron eliminados correctamente`, 'X', {duration: 3000});
          }
        }, (error) => {
          this.loading = false;
          this.snackBar.open(error, 'X', {duration: 3000});
        });

      }
    });
  }

  private _fileExist(file: File, files: any): boolean {
    if (files.some(data => (data.id === file.id))) {
      return true;
    }
    return false;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }
}
